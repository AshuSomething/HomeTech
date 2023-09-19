using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HomeTech.Services.ComplaintAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedComplaintTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Complaints",
                columns: new[] { "ComplaintID", "Category", "Description", "Service" },
                values: new object[,]
                {
                    { 1, "Plumber", "Water is draining out from the damaged position", "Pipe Leakage" },
                    { 2, "Electrician", "While Switching it on/off it is throwing sparks", "Switch Replacement" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Complaints",
                keyColumn: "ComplaintID",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Complaints",
                keyColumn: "ComplaintID",
                keyValue: 2);
        }
    }
}
