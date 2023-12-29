using System.ComponentModel.DataAnnotations;
using CustomAPI.Enums;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Asn1.Cms;

namespace CustomAPI.Models;

public class Shipment : Model
{
	[Key]
	public Guid? Id { get; set; }
	public required string SenderName { get; set; }
	public required string SenderAddress { get; set; }
	public required float SenderPrimary_Address { get; set; }
	public required float SenderSecondary_Address { get; set; }
	public required string SenderProvince { get; set; }
	public required string SenderDistrict { get; set; }
	public required string SenderWard { get; set; }
	[Phone]
	public required string SenderPhone { get; set; }
	public required string ReceiverName { get; set; }
	public required string ReceiverAddress { get; set; }
	public required float ReceiverPrimary_Address { get; set; }
	public required float ReceiverSecondary_Address { get; set; }
	public required string ReceiverProvince { get; set; }
	public required string ReceiverDistrict { get; set; }
	public required string ReceiverWard { get; set; }
	[Phone]
	public required string ReceiverPhone { get; set; }
	public IList<Shipping> Deliveries { get; } = new List<Shipping>();
	public List<Item> Items { get; set; } = new List<Item>();
	public required string Properties { get; set; }
	public string? Type { get; set; }
	public int Cod { get; set; }
	public required string Payer { get; set; }
	public string? Note { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
	public ShipmentShipmentStatus Status { get; set; } = ShipmentShipmentStatus.PENDING;
	public Guid? CurrentPointId { get; set; }
	public Point? CurrentPoint { get; set; }
	public PublicShipmentInfo GetPublicShipmentInfo()
			=> new()
			{
				Id = Id,
				CreatedAt = CreatedAt,
				Status = Status,
				Sender = new()
				{
					Name = SenderName,
					Address = new()
					{
						Name = SenderAddress,
						Lat = SenderPrimary_Address,
						Long = SenderSecondary_Address,
						Province = SenderProvince,
						District = SenderDistrict,
						Ward = SenderWard
					},
					Phone = SenderPhone
				},
				Receiver = new()
				{
					Name = ReceiverName,
					Address = new()
					{
						Name = ReceiverAddress,
						Lat = ReceiverPrimary_Address,
						Long = ReceiverSecondary_Address,
						Province = ReceiverProvince,
						District = ReceiverDistrict,
						Ward = ReceiverWard
					},
					Phone = ReceiverPhone
				},
				PackageInfo = new() { Type = Type, Items = Items, Properties = Properties.Split("-").ToList() },
				ExtraData = new() { Cod = Cod, Payer = Payer, Note = Note },
			};
}

public class CreateShipmentModel : Model
{
	[Required]
	public required CustomerProps Sender { get; set; }
	[Required]
	public required CustomerProps Receiver { get; set; }
	[Required]
	public required PackageInfo PackageInfo { get; set; }
	[Required]
	public required ExtraData ExtraData { get; set; }
	public Guid? CurrentPointId { get; set; }
}

public class PublicShipmentInfo : Model
{
	public Guid? Id { get; set; }
	public DateTime? CreatedAt { get; set; }
	public ShipmentShipmentStatus? Status { get; set; }
	public required CustomerProps Sender { get; set; }
	public required CustomerProps Receiver { get; set; }
	public required PackageInfo PackageInfo { get; set; }
	public required ExtraData ExtraData { get; set; }
}

public class ShipmentHistory
{
	public Point? Point { get; set; }
	public DateTime? ArriveAt { get; set; }
}



public class PackageInfo
{
	public string? Type { get; set; }
	public List<Item> Items { get; set; } = new List<Item>();
	public List<string> Properties { get; set; } = new List<string>();
}

public class ExtraData
{
	public double Cod { get; set; }
	public string? Payer { get; set; }
	public string? Note { get; set; }
}

public class Address
{
	public required string Name { get; set; }
	public required float Lat { get; set; }
	public required float Long { get; set; }
	public required string Province { get; set; }
	public required string District { get; set; }
	public required string Ward { get; set; }
}

public class CustomerProps
{
	public string? Name { get; set; }
	public required Address Address { get; set; }
	public string? Phone { get; set; }
}

public class UpdateShipmentModel
{
	public ShipmentShipmentStatus ShipmentStatus { get; set; }
	public string? SenderName { get; set; }
	public string? SenderAddress { get; set; }
	[Phone]
	public string? SenderPhone { get; set; }
	public string? Receiver { get; set; }
	public string? ReceiverAddress { get; set; }
	[Phone]
	public string? ReceiverPhone { get; set; }
}

public class ConfirmIncomingShipmentModel
{
	public Guid? orderId { get; set; }
	public bool Confirm { get; set; }
}
