using System.Net;
using CustomAPI.Enums;
using CustomAPI.Models;
using CustomAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CustomAPI.Intermediary;
public class VerifyPointAndAdminAttribute : TypeFilterAttribute
{
	private class VerifyPointAndAdminFilter : ActionFilterAttribute
	{
		public override void OnActionExecuting(ActionExecutingContext context)
		{
			User? user = (User?)context.HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
			if (user.Role != Role.COMPANY_ADMINISTRATOR && user.PointId == null)
				throw new AppException(HttpStatusCode.Forbidden, "You do not have permission to perform this action");
		}
	}
	public VerifyPointAndAdminAttribute() : base(typeof(VerifyPointAndAdminFilter))
	{
		Order = (int)IntermediaryShipment.VERIFY_POINT_AND_ADMIN;
	}
}


