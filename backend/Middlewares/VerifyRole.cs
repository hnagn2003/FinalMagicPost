using System.Net;
using CustomAPI.Enums;
using CustomAPI.Models;
using CustomAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CustomAPI.Intermediary;
public class VerifyRoleAttribute : TypeFilterAttribute
{
	public VerifyRoleAttribute(Role role) : base(typeof(VerifyRoleFilter))
	{
		Arguments = new object[] { new Role[] { role } };
		Order = (int)IntermediaryShipment.VERIFY_ROLE;
	}

	public VerifyRoleAttribute(params Role[] roles) : base(typeof(VerifyRoleFilter))
	{
		Arguments = new object[] { roles };
		Order = (int)IntermediaryShipment.VERIFY_ROLE;
	}
}

public class VerifyRoleFilter : ActionFilterAttribute
{
	private readonly Role[] _roles;

	public VerifyRoleFilter(Role[] roles)
	{
		_roles = roles;
	}

	public override void OnActionExecuting(ActionExecutingContext context)
	{
		User? user = (User?)context.HttpContext.Items["user"] ?? throw new AppException(HttpStatusCode.Unauthorized, "Unauthorized");
		if (!_roles.Contains(user.Role))
			throw new AppException(HttpStatusCode.Forbidden, "You do not have permission to perform this action");
	}
}
