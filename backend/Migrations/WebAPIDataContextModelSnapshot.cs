﻿// <auto-generated />
using System;
using CustomAPI.Configs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace CustomAPI.Migrations
{
    [DbContext(typeof(WebAPIDataContext))]
    partial class WebAPIDataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelCreator)
        {
#pragma warning disable 612, 618
            modelCreator
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelCreator);

            modelCreator.Entity("CustomAPI.Models.Shipping", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("fromptID")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ShipmentID")
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("ReceiveTime")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("ShipmentStatus")
                        .HasColumnType("integer");

                    b.Property<Guid?>("toptID")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("fromptID");

                    b.HasIndex("ShipmentID");

                    b.HasIndex("toptID");

                    b.ToTable("Deliveries");
                });

            modelCreator.Entity("CustomAPI.Models.Item", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<Guid?>("ShipmentID")
                        .HasColumnType("uuid");

                    b.Property<int>("Quantity")
                        .HasColumnType("integer");

                    b.Property<double>("Value")
                        .HasColumnType("double precision");

                    b.Property<double>("Weight")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.HasIndex("ShipmentID");

                    b.ToTable("Items");
                });

            modelCreator.Entity("CustomAPI.Models.Shipment", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("Cod")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("CurrentPointId")
                        .HasColumnType("uuid");

                    b.Property<string>("Note")
                        .HasColumnType("text");

                    b.Property<string>("Payer")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Properties")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReceiverAddress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float>("ReceiverPrimary_Address")
                        .HasColumnType("real");

                    b.Property<float>("ReceiverSecondary_Address")
                        .HasColumnType("real");

                    b.Property<string>("ReceiverDistrict")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReceiverName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReceiverPhone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReceiverProvince")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReceiverWard")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SenderAddress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float>("SenderPrimary_Address")
                        .HasColumnType("real");

                    b.Property<float>("SenderSecondary_Address")
                        .HasColumnType("real");

                    b.Property<string>("SenderDistrict")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SenderName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SenderPhone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SenderProvince")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SenderWard")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CurrentPointId");

                    b.ToTable("Shipments");
                });

            modelCreator.Entity("CustomAPI.Models.Point", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float>("Primary_Address")
                        .HasColumnType("real");

                    b.Property<float>("Secondary_Address")
                        .HasColumnType("real");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("District")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .HasColumnType("text");

                    b.Property<string>("PointName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Province")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.Property<string>("Ward")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Points");
                });

            modelCreator.Entity("CustomAPI.Models.Gathering_Transaction", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("GatheringPointId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("TransIden")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("GatheringPointId");

                    b.HasIndex("TransIden");

                    b.ToTable("Gathering_Transaction");
                });

            modelCreator.Entity("CustomAPI.Models.User", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("PointId")
                        .HasColumnType("uuid");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("PointId");

                    b.ToTable("Users");
                });

            modelCreator.Entity("CustomAPI.Models.Shipping", b =>
                {
                    b.HasOne("CustomAPI.Models.Point", "FromPoint")
                        .WithMany()
                        .HasForeignKey("fromptID");

                    b.HasOne("CustomAPI.Models.Shipment", "Shipment")
                        .WithMany("Deliveries")
                        .HasForeignKey("ShipmentID");

                    b.HasOne("CustomAPI.Models.Point", "ToPoint")
                        .WithMany()
                        .HasForeignKey("toptID");

                    b.Navigation("FromPoint");

                    b.Navigation("Shipment");

                    b.Navigation("ToPoint");
                });

            modelCreator.Entity("CustomAPI.Models.Item", b =>
                {
                    b.HasOne("CustomAPI.Models.Shipment", null)
                        .WithMany("Items")
                        .HasForeignKey("ShipmentID");
                });

            modelCreator.Entity("CustomAPI.Models.Shipment", b =>
                {
                    b.HasOne("CustomAPI.Models.Point", "CurrentPoint")
                        .WithMany()
                        .HasForeignKey("CurrentPointId");

                    b.Navigation("CurrentPoint");
                });

            modelCreator.Entity("CustomAPI.Models.Gathering_Transaction", b =>
                {
                    b.HasOne("CustomAPI.Models.Point", "GatheringPoint")
                        .WithMany()
                        .HasForeignKey("GatheringPointId");

                    b.HasOne("CustomAPI.Models.Point", "TransactionPoint")
                        .WithMany()
                        .HasForeignKey("TransIden");

                    b.Navigation("GatheringPoint");

                    b.Navigation("TransactionPoint");
                });

            modelCreator.Entity("CustomAPI.Models.User", b =>
                {
                    b.HasOne("CustomAPI.Models.Point", "Point")
                        .WithMany("Staffs")
                        .HasForeignKey("PointId");

                    b.Navigation("Point");
                });

            modelCreator.Entity("CustomAPI.Models.Shipment", b =>
                {
                    b.Navigation("Deliveries");

                    b.Navigation("Items");
                });

            modelCreator.Entity("CustomAPI.Models.Point", b =>
                {
                    b.Navigation("Staffs");
                });
#pragma warning restore 612, 618
        }
    }
}
