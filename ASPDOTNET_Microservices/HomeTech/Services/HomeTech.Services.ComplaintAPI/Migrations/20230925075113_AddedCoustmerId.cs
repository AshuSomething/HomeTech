using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeTech.Services.ComplaintAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddedCoustmerId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CustomerId",
                table: "Complaints",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Complaints",
                keyColumn: "ComplaintID",
                keyValue: 1,
                columns: new[] { "CustomerId", "Date" },
                values: new object[] { "1", new DateTime(2023, 9, 25, 7, 51, 12, 432, DateTimeKind.Utc).AddTicks(1272) });

            migrationBuilder.UpdateData(
                table: "Complaints",
                keyColumn: "ComplaintID",
                keyValue: 2,
                columns: new[] { "CustomerId", "Date" },
                values: new object[] { "1", new DateTime(2023, 9, 25, 7, 51, 12, 432, DateTimeKind.Utc).AddTicks(1331) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Complaints");

            migrationBuilder.UpdateData(
                table: "Complaints",
                keyColumn: "ComplaintID",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2023, 9, 22, 19, 6, 32, 760, DateTimeKind.Utc).AddTicks(7414));

            migrationBuilder.UpdateData(
                table: "Complaints",
                keyColumn: "ComplaintID",
                keyValue: 2,
                column: "Date",
                value: new DateTime(2023, 9, 22, 19, 6, 32, 760, DateTimeKind.Utc).AddTicks(7445));
        }
    }
}
