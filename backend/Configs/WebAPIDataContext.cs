namespace CustomAPI.Configs;

using System.Diagnostics;
using CustomAPI.Models;
using Microsoft.EntityFrameworkCore;

public class WebAPIDataContext : DbContext
{
	private readonly Config myCf;
	public WebAPIDataContext(Config config)
	{
		myCf = config;
	}
	protected override void OnModelCreating(ModelBuilder modelCreator)
	{
		base.OnModelCreating(modelCreator);

		// User is staff of a point
		modelCreator.Entity<User>()
			.HasOne(p => p.Point)
			.WithMany(u => u.Staffs)
			.HasForeignKey(e => e.PointId);

		// Shipping is associated with an order
		modelCreator.Entity<Shipping>()
			.HasOne(d => d.Shipment)
			.WithMany(o => o.Deliveries)
			.HasForeignKey(d => d.ShipmentID);

		// Shipping has been sent from a point
		modelCreator.Entity<Shipping>()
			.HasOne(d => d.FromPoint)
			.WithMany()
			.HasForeignKey(e => e.fromptID);

		// Deliver has been sent to a point
		modelCreator.Entity<Shipping>()
			.HasOne(d => d.ToPoint)
			.WithMany()
			.HasForeignKey(e => e.toptID);

		modelCreator.Entity<Shipment>()
			.HasMany(o => o.Items)
			.WithOne()
			.HasForeignKey(e => e.ShipmentID);

		modelCreator.Entity<Shipment>()
			.HasOne(o => o.CurrentPoint)
			.WithMany()
			.HasForeignKey(e => e.CurrentPointId);

		modelCreator.Entity<Gathering_Transaction>()
			.HasOne(tg => tg.GatheringPoint)
			.WithMany()
			.HasForeignKey(tg => tg.GatheringPointId);

		modelCreator.Entity<Gathering_Transaction>()
			.HasOne(tg => tg.TransactionPoint)
			.WithMany()
			.HasForeignKey(tg => tg.TransIden);
	}
	protected override void OnConfiguring(DbContextOptionsBuilder options)
	{
		// connect to postgres
		options.UseNpgsql(myCf.DB.URL);
		// Logging
		options.LogTo(Console.WriteLine, LogLevel.Information).EnableSensitiveDataLogging();
	}

	public DbSet<User> Users { get; set; }
	public DbSet<Point> Points { get; set; }
	public DbSet<Gathering_Transaction> Gathering_Transaction { get; set; }
	public DbSet<Shipment> Shipments { get; set; }
	public DbSet<Shipping> Deliveries { get; set; }
	public DbSet<Item> Items { get; set; }
}