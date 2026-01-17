# Lead Management Dashboard

A full-stack Lead Management Dashboard built using **Next.js, MongoDB, and Tailwind CSS**.  
It supports server-side search, filtering, sorting, pagination, and basic analytics.

---

## Tech Used

- Next.js (App Router)
- MongoDB Atlas (Mongoose)
- Tailwind CSS + shadcn/ui
- Vercel (Deployment)

---

## Features

- Login (basic authentication)
- Leads list with:
  - Server-side search
  - Status filtering
  - Pagination
- Lead details view
- Analytics dashboard:
  - Total leads
  - Converted leads
  - New leads
  - Contacted leads
  - Lost leads
- Seeded with 1000 dummy leads

---

## Environment Variable

This project uses MongoDB Atlas Free Tier.
MONGODB_URI= mongodb+srv://utsavsoni619:utsav619@cluster0.oklwfir.mongodb.net/lead-dashboard

## 🔧 Setup Instructions

### 1️⃣ Clone the repository

---

## Deployed URL

URL= https://lead-dashboard-crm.vercel.app/



## Seeding Method

The project includes a seed script to populate the database with dummy lead data.

### Seed Data Includes:

- 500+ leads
- Name
- Email
- Phone number
- Lead status (New, Contacted, Converted, Lost)

### Run Seed Script Locally

```bash
npm run seed
```

---

## Demo Credential

Email: utsav@test.com
Password: utsav619

```bash
git clone https://github.com/UTSAVSONI99/lead-dashboard.git
cd lead-dashboard
```
