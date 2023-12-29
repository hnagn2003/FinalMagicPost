using AutoMapper;
using CustomAPI.Enums;
using CustomAPI.Intermediary;
using CustomAPI.Models;
using CustomAPI.Services;
using CustomAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CustomAPI.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ShipmentController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly IShipmentService _orderService;
	public ShipmentController(IMapper mapper, IShipmentService orderService)
	{
		_mapper = mapper;
		_orderService = orderService;
	}

	[HttpGet]
	[VerifyToken]
	public async Task<IActionResult> GetAsync()
	{
		List<PublicShipmentInfo> orders = await _orderService.GetAsync();
		return Ok(new { message = "Get orders successfully", orders });
	}

	[HttpGet]
	[VerifyToken]
	public async Task<ActionResult<Response<DataNavigation<PublicShipmentInfo>>>> FilterAsync(int numOfPage, ShipmentShipmentStatus? status, string? category, DateTime? startingDay, DateTime? endingDay)
	{
		DataNavigation<PublicShipmentInfo> orders = await _orderService.FilterAsync(numOfPage, status, category, startingDay?.ToUniversalTime(), endingDay?.ToUniversalTime());
		return Ok(new Response<DataNavigation<PublicShipmentInfo>>("Get orders successfully", orders));
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<Response<PublicShipmentInfo>>> GetAsync(Guid id)
	{
		PublicShipmentInfo order = await _orderService.GetAsyncById(id) ?? throw new AppException(HttpStatusCode.NotFound, "Shipment not found");
		return Ok(new Response<PublicShipmentInfo>("Get order successfully!", order));
	}

	[HttpGet("{id}")]
	public async Task<IActionResult> GetShipmentHistoryAsync(Guid id)
	{
		List<ShipmentHistory> orderHistory = await _orderService.GetShipmentHistoryAsyncById(id);
		return Ok(new { message = "Get order history successfully", orderHistory });
	}

	[HttpPut("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF)]
	public async Task<IActionResult> UpdateAsync(Guid id, UpdateShipmentModel model)
	{
		await _orderService.UpdateAsync(id, model);
		return Ok(new { message = "Update order successfully!" });
	}

	[HttpPost]
	// [VerifyToken]
	// [VerifyPointAndAdmin]
	public async Task<IActionResult> CreateAsync(CreateShipmentModel model)
	{
		Shipment order = _mapper.Map<Shipment>(model);
		await _orderService.CreateAsync(order);
		return Ok(new { message = "Create order successfully!", order });
	}

	[HttpGet]
	[VerifyToken]
	[VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF, Role.COLLECTION_POINT_LEADER, Role.TRANSACTION_POINT_LEADER)]
	public async Task<ActionResult<Response<DataNavigation<PublicShipmentInfo>>>> GetIncomingShipmentsAsync(string? province, string? district, DateTime? startingDay, DateTime? endingDay, int numOfPage)
	{
		User user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		DataNavigation<PublicShipmentInfo> ordersIncoming = await _orderService.GetIncomingShipmentsAsync(user, province, district, startingDay, endingDay, numOfPage);
		return Ok(new Response<DataNavigation<PublicShipmentInfo>>("Get incoming orders successfully!", ordersIncoming));
	}

	[HttpPut("{id}")]
	[VerifyToken]
	[VerifyOwner]
	[VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF)]
	public async Task<IActionResult> ConfirmIncomingShipmentsAsync(List<ConfirmIncomingShipmentModel> orders)
	{
		User? user = (User?)HttpContext.Items["user"];
		var result = await _orderService.ConfirmIncomingShipmentsAsync(user!, orders);
		return Ok(result);
	}

	[HttpGet]
	[VerifyToken]
	[VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF, Role.COLLECTION_POINT_LEADER, Role.TRANSACTION_POINT_LEADER)]
	public async Task<ActionResult<Response<DataNavigation<PublicShipmentInfo>>>> GetOutgoingShipmentsAsync(string? province, string? district, int numOfPage)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		DataNavigation<PublicShipmentInfo> ordersOutgoing = await _orderService.GetOutgoingShipmentsAsync(user, province, district, numOfPage);
		return Ok(new Response<DataNavigation<PublicShipmentInfo>>("Get outgoing orders successfully!", ordersOutgoing));
	}

	[HttpPost]
	[VerifyToken]
	[VerifyRole(Role.TRANSACION_STAFF, Role.GATHERING_STAFF, Role.COLLECTION_POINT_LEADER, Role.TRANSACTION_POINT_LEADER)]
	public async Task<IActionResult> ForwardShipmentsAsync(List<Guid> orders)
	{
		User? user = (User?)HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized!");
		await _orderService.ForwardShipmentsAsync(user!, orders);
		return Ok(new { message = "Forward outgoing orders successfully!" });
	}
}