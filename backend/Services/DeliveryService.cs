using AutoMapper;
using CustomAPI.Configs;
using CustomAPI.Enums;
using CustomAPI.Models;
using CustomAPI.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;

namespace CustomAPI.Services;

public interface IShippingService
{
	Task<List<Shipping>> GetAsync();
	Task<Shipping?> GetAsync(Guid id);
	Task CreateAsync(Shipping newShipping);
	Task<List<ShippingHistory>> GetShippingHistory(Guid id, string? type, string? status, int numOfPage);
}

public class ShippingServce : IShippingService
{
	private readonly IMapper _mapper;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<Shipping> _deliveriesRepository;
	public ShippingServce(IMapper mapper, WebAPIDataContext webAPIDataContext)
	{
		_mapper = mapper;
		_webAPIDataContext = webAPIDataContext;
		_deliveriesRepository = webAPIDataContext.Deliveries;
	}
	public async Task<List<Shipping>> GetAsync()
			=> await _deliveriesRepository.ToListAsync();

	public async Task<Shipping?> GetAsync(Guid id)
			=> await _deliveriesRepository
						.Where(d => d.Id == id)
						.Include(d => d.Shipment)
						.Include(d => d.FromPoint)
						.Include(d => d.ToPoint)
						.FirstOrDefaultAsync();

	public async Task CreateAsync(Shipping newShipping)
	{
		await _deliveriesRepository.AddAsync(newShipping);
		await _webAPIDataContext.SaveChangesAsync();
	}

	public async Task<List<ShippingHistory>> GetShippingHistory(Guid id, string? type, string? status, int numOfPage)
	{
		Point? currentPoint = _webAPIDataContext.Points.FirstOrDefault(p => p.Id == id);
		var relatedShipping = await _deliveriesRepository.Where(d => d.fromptID == currentPoint!.Id || d.toptID == currentPoint.Id)
												.Skip((int)Navigation.PAGESIZE * (numOfPage - 1))
												.Take((int)Navigation.PAGESIZE)
												.ToListAsync();
		List<ShippingHistory> deliveryHistory = new();
		relatedShipping.ForEach(d => deliveryHistory.AddRange(d.GetOperationShippingHistory()));
		if (type != null)
		{
			deliveryHistory = deliveryHistory.Where(d => d.Type == type).ToList();
		}
		if (status != null)
		{
			deliveryHistory = deliveryHistory.Where(d => d.Status == status).ToList();
		}
		return deliveryHistory;
	}
}