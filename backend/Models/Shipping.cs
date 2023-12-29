using System.ComponentModel.DataAnnotations;
using CustomAPI.Enums;
using Microsoft.AspNetCore.SignalR;

namespace CustomAPI.Models;
public class Shipping : Model
{
	[Key]
	public Guid? Id { get; set; }
	// Associated with a point that send delivery package from
	public Guid? fromptID { get; set; }
	// Reference to a point that send delivery package
	public Point? FromPoint { get; }
	// Associated with a point that send delivery package to
	public Guid? toptID { get; set; }
	// Reference to a point that receive delivery package
	public Point? ToPoint { get; }
	// Associated with an order
	public Guid? ShipmentID { get; set; }
	// Reference to order
	public Shipment? Shipment { get; }
	public ShippingShipmentStatus ShipmentStatus { get; set; }
	public DateTime? ReceiveTime { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
	public Shipping()
	{

	}
	public List<ShippingHistory> GetOperationShippingHistory()
	{
		List<ShippingHistory> history = new List<ShippingHistory>();
		history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = ToPoint!.ToString(), Type = "outgoing", Status = "pending", Reason = "", Time = CreatedAt });
		history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = FromPoint!.ToString(), Status = "incoming", Reason = "", Time = CreatedAt });
		if (ShipmentStatus == ShippingShipmentStatus.UNSUCCESS)
		{
			history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = ToPoint.ToString(), Type = "outgoing", Status = "rejected", Reason = "Your package couldn't reach the target point!", Time = ReceiveTime });
			history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = FromPoint.ToString(), Type = "incoming", Status = "rejected", Reason = "Your package couldn't reach the target point!", Time = ReceiveTime });
		}
		else if (ShipmentStatus == ShippingShipmentStatus.ARRIVED)
		{
			history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = ToPoint.ToString(), Type = "outgoing", Status = "confirmed", Reason = "", Time = ReceiveTime });
			history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = FromPoint.ToString(), Type = "incoming", Status = "confirmed", Reason = "", Time = ReceiveTime });
		}
		else
		{
			history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = ToPoint.ToString(), Type = "outgoing", Status = "confirmed", Reason = "", Time = ReceiveTime });
			history.Add(new ShippingHistory() { ShipmentID = ShipmentID, Point = FromPoint.ToString(), Type = "incoming", Status = "confirmed", Reason = "", Time = ReceiveTime });
		}
		return history;
	}

}

public class CreateShippingModel : Model
{
	[Required]
	public Guid? fromptID { get; set; }
	[Required]
	public Guid? toptID { get; set; }
	[Required]
	public Guid? ShipmentID { get; set; }
}

public class ShippingHistory
{
	public Guid? ShipmentID { get; set; }
	public string? Type { get; set; }
	public string? Point { get; set; }
	public string? Status { get; set; }
	public string? Reason { get; set; }
	public DateTime? Time { get; set; }
}