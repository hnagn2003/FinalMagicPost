using System.Net;
using AutoMapper;
using CustomAPI.Configs;
using CustomAPI.Models;
using CustomAPI.Utils;
using Microsoft.EntityFrameworkCore;
using CustomAPI.Enums;
using StackExchange.Redis;
using Role = CustomAPI.Enums.Role;

namespace CustomAPI.Services;

public interface IUserService
{
	Task<List<User>> GetAsync();
	Task<DataNavigation<PublicUserInfo>> FilterAsync(int numOfPage, Role? role);
	Task<User?> GetAsyncById(Guid id);
	Task<User?> GetAsyncByUsername(string username);
	Task<User?> GetAsyncByEmail(string email);
	Task CreateAsync(User newUser);
	Task UpdateAsync(Guid id, UpdateUserModel model);
	Task<(string, DateTime)> PrepareAccessToken(PublicUserInfo info);
	Task<(string, DateTime)> PrepareRefreshToken(PublicUserInfo info);
}

public class UserService : IUserService
{
	private readonly IMapper _mapper;
	private readonly Config myCf;
	private readonly MyPaseto _paseto;
	private readonly WebAPIDataContext _webAPIDataContext;
	private readonly DbSet<User> _usersRepository;
	private readonly IDatabase _redis;

	public UserService(IMapper mapper, Config config, MyPaseto paseto, CustomDB redis, WebAPIDataContext webAPIDataContext)
	{
		_mapper = mapper;
		myCf = config;
		_paseto = paseto;
		_webAPIDataContext = webAPIDataContext;
		_usersRepository = _webAPIDataContext.Users;
		_redis = redis.GetDatabase();
	}

	public async Task<List<User>> GetAsync()
			=> await _usersRepository.ToListAsync();

	public async Task<DataNavigation<PublicUserInfo>> FilterAsync(int numOfPage, Role? role)
	{
		var users = _usersRepository.AsQueryable();
		if (role != null)
		{
			users = _usersRepository.Where(u => u.Role == role);
		}
		List<PublicUserInfo> result = await users.OrderBy(u => u.Role)
												.Select(o => o.GetPublicInfo())
												.Skip((int)Navigation.PAGESIZE * (numOfPage - 1))
												.Take((int)Navigation.PAGESIZE)
												.ToListAsync();
		return new DataNavigation<PublicUserInfo>(result, users.Count(), numOfPage);
	}

	public async Task<User?> GetAsyncById(Guid id)
			=> await _usersRepository
						.Where(u => u.Id == id)
						// .Include(u => u.StaffPoint)
						// 	.ThenInclude(p => p != null ? p.Staffs : null)
						// .Include(u => u.StaffPoint)
						// 	.ThenInclude(p => p != null ? p.Manager : null)
						// .Include(u => u.ManagerPoint)
						// 	.ThenInclude(p => p != null ? p.Staffs : null)
						// .Include(u => u.ManagerPoint)
						// 	.ThenInclude(p => p != null ? p.Manager : null)
						.FirstOrDefaultAsync();

	public async Task<User?> GetAsyncByUsername(string username) =>
			await _usersRepository.FirstOrDefaultAsync(x => x.Username == username);

	public async Task<User?> GetAsyncByEmail(string email) =>
			await _usersRepository.FirstOrDefaultAsync(x => x.Email == email);

	public async Task CreateAsync(User newUser)
	{
		await _usersRepository.AddAsync(newUser);
		await _webAPIDataContext.SaveChangesAsync();
	}

	public async Task UpdateAsync(Guid id, UpdateUserModel model)
	{
		User user = await GetAsyncById(id) ?? throw new AppException(HttpStatusCode.NotFound, "User not found");
		_mapper.Map(model, user);
		_usersRepository.Update(user);
		_webAPIDataContext.SaveChanges();
	}

	public async Task RemoveAsync(Guid id) =>
			await _usersRepository.Where(c => c.Id == id).ExecuteDeleteAsync();

	public async Task<(string, DateTime)> PrepareAccessToken(PublicUserInfo info)
	{
		var accessToken = _paseto.Encode(info, myCf.TOKEN.SECRET);
		var accessExp = DateTime.Now.AddHours(myCf.TOKEN.TOKEN_EXPIRE_HOURS);
		await _redis.StringSetAsync("ac_" + info.Id, true, accessExp.TimeOfDay);
		return (accessToken, accessExp);
	}

	public async Task<(string, DateTime)> PrepareRefreshToken(PublicUserInfo info)
	{
		var refreshToken = _paseto.Encode(info, myCf.TOKEN.REFRESH_SECRET);
		var refreshExp = DateTime.Now.AddDays(myCf.TOKEN.REFRESH_TOKEN_EXPIRE_WEEKS * 7);
		await _redis.StringSetAsync("rf_" + info.Id, true, refreshExp.TimeOfDay);
		return (refreshToken, refreshExp);
	}
}