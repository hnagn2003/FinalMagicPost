using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CustomAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Points",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PointName = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Primary_Address = table.Column<float>(type: "real", nullable: false),
                    Secondary_Address = table.Column<float>(type: "real", nullable: false),
                    Province = table.Column<string>(type: "text", nullable: false),
                    District = table.Column<string>(type: "text", nullable: false),
                    Ward = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Phone = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Points", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Shipments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SenderName = table.Column<string>(type: "text", nullable: false),
                    SenderAddress = table.Column<string>(type: "text", nullable: false),
                    SenderPrimary_Address = table.Column<float>(type: "real", nullable: false),
                    SenderSecondary_Address = table.Column<float>(type: "real", nullable: false),
                    SenderProvince = table.Column<string>(type: "text", nullable: false),
                    SenderDistrict = table.Column<string>(type: "text", nullable: false),
                    SenderWard = table.Column<string>(type: "text", nullable: false),
                    SenderPhone = table.Column<string>(type: "text", nullable: false),
                    ReceiverName = table.Column<string>(type: "text", nullable: false),
                    ReceiverAddress = table.Column<string>(type: "text", nullable: false),
                    ReceiverPrimary_Address = table.Column<float>(type: "real", nullable: false),
                    ReceiverSecondary_Address = table.Column<float>(type: "real", nullable: false),
                    ReceiverProvince = table.Column<string>(type: "text", nullable: false),
                    ReceiverDistrict = table.Column<string>(type: "text", nullable: false),
                    ReceiverWard = table.Column<string>(type: "text", nullable: false),
                    ReceiverPhone = table.Column<string>(type: "text", nullable: false),
                    Properties = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Cod = table.Column<int>(type: "integer", nullable: false),
                    Payer = table.Column<string>(type: "text", nullable: false),
                    Note = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    CurrentPointId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shipments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Shipments_Points_CurrentPointId",
                        column: x => x.CurrentPointId,
                        principalTable: "Points",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Gathering_Transaction",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TransIden = table.Column<Guid>(type: "uuid", nullable: true),
                    GatheringPointId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gathering_Transaction", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gathering_Transaction_Points_GatheringPointId",
                        column: x => x.GatheringPointId,
                        principalTable: "Points",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Gathering_Transaction_Points_TransIden",
                        column: x => x.TransIden,
                        principalTable: "Points",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    PointId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Points_PointId",
                        column: x => x.PointId,
                        principalTable: "Points",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Deliveries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    fromptID = table.Column<Guid>(type: "uuid", nullable: true),
                    toptID = table.Column<Guid>(type: "uuid", nullable: true),
                    ShipmentID = table.Column<Guid>(type: "uuid", nullable: true),
                    ShipmentStatus = table.Column<int>(type: "integer", nullable: false),
                    ReceiveTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Deliveries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Deliveries_Shipments_ShipmentID",
                        column: x => x.ShipmentID,
                        principalTable: "Shipments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Deliveries_Points_fromptID",
                        column: x => x.fromptID,
                        principalTable: "Points",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Deliveries_Points_toptID",
                        column: x => x.toptID,
                        principalTable: "Points",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Weight = table.Column<double>(type: "double precision", nullable: false),
                    Value = table.Column<double>(type: "double precision", nullable: false),
                    ShipmentID = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Items_Shipments_ShipmentID",
                        column: x => x.ShipmentID,
                        principalTable: "Shipments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_fromptID",
                table: "Deliveries",
                column: "fromptID");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_ShipmentID",
                table: "Deliveries",
                column: "ShipmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Deliveries_toptID",
                table: "Deliveries",
                column: "toptID");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ShipmentID",
                table: "Items",
                column: "ShipmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Shipments_CurrentPointId",
                table: "Shipments",
                column: "CurrentPointId");

            migrationBuilder.CreateIndex(
                name: "IX_Gathering_Transaction_GatheringPointId",
                table: "Gathering_Transaction",
                column: "GatheringPointId");

            migrationBuilder.CreateIndex(
                name: "IX_Gathering_Transaction_TransIden",
                table: "Gathering_Transaction",
                column: "TransIden");

            migrationBuilder.CreateIndex(
                name: "IX_Users_PointId",
                table: "Users",
                column: "PointId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Deliveries");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "Gathering_Transaction");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Shipments");

            migrationBuilder.DropTable(
                name: "Points");
        }
    }
}
