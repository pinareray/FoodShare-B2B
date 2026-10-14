using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FoodShare.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "organizations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    City = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_organizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "donations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Category = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OrganizationId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_donations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_donations_organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "organizations",
                columns: new[] { "Id", "City", "CreatedAt", "Email", "Name", "Type" },
                values: new object[,]
                {
                    { new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01"), "Istanbul", new DateTime(2026, 1, 1, 9, 0, 0, 0, DateTimeKind.Utc), "contact@greenleaf.example", "Green Leaf Bakery", "Donor" },
                    { new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02"), "Ankara", new DateTime(2026, 1, 1, 9, 0, 0, 0, DateTimeKind.Utc), "csr@freshmarket.example", "FreshMarket Supermarket", "Donor" },
                    { new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03"), "Istanbul", new DateTime(2026, 1, 1, 9, 0, 0, 0, DateTimeKind.Utc), "hello@hopefoodbank.example", "Hope Food Bank", "Recipient" }
                });

            migrationBuilder.InsertData(
                table: "donations",
                columns: new[] { "Id", "Category", "CreatedAt", "OrganizationId", "Quantity", "Status", "Title" },
                values: new object[,]
                {
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a01"), "Bakery", new DateTime(2026, 1, 1, 9, 0, 0, 0, DateTimeKind.Utc), new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01"), 40, "Pending", "Fresh sourdough bread" },
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a02"), "Produce", new DateTime(2026, 1, 1, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02"), 25, "Pending", "Seasonal vegetables crate" },
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a03"), "Dairy", new DateTime(2026, 1, 1, 11, 0, 0, 0, DateTimeKind.Utc), new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02"), 60, "Reserved", "Yogurt & cheese assortment" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_donations_OrganizationId",
                table: "donations",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_donations_Status",
                table: "donations",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_organizations_Email",
                table: "organizations",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "donations");

            migrationBuilder.DropTable(
                name: "organizations");
        }
    }
}
