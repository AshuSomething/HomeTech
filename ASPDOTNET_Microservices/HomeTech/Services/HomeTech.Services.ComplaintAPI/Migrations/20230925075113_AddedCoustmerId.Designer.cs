﻿// <auto-generated />
using System;
using HomeTech.Services.ComplaintAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HomeTech.Services.ComplaintAPI.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20230925075113_AddedCoustmerId")]
    partial class AddedCoustmerId
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("HomeTech.Services.ComplaintAPI.Models.Complaint", b =>
                {
                    b.Property<int>("ComplaintID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ComplaintID"));

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CustomerId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Service")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ComplaintID");

                    b.ToTable("Complaints");

                    b.HasData(
                        new
                        {
                            ComplaintID = 1,
                            Category = "Plumber",
                            CustomerId = "1",
                            Date = new DateTime(2023, 9, 25, 7, 51, 12, 432, DateTimeKind.Utc).AddTicks(1272),
                            Service = "Pipe Leakage"
                        },
                        new
                        {
                            ComplaintID = 2,
                            Category = "Electrician",
                            CustomerId = "1",
                            Date = new DateTime(2023, 9, 25, 7, 51, 12, 432, DateTimeKind.Utc).AddTicks(1331),
                            Service = "Switch Replacement"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}