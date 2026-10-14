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
    FoodShare.Application/     CQRS: CreateDonationCommand, GetPendingDonationsQuery
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

| Method | Endpoint                 | Description                         |
| ------ | ------------------------ | ----------------------------------- |
| GET    | `/api/donations/pending` | List pending donations              |
| POST   | `/api/donations`         | Create a donation (broadcasts live) |
| WS     | `/hubs/donations`        | SignalR hub, event `ReceiveNewDonation` |

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local   # optional, defaults to http://localhost:5038
npm install
npm run dev
```

Open `http://localhost:3000`. Click **Sample donation** on the dashboard (or `POST /api/donations` from any client) and every open dashboard shows a toast in the top-right corner.

If the API is not running, the dashboard falls back to demo data.
