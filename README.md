# FoodShare B2B

A social-impact platform that connects businesses with surplus food (bakeries, supermarkets, restaurants) to organizations that fight hunger. New donations are pushed to every connected dashboard in real time.

## Tech stack

| Layer    | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Backend  | .NET 10, ASP.NET Core Web API, SignalR, MediatR (CQRS), EF Core 10 |
| Database | PostgreSQL 17 (Npgsql)                                            |
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS v4               |
| Realtime | `@microsoft/signalr`, `react-hot-toast`                           |

## Project structure

```
backend/
  FoodShare.sln
  src/
    FoodShare.Domain/          Entities (Donation, Organization) and enums
    FoodShare.Application/     CQRS commands/queries for donations and organizations
    FoodShare.Infrastructure/  ApplicationDbContext, EF configurations, migrations
    FoodShare.WebAPI/          Controllers, DonationHub (SignalR), Program.cs
frontend/
  app/                         Dashboard, Food Listings, Organizations pages
  components/                  Layout (Sidebar, Header), dashboard widgets
  hooks/useSignalR.ts          Reusable SignalR connection hook
docker-compose.yml             Local PostgreSQL (host port 5433)
```

Dependencies point inward: `WebAPI → Infrastructure → Application → Domain`.

## Getting started

### 1. Database

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
dotnet run --project src/FoodShare.WebAPI --launch-profile http
```

The API listens on `http://localhost:5038`. In Development, pending EF Core migrations (including seed data) are applied automatically on startup.

| Method | Endpoint                         | Description                                          |
| ------ | -------------------------------- | ---------------------------------------------------- |
| GET    | `/api/donations?status=`         | List donations, optionally filtered by status        |
| GET    | `/api/donations/pending`         | List pending donations                               |
| POST   | `/api/donations`                 | Create a donation (broadcasts live)                  |
| POST   | `/api/donations/{id}/reserve`    | Reserve for a recipient `{ recipientOrganizationId }` |
| POST   | `/api/donations/{id}/collect`    | Mark a reserved donation as collected                |
| POST   | `/api/donations/{id}/cancel`     | Cancel a donation that is not yet collected          |
| GET    | `/api/organizations`             | Donors and recipients with donation totals           |
| WS     | `/hubs/donations`                | SignalR hub, events `ReceiveNewDonation`, `ReceiveDonationUpdated` |

Donation lifecycle: `Pending → Reserved → Collected`, or `Cancelled` at any point before collection.

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local   # optional, defaults to http://localhost:5038
npm install
npm run dev
```

Open `http://localhost:3000`. Click **Yeni Bağış** to list surplus food (or `POST /api/donations` from any client) and every open dashboard shows a toast in the top-right corner. Reserve and collect donations from **Gıda İlanları**; the impact panel on the dashboard updates live.

If ports 3000/5433 are already taken, run the frontend with `npx next dev -p 3001` and override the API settings with environment variables, e.g. `ConnectionStrings__DefaultConnection=...;Port=5434;...` and `Cors__AllowedOrigins__0=http://localhost:3001`.

If the API is not running, the dashboard falls back to demo data.
