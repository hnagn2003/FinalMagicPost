using AutoMapper;
using CustomAPI.Configs;
using CustomAPI.Enums;
using CustomAPI.Intermediary;
using CustomAPI.Models;
using CustomAPI.Services;
using CustomAPI.Utils;
using Microsoft.AspNetCore.Mvc;

namespace CustomAPI.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
	private readonly IMapper _mapper;
	private readonly Config myCf;
	private readonly IUserService _userService;
	private readonly IPointService _pointService;
	public UserController(IMapper mapper, Config config, IUserService userService, IPointService pointService)
	{
		_mapper = mapper;
		myCf = config;
		_userService = userService;
		_pointService = pointService;
	}

	[HttpPost]
	public async Task<ActionResult<Response<PublicUserInfo>>> CreateAsync(CreateUserModel model)
	{
		User newUser = _mapper.Map<User>(model);
		newUser.Password = Password.Hash(Password.DF_PASS);
		Point? point = await _pointService.FindByAddressAsync(model.Province!, model.District!, model.Ward!) ?? throw new AppException("Point not found in this area!");
		newUser.PointId = point.Id;
		await _userService.CreateAsync(newUser);
		return Ok(new Response<PublicUserInfo>("Create staff successfully!", newUser.GetPublicInfo()));
	}

	[HttpGet]
	public async Task<ActionResult<Response<List<User>>>> GetAsync()
	{
		List<User> users = await _userService.GetAsync();
		return Ok(new Response<List<User>>("Get users successfully!", users));
	}

	[HttpGet]
	[VerifyToken]
	public async Task<ActionResult<Response<DataNavigation<PublicUserInfo>>>> FilterAsync(int numOfPage, Role? role)
	{
		DataNavigation<PublicUserInfo> users = await _userService.FilterAsync(numOfPage, role);
		return Ok(new Response<DataNavigation<PublicUserInfo>>("Get users successfully", users));
	}

	[HttpGet("{id}")]
	// [VerifyOwner]
	[VerifyToken]
	// [VerifyRole(Role.COMPANY_ADMINISTRATOR)]
	public async Task<ActionResult<User>> GetAsync(Guid id)
	{
		var user = await _userService.GetAsyncById(id);
		if (user == null)
			return NotFound(new { message = "User not found" });
		return user;
	}

	[HttpPut("{id}")]
	[VerifyOwner]
	[VerifyToken]
	public async Task<ActionResult> UpdateUserAsync(Guid id, UpdateUserModel model)
	{
		model.Password = Password.Hash(model.Password!);
		await _userService.UpdateAsync(id, model);
		return Ok(new { message = "Update user successfully!" });
	}

	[HttpPost]
	public async Task<IActionResult> CreateTransactionStaffAsync(CreateUserModel model)
	{
		User user = _mapper.Map<User>(model);
		user.Password = Password.Hash(user.Password);
		user.Role = Role.TRANSACION_STAFF;
		await _userService.CreateAsync(user);
		return CreatedAtAction(nameof(GetAsync), new { id = user.Id }, new { message = "Create transaction staff successfully!", user });
	}

	[HttpPost]
	public async Task<IActionResult> CreateGatheringStaffAsync(CreateUserModel model)
	{
		User user = _mapper.Map<User>(model);
		user.Password = Password.Hash(user.Password);
		user.Role = Role.GATHERING_STAFF;
		await _userService.CreateAsync(user);
		return CreatedAtAction(nameof(GetAsync), new { id = user.Id }, new { message = "Create transaction staff successfully!", user });
	}
}