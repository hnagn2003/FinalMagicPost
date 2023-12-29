using System.Net;
using AutoMapper;
using CustomAPI.Enums;
using CustomAPI.Intermediary;
using CustomAPI.Models;
using CustomAPI.Services;
using CustomAPI.Utils;
using Microsoft.AspNetCore.Mvc;

namespace CustomAPI.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class PointController : ControllerBase
{

	private readonly IMapper _mapper;
	private readonly IPointService _pointService;
	public PointController(IMapper mapper, IPointService pointService)
	{
		_mapper = mapper;
		_pointService = pointService;
	}

	[HttpGet]
	public async Task<ActionResult<Response<List<Point>>>> GetAsync()
	{
		List<Point> points = await _pointService.GetAsync();
		return Ok(new Response<List<Point>>("Get points successfully!", points));
	}

	[HttpGet]
	[VerifyToken]
	public async Task<ActionResult<Response<DataNavigation<PointInformation>>>> FilterAsync(int numOfPage, string? province, string district, string ward, PointType? type)
	{
		DataNavigation<PointInformation> points = await _pointService.FilterAsync(numOfPage, province, district, ward, type);
		return Ok(new Response<DataNavigation<PointInformation>>("Get points successfully", points));
	}

	[HttpGet]
	public async Task<List<Point>> GetAllTransactionPoints()
			=> await _pointService.GetAllTransactionPointsAsync();

	[HttpGet]
	public async Task<List<Point>> GetAllGatheringPoints()
			=> await _pointService.GetAllGatheringPointsAsync();

	[HttpGet("{id}")]
	public async Task<IActionResult> GetPointById(Guid id)
	{
		Point point = await _pointService.GetPointByIdAsync(id) ?? throw new AppException(HttpStatusCode.NotFound, "Point not found");
		return Ok(new { point });
	}

	[HttpGet]
	public async Task<List<User>> GetAllTransactionPointManagersAsync()
			=> await _pointService.GetAllTransactionPointManagersAsync();

	[HttpGet]
	public async Task<List<User>> GetAllGatheringPointManagersAsync()
			=> await _pointService.GetAllGatheringPointManagersAsync();

	[HttpPost]
	public async Task<IActionResult> Create(CreatePointModel model)
	{
		Point newPoint = _mapper.Map<Point>(model);
		await _pointService.CreateAsync(newPoint);
		return Ok(new { message = "Create point successfully!", point = newPoint });
	}

	[HttpPost]
	public async Task<IActionResult> CreateTransactionPoint(CreatePointModel model)
	{
		Point transactionPoint = _mapper.Map<Point>(model);
		transactionPoint.Type = PointType.TRANSACTION_POINT;
		await _pointService.CreateAsync(transactionPoint);
		return Ok(new { message = "Create transaction point successfully!", point = transactionPoint });
	}

	[HttpPost]
	// [VerifyToken]
	// [VerifyRole(Role.COMPANY_ADMINISTRATOR)]
	public async Task<IActionResult> CreatePoint(CreatePointModel model)
	{
		Point newPoint = _mapper.Map<Point>(model);
		await _pointService.CreateAsync(newPoint);
		return Ok(new { message = "Create point successfully!", point = newPoint });
	}

	[HttpPost]
	//[VerifyToken]
	//[VerifyRole(Role.COMPANY_ADMINISTRATOR)]
	public async Task<IActionResult> CreateGatheringPoint(CreatePointModel model)
	{
		Point gatheringPoint = _mapper.Map<Point>(model);
		gatheringPoint.Type = PointType.GATHERING_POINT;
		await _pointService.CreateAsync(gatheringPoint);
		return Ok(new { message = "Create gathering point successfully!", point = gatheringPoint });
	}

	[HttpPut("{id}")]
	// [VerifyToken]
	// [VerifyOwner]
	// [VerifyRole(new Role[] { Role.COMPANY_ADMINISTRATOR, Role.TRANSACTION_POINT_LEADER, Role.COLLECTION_POINT_LEADER })]
	public async Task<IActionResult> UpdatePointAsync(Guid id, UpdatePointModel model)
	{
		await _pointService.UpdateAsync(id, model);
		return Ok(new { message = "Update point successfully!" });
	}
}