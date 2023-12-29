using System.ComponentModel.DataAnnotations;
using CustomAPI.Enums;

namespace CustomAPI.Models;

public class Point : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string PointName { get; set; }
	public required PointType Type { get; set; }
	public required string Address { get; set; }
	public required float Primary_Address { get; set; }
	public required float Secondary_Address { get; set; }
	public required string Province { get; set; }
	public required string District { get; set; }
	public required string Ward { get; set; }
	[EmailAddress]
	public string? Email { get; set; }
	[Phone]
	public string? Phone { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public List<User> Staffs { get; } = new List<User>();
	public PointInformation GetPointInformation()
			=> new()
			{
				Id = Id,
				Type = Type,
				PointName = PointName,
				Address = new()
				{
					Name = Address,
					Lat = Primary_Address,
					Long = Secondary_Address,
					Province = Province,
					District = District,
					Ward = Ward
				},
				Email = Email,
				Phone = Phone,
				CreatedAt = CreatedAt
			};
}

public class PointInformation : Model
{
	public Guid? Id { get; set; }
	public PointType? Type { get; set; }
	public string? PointName { get; set; }
	public Address? Address { get; set; }
	public string? Email { get; set; }
	public string? Phone { get; set; }
	public DateTime? CreatedAt { get; set; }
}

public class CreatePointModel : Model
{
	[Required]
	public string? PointName { get; set; }
	[Required]
	public PointType? Type { get; set; }
	[Required]
	public string? Address { get; set; }
	[Required]
	public float? Primary_Address { get; set; }
	[Required]
	public float? Secondary_Address { get; set; }
	[Required]
	public string? Province { get; set; }
	[Required]
	public string? District { get; set; }
	[Required]
	public string? Ward { get; set; }
	[Required]
	[EmailAddress]
	public string? Email { get; set; }
	[Required]
	[Phone]
	public string? Phone { get; set; }
}

public class UpdatePointModel : Model
{
	public string? PointName { get; set; }
	public string? ZipCode { get; set; }
	public string? Address { get; set; }
	[EmailAddress]
	public string? Email { get; set; }
	[Phone]
	public string? Phone { get; set; }
}