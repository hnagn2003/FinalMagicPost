using System.Data;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using CustomAPI.Configs;
using CustomAPI.Enums;
using CustomAPI.Models;
using CustomAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CustomAPI.Services;

public interface IShipmentService
{
	Task<List<PublicShipmentInfo>> GetAsync();
	Task<DataNavigation<PublicShipmentInfo>> FilterAsync(int numOfPage, ShipmentShipmentStatus? status, string? category, DateTime? startingDay, DateTime? endingDay);
	Task<PublicShipmentInfo?> GetAsyncById(Guid id);
	Task<List<ShipmentHistory>> GetShipmentHistoryAsyncById(Guid id);
	Task<DataNavigation<PublicShipmentInfo>> GetIncomingShipmentsAsync(User user, string? province, string? district, DateTime? startingDay, DateTime? endingDay, int numOfPage);
	Task<bool> ConfirmIncomingShipmentsAsync(User user, List<ConfirmIncomingShipmentModel> orders);
	Task<DataNavigation<PublicShipmentInfo>> GetOutgoingShipmentsAsync(User user, string? province, string? district, int numOfPage);
	Task<bool> ForwardShipmentsAsync(User user, List<Guid> orderIds);
	Task UpdateAsync(Guid id, UpdateShipmentModel model);
	// Task CreateAsync(User user, Shipment newShipment);
	Task CreateAsync(Shipment newShipment);
}

public class ShipmentService : IShipmentService
{
	private readonly IMapper _mapper;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<Shipment> _ordersRepository;
	private readonly DbSet<Item> _itemsRepository;
	public ShipmentService(IMapper mapper, WebAPIDataContext webAPIDataContext)
	{
		_mapper = mapper;
		_webAPIDataContext = webAPIDataContext;
		_ordersRepository = webAPIDataContext.Shipments;
		_itemsRepository = webAPIDataContext.Items;
	}

	public async Task<DataNavigation<PublicShipmentInfo>> FilterAsync(int numOfPage, ShipmentShipmentStatus? status, string? category, DateTime? startingDay, DateTime? endingDay)
	{
		var orders = _ordersRepository.AsQueryable();
		if (status != null)
		{
			orders = orders.Where(o => o.Status == status);
		}
		if (!string.IsNullOrEmpty(category))
		{
			orders = orders.Where(o => o.Type == category);
		}
		if (endingDay != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, endingDay.Value) < 0);
		}
		if (startingDay != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, startingDay.Value) > 0);
		}
		List<PublicShipmentInfo> result = await orders.OrderByDescending(o => o.CreatedAt)
												.Select(o => o.GetPublicShipmentInfo())
												.Skip((int)Navigation.PAGESIZE * (numOfPage - 1))
												.Take((int)Navigation.PAGESIZE)
												.ToListAsync();
		return new DataNavigation<PublicShipmentInfo>(result, orders.Count(), numOfPage);
	}

	public async Task<DataNavigation<PublicShipmentInfo>> GetIncomingShipmentsAsync(User user, string? province, string? district, DateTime? startingDay, DateTime? endingDay, int numOfPage)
	{
		Point? currentPoint = await _webAPIDataContext.Points.Where(p => p.Id == user.PointId).FirstOrDefaultAsync() ?? throw new AppException(HttpStatusCode.NotFound, "The point you belong to not found!");
		var orders = _webAPIDataContext.Deliveries
														.Include(d => d.FromPoint)
														.Include(d => d.ToPoint)
														.Include(d => d.Shipment)
														.Where(d => d.toptID == currentPoint.Id && d.ShipmentStatus == ShippingShipmentStatus.DELIVERING)
														.AsQueryable();
		if (province != null)
		{
			orders = orders.Where(o => o.FromPoint.Province == province).AsQueryable();
		}
		if (district != null)
		{
			orders = orders.Where(o => o.FromPoint.District == district).AsQueryable();
		}
		if (startingDay != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, startingDay.Value) > 0).AsQueryable();
		}
		if (endingDay != null)
		{
			orders = orders.Where(o => DateTime.Compare(o.CreatedAt, endingDay.Value) < 0).AsQueryable();
		}
		List<PublicShipmentInfo> result = await orders.Skip((int)Navigation.PAGESIZE * (numOfPage - 1))
					.Take((int)Navigation.PAGESIZE)
					.Select(d => d.Shipment.GetPublicShipmentInfo())
					.ToListAsync();
		return new DataNavigation<PublicShipmentInfo>(result, orders.Count(), numOfPage);
	}

	public async Task<bool> ConfirmIncomingShipmentsAsync(User user, List<ConfirmIncomingShipmentModel> orders)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId);
		List<Shipping> deliveriesUpdate = new();
		List<Shipment> ordersUpdate = new();
		orders.ForEach(o =>
		{
			Shipping? deliveryUpdate = _webAPIDataContext.Deliveries.FirstOrDefault(d => d.ShipmentID == o.orderId && d.ShipmentStatus == ShippingShipmentStatus.DELIVERING);
			if (deliveryUpdate != null)
			{
				deliveryUpdate.ShipmentStatus = o.Confirm ? ShippingShipmentStatus.ARRIVED : ShippingShipmentStatus.UNSUCCESS;
				deliveryUpdate.ReceiveTime = DateTime.UtcNow;
				deliveriesUpdate.Add(deliveryUpdate);
				Shipment? orderNeedUpdate = _ordersRepository.FirstOrDefault(ord => ord.Id == o.orderId);
				orderNeedUpdate.CurrentPointId = currentPoint.Id;
				ordersUpdate.Add(orderNeedUpdate);
			}
		});
		_webAPIDataContext.Deliveries.UpdateRange(deliveriesUpdate);
		_webAPIDataContext.Shipments.UpdateRange(ordersUpdate);
		_webAPIDataContext.SaveChanges();
		return true;
	}

	public async Task<DataNavigation<PublicShipmentInfo>> GetOutgoingShipmentsAsync(User user, string? province, string? district, int numOfPage)
	{
		Point? currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId) ?? throw new AppException(HttpStatusCode.NotFound, "The point you belong to not found!");

		List<Shipment> orders = await _ordersRepository
						.Where(o => o.CurrentPointId == currentPoint.Id && o.Status == ShipmentShipmentStatus.PENDING)
						.Skip((int)Navigation.PAGESIZE * (numOfPage - 1))
						.Take((int)Navigation.PAGESIZE)
						.ToListAsync();
		List<PublicShipmentInfo> ordersToGo = new();
		orders.ForEach(ord =>
		{
			ordersToGo.Add(ord.GetPublicShipmentInfo());
			Shipping newShipping = new();
			Point? nextPoint = null;
			if (currentPoint.Type == PointType.TRANSACTION_POINT)
			{
				nextPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GATHERING_POINT);
			}
			else
			{
				if (ord.ReceiverProvince == currentPoint.Province)
				{
					nextPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.District == ord.ReceiverDistrict && p.Type == PointType.TRANSACTION_POINT);
				}
				else
				{
					nextPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Province == ord.ReceiverProvince && p.Type == PointType.GATHERING_POINT);
				}
			}
			if (province != null)
			{
				if (nextPoint.Province == province) ordersToGo.Add(ord.GetPublicShipmentInfo());
			}
			if (district != null)
			{
				if (nextPoint.District == district) ordersToGo.Add(ord.GetPublicShipmentInfo());
			}
		});
		return new DataNavigation<PublicShipmentInfo>(ordersToGo, ordersToGo.Count, numOfPage);
	}

	public async Task<bool> ForwardShipmentsAsync(User user, List<Guid> orderIds)
	{
		Point currentPoint = await _webAPIDataContext.Points.FirstOrDefaultAsync(p => p.Id == user.PointId) ?? throw new AppException(HttpStatusCode.NotFound, "The point you belong to not found!");
		List<Shipping> newDeliveries = new();
		orderIds.ForEach(ord =>
		{
			Shipment? order = _ordersRepository.FirstOrDefault(o => o.Id == ord)!;
			Shipping newShipping = new()
			{
				fromptID = currentPoint.Id,
				ShipmentStatus = ShippingShipmentStatus.DELIVERING
			};
			order.Status = ShipmentShipmentStatus.DELIVERING;
			if (currentPoint.Type == PointType.TRANSACTION_POINT)
			{
				if (order.SenderProvince == currentPoint.Province)
				{
					Point toPoint = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Province == currentPoint.Province && p.Type == PointType.GATHERING_POINT) ?? throw new AppException("Destination transaction to gathering not supported");
					newShipping.toptID = toPoint.Id;
				}
				else if (order.SenderDistrict == currentPoint.District)
				{
					Point toPoint = _webAPIDataContext.Points
						.FirstOrDefault(p => p.District == currentPoint.District && p.Type == PointType.TRANSACTION_POINT) ?? throw new AppException("Destination transaction to transaction not supported");
					newShipping.toptID = toPoint.Id;
				}
			}
			else
			{
				if (order.ReceiverProvince == currentPoint.Province)
				{
					Point toPoint = _webAPIDataContext.Points
						.FirstOrDefault(p => p.District == order.ReceiverDistrict && p.Type == PointType.TRANSACTION_POINT) ?? throw new AppException("Destination gathering to transaction not supported");
					newShipping.toptID = toPoint.Id;
				}
				else
				{
					Point toPoint = _webAPIDataContext.Points
						.FirstOrDefault(p => p.Type == PointType.GATHERING_POINT && p.Province == order.ReceiverProvince) ?? throw new AppException("Destination gathering to gathering point not supported");
					newShipping.toptID = toPoint.Id;
				}
			}
			newShipping.ShipmentID = order.Id;
			newDeliveries.Add(newShipping);
		});
		await _webAPIDataContext.Deliveries.AddRangeAsync(newDeliveries);
		await _webAPIDataContext.SaveChangesAsync();
		return true;
	}

	public async Task<List<PublicShipmentInfo>> GetAsync()
		 => await _ordersRepository
					 .Include(o => o.Items)
					 .Select(o => o.GetPublicShipmentInfo())
					 .ToListAsync();

	public async Task<PublicShipmentInfo?> GetAsyncById(Guid id)
		 => await _ordersRepository
					 .Include(o => o.Items)
					 .Select(o => o.GetPublicShipmentInfo())
					 .FirstOrDefaultAsync();

	public async Task<List<ShipmentHistory>> GetShipmentHistoryAsyncById(Guid id)
	{
		var deliveries = await _ordersRepository
			.Where(o => o.Id == id)
			.Include(o => o.Deliveries.OrderBy(d => d.CreatedAt))
			.ThenInclude(d => d.FromPoint)
			.Select(o => o.Deliveries)
			.FirstOrDefaultAsync();
		var orderHistory = new List<ShipmentHistory>()
		{
			new ShipmentHistory{Point = deliveries!.FirstOrDefault()?.FromPoint, ArriveAt = deliveries!.FirstOrDefault()!.CreatedAt}
		};
		deliveries!.ToList().ForEach(d =>
		{
			if (d.ShipmentStatus == ShippingShipmentStatus.ARRIVED)
			{
				ShipmentHistory history = new ShipmentHistory()
				{
					Point = d.ToPoint,
					ArriveAt = d.ReceiveTime
				};
				orderHistory.Add(history);
			}
		});
		return orderHistory;
	}

	public async Task UpdateAsync(Guid id, UpdateShipmentModel model)
	{
		Shipment? order = await _ordersRepository.Where(o => o.Id == id).FirstOrDefaultAsync() ?? throw new AppException(HttpStatusCode.NotFound, "Shipment not found!");
		_mapper.Map(model, order);
		_ordersRepository.Update(order);
		_webAPIDataContext.SaveChanges();
	}

	// public async Task CreateAsync(User user, Shipment newShipment)
	// {
	// 	newShipment.CurrentPointId = user.PointId;
	// 	await _ordersRepository.AddAsync(newShipment);
	// 	await _webAPIDataContext.SaveChangesAsync();
	// }

	public async Task CreateAsync(Shipment newShipment)
	{
		await _ordersRepository.AddAsync(newShipment);
		await _webAPIDataContext.SaveChangesAsync();
	}
}