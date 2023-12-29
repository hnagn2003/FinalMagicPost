using System.ComponentModel.DataAnnotations;

namespace CustomAPI.Models;

public class Gathering_Transaction : Model
{
	[Key]
	public Guid Id { get; set; }
	public Guid? TransIden { get; set; }
	public Point? TransactionPoint { get; set; }
	public Guid? GatheringPointId { get; set; }
	public Point? GatheringPoint { get; set; }

}