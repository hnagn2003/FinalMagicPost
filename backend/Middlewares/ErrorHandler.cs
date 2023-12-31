namespace CustomAPI.Intermediary;

using CustomAPI.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

public class ErrorHandlerMiddleware
{
	private readonly RequestDelegate _next;
	private readonly ILogger _logger;

	public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
	{
		_next = next;
		_logger = logger;
	}

	public async Task Invoke(HttpContext context)
	{
		try
		{
			await _next(context);
		}
		catch (Exception error)
		{
			var response = context.Response;
			response.ContentType = "application/json";

			switch (error)
			{
				case AppException e:
					// custom application error
					if (e.Code != 0)
						response.StatusCode = (int)e.Code;
					else
						response.StatusCode = (int)HttpStatusCode.BadRequest;
					break;
				default:
					// unhandled error
					_logger.LogError(error, "{Message}", error.Message);
					response.StatusCode = (int)HttpStatusCode.InternalServerError;
					break;
			}

			var result = JsonSerializer.Serialize(new { message = error?.Message });
			await response.WriteAsync(result);
		}
	}
}