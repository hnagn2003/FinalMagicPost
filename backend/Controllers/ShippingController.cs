using AutoMapper;
using CustomAPI.Enums;
using CustomAPI.Intermediary;
using CustomAPI.Models;
using CustomAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CustomAPI.Controllers;

[ApiController]
[Route("[controller]/[action]")]
[VerifyToken]
[VerifyRole(Role.COMPANY_ADMINISTRATOR, Role.TRANSACTION_POINT_LEADER, Role.TRANSACION_STAFF)]
public class ShippingController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly IShippingService _deliveryService;
	public ShippingController(IMapper mapper, IShippingService deliveryService)
	{
		_mapper = mapper;
		_deliveryService = deliveryService;
	}

	[HttpGet]
	[VerifyToken]
	public async Task<List<Shipping>> GetAsync()
			=> await _deliveryService.GetAsync();

	[HttpGet("{id}")]
	[VerifyOwner]
	[VerifyToken]
	public async Task<Shipping?> GetAsync(Guid id)
			=> await _deliveryService.GetAsync(id);

	[HttpPost]
	[VerifyToken]
	public async Task<IActionResult> CreateAsync(CreateShippingModel model)
	{
		Shipping delivery = _mapper.Map<Shipping>(model);
		await _deliveryService.CreateAsync(delivery);
		return Ok(new { message = "Create order successfully!", delivery });
	}
	[HttpGet("{id}")]
	[VerifyToken]
	public async Task<IActionResult> GetShippingHistory(Guid id, int numOfPage, string type, string status)
	{
		List<ShippingHistory> deliveryHistories = await _deliveryService.GetShippingHistory(id, type, status, numOfPage);
		return Ok(new Response<List<ShippingHistory>> { Message = "Get Shipping Successfully", Data = deliveryHistories });
	}
}