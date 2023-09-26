using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeTech.Services.ComplaintAPI.Migrations
{
    /// <inheritdoc />
    public partial class ComaplintDBadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Complaints",
                columns: table => new
                {
                    ComplaintID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Service = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Complaints", x => x.ComplaintID);
                });

            migrationBuilder.InsertData(
                table: "Complaints",
                columns: new[] { "ComplaintID", "Category", "CustomerId", "Date", "Service" },
                values: new object[,]
                {
                    { 1, "Plumber", "1", new DateTime(2023, 9, 26, 12, 17, 46, 13, DateTimeKind.Utc).AddTicks(440), "Pipe Leakage" },
                    { 2, "Electrician", "1", new DateTime(2023, 9, 26, 12, 17, 46, 13, DateTimeKind.Utc).AddTicks(492), "Switch Replacement" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Complaints");
        }
    }
}
