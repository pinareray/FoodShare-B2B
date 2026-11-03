using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FoodShare.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class DonationLifecycleAndTurkishSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CollectedAt",
                table: "donations",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiresAt",
                table: "donations",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RecipientOrganizationId",
                table: "donations",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReservedAt",
                table: "donations",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a01"),
                columns: new[] { "CollectedAt", "ExpiresAt", "RecipientOrganizationId", "ReservedAt", "Title" },
                values: new object[] { null, null, null, null, "Taze ekşi maya ekmek" });

            migrationBuilder.UpdateData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a02"),
                columns: new[] { "CollectedAt", "ExpiresAt", "RecipientOrganizationId", "ReservedAt", "Title" },
                values: new object[] { null, null, null, null, "Mevsim sebzeleri kasası" });

            migrationBuilder.UpdateData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a03"),
                columns: new[] { "CollectedAt", "ExpiresAt", "RecipientOrganizationId", "ReservedAt", "Title" },
                values: new object[] { null, null, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03"), new DateTime(2026, 1, 1, 13, 0, 0, 0, DateTimeKind.Utc), "Yoğurt ve peynir çeşitleri" });

            migrationBuilder.InsertData(
                table: "donations",
                columns: new[] { "Id", "Category", "CollectedAt", "CreatedAt", "ExpiresAt", "OrganizationId", "Quantity", "RecipientOrganizationId", "ReservedAt", "Status", "Title" },
                values: new object[,]
                {
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a05"), "Packaged", new DateTime(2025, 12, 27, 14, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 27, 9, 0, 0, 0, DateTimeKind.Utc), null, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02"), 120, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03"), new DateTime(2025, 12, 27, 11, 0, 0, 0, DateTimeKind.Utc), "Collected", "Paketli makarna ve pirinç" },
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a07"), "Beverages", null, new DateTime(2026, 1, 1, 12, 0, 0, 0, DateTimeKind.Utc), null, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02"), 80, null, null, "Pending", "Meyve suyu kolileri" }
                });

            migrationBuilder.UpdateData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01"),
                columns: new[] { "City", "Email", "Name" },
                values: new object[] { "İstanbul", "iletisim@yesilyaprak.example", "Yeşil Yaprak Fırını" });

            migrationBuilder.UpdateData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02"),
                columns: new[] { "Email", "Name" },
                values: new object[] { "sosyal@tazepazar.example", "TazePazar Market" });

            migrationBuilder.UpdateData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03"),
                columns: new[] { "City", "Email", "Name" },
                values: new object[] { "İstanbul", "merhaba@umutgidabankasi.example", "Umut Gıda Bankası" });

            migrationBuilder.InsertData(
                table: "organizations",
                columns: new[] { "Id", "City", "CreatedAt", "Email", "Name", "Type" },
                values: new object[,]
                {
                    { new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a04"), "İzmir", new DateTime(2026, 1, 1, 9, 0, 0, 0, DateTimeKind.Utc), "info@lezzetduragi.example", "Lezzet Durağı Restoran", "Donor" },
                    { new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a05"), "Ankara", new DateTime(2026, 1, 1, 9, 0, 0, 0, DateTimeKind.Utc), "destek@kardeslikasevi.example", "Kardeşlik Aşevi", "Recipient" },
                    { new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a06"), "İzmir", new DateTime(2026, 1, 1, 9, 0, 0, 0, DateTimeKind.Utc), "bilgi@gulumsedernegi.example", "Gülümse Çocuk Derneği", "Recipient" }
                });

            migrationBuilder.InsertData(
                table: "donations",
                columns: new[] { "Id", "Category", "CollectedAt", "CreatedAt", "ExpiresAt", "OrganizationId", "Quantity", "RecipientOrganizationId", "ReservedAt", "Status", "Title" },
                values: new object[,]
                {
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a04"), "PreparedMeals", new DateTime(2025, 12, 29, 14, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 29, 9, 0, 0, 0, DateTimeKind.Utc), null, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a04"), 30, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a05"), new DateTime(2025, 12, 29, 11, 0, 0, 0, DateTimeKind.Utc), "Collected", "Hazır öğle yemeği paketleri" },
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a06"), "Bakery", new DateTime(2025, 12, 30, 14, 0, 0, 0, DateTimeKind.Utc), new DateTime(2025, 12, 30, 9, 0, 0, 0, DateTimeKind.Utc), null, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01"), 45, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a06"), new DateTime(2025, 12, 30, 11, 0, 0, 0, DateTimeKind.Utc), "Collected", "Simit ve poğaça" },
                    { new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a08"), "PreparedMeals", null, new DateTime(2025, 12, 31, 9, 0, 0, 0, DateTimeKind.Utc), null, new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a04"), 20, null, null, "Cancelled", "Günün çorbası" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_donations_RecipientOrganizationId",
                table: "donations",
                column: "RecipientOrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_donations_organizations_RecipientOrganizationId",
                table: "donations",
                column: "RecipientOrganizationId",
                principalTable: "organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_donations_organizations_RecipientOrganizationId",
                table: "donations");

            migrationBuilder.DropIndex(
                name: "IX_donations_RecipientOrganizationId",
                table: "donations");

            migrationBuilder.DeleteData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a04"));

            migrationBuilder.DeleteData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a05"));

            migrationBuilder.DeleteData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a06"));

            migrationBuilder.DeleteData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a07"));

            migrationBuilder.DeleteData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a08"));

            migrationBuilder.DeleteData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a04"));

            migrationBuilder.DeleteData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a05"));

            migrationBuilder.DeleteData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a06"));

            migrationBuilder.DropColumn(
                name: "CollectedAt",
                table: "donations");

            migrationBuilder.DropColumn(
                name: "ExpiresAt",
                table: "donations");

            migrationBuilder.DropColumn(
                name: "RecipientOrganizationId",
                table: "donations");

            migrationBuilder.DropColumn(
                name: "ReservedAt",
                table: "donations");

            migrationBuilder.UpdateData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a01"),
                column: "Title",
                value: "Fresh sourdough bread");

            migrationBuilder.UpdateData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a02"),
                column: "Title",
                value: "Seasonal vegetables crate");

            migrationBuilder.UpdateData(
                table: "donations",
                keyColumn: "Id",
                keyValue: new Guid("8d2f6c1e-3b4a-4f5e-9a7b-1c2d3e4f5a03"),
                column: "Title",
                value: "Yogurt & cheese assortment");

            migrationBuilder.UpdateData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a01"),
                columns: new[] { "City", "Email", "Name" },
                values: new object[] { "Istanbul", "contact@greenleaf.example", "Green Leaf Bakery" });

            migrationBuilder.UpdateData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a02"),
                columns: new[] { "Email", "Name" },
                values: new object[] { "csr@freshmarket.example", "FreshMarket Supermarket" });

            migrationBuilder.UpdateData(
                table: "organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f1b9a52-6c4d-4e8f-a1b2-0c9d8e7f6a03"),
                columns: new[] { "City", "Email", "Name" },
                values: new object[] { "Istanbul", "hello@hopefoodbank.example", "Hope Food Bank" });
        }
    }
}
