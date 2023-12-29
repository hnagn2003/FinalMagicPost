using System.Net;
using CustomAPI.Configs;
using CustomAPI.Enums;
using CustomAPI.Models;
using CustomAPI.Utils;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace CustomAPI.Intermediary;
class VerifyToken
{
	private readonly Config myCf;
	private readonly MyPaseto _paseto;
	private readonly RequestDelegate _next;
	private readonly IDatabase _redis;

	public VerifyToken(Config config, MyPaseto paseto, CustomDB redis, RequestDelegate next)
	{
		myCf = config;
		_paseto = paseto;
		_redis = redis.GetDatabase();
		_next = next;
	}

	public async Task Invoke(HttpContext context)
	{
		string? accessToken = context.Request.Cookies["access_token"];
		string? refreshToken = context.Request.Cookies["refresh_token"];
		if (accessToken == null && refreshToken == null)
			throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
		else if (accessToken == null && refreshToken != null)
		{
			var payload = _paseto.Decode(refreshToken, myCf.TOKEN.REFRESH_SECRET).Paseto.Payload["value"];
			if (payload == null)
				throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
			else
			{
				var str = payload.ToString();
				if (str != null)
				{
					User? user = JsonConvert.DeserializeObject<User>(str);
					if (user != null)
					{
						var isExist = _redis.StringGet("rf_" + user.Id);
						if (isExist == RedisValue.Null || isExist == false)
							throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
						else
						{
							context.Items["user"] = user;
							context.Items["reset_access"] = true;
							await _next(context);
						}
					}
				}
			}
		}
		else if (accessToken != null)
		{
			var payload = _paseto.Decode(accessToken, myCf.TOKEN.SECRET).Paseto.Payload["value"];
			if (payload == null)
				throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
			else
			{
				var str = payload.ToString();
				if (str != null)
				{
					User? user = JsonConvert.DeserializeObject<User>(str);
					if (user != null)
					{
						var isExist = _redis.StringGet("ac_" + user.Id);
						if (isExist == RedisValue.Null || isExist == false)
							throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
						else
						{
							context.Items["user"] = user;
							await _next(context);
						}
					}
				}
			}
		}
	}
}

public class VerifyTokenMiddleware
{
	public void Configure(IApplicationBuilder app)
	{
		app.UseMiddleware<VerifyToken>();
	}
}

public class VerifyTokenAttribute : MiddlewareFilterAttribute
{
	public VerifyTokenAttribute() : base(typeof(VerifyTokenMiddleware))
	{
		Order = (int)IntermediaryShipment.VERIFY_TOKEN;
	}
}