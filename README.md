# 🚀 Full‑Stack Starter Kit – Monorepo with Turborepo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.x-brightgreen)](https://nodejs.org)
[![TurboRepo](https://img.shields.io/badge/TurboRepo-2.x-EF4444)](https://turbo.build)
[![React](https://img.shields.io/badge/React-18.x-61DAFB)](https://reactjs.org)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.x-0170FE)](https://ant.design)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.x-06B6D4)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express-4.x-000000)](https://expressjs.com)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7)](https://sequelize.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1)](https://postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D)](https://redis.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)](https://typescriptlang.org)
[![Jest](https://img.shields.io/badge/Jest-29.x-C21325)](https://jestjs.io)
[![Sentry](https://img.shields.io/badge/Sentry-7.x-362D59)](https://sentry.io)

**A production‑ready monorepo starter kit** combining modern frontend and backend technologies with **Feature‑Sliced Design**, **Effector** state management, **TanStack Query** for server state, **Turborepo** for blazing‑fast builds, and optional background jobs with BullMQ.

---

## ✨ Features at a Glance

- **Monorepo** – `pnpm` workspaces + Turborepo for parallel tasks & caching.
- **Backend** – Express + Sequelize + PostgreSQL (SQLite optional for development).  
  Includes **Redis + BullMQ** for background jobs and **Nodemailer** for email sending.
- **Frontend (Shell)** – Vite + React 18 + Ant Design 5 + Tailwind CSS + TypeScript.
- **Remote Microfrontend** – Module Federation (`vite-plugin-federation`).
- **Authentication** – JWT stored in **httpOnly cookies** (secure, XSS‑safe).  
  Login, register, logout, delete account, reCAPTCHA on registration.
- **Real‑time** – Socket.io for live notifications / chat (with Redis adapter for scaling).
- **File Uploads** – Multer + AWS S3 + CloudFront CDN.
- **Background Jobs** – BullMQ + Redis for async tasks (emails, image processing).
- **Email** – Nodemailer with SMTP; queued via BullMQ.
- **Error Tracking** – Sentry integration (back & front) with source maps.
- **Performance Monitoring** – Web Vitals (LCP, FID, CLS, INP, TTFB).
- **Testing** – Jest + Testing Library (backend & frontend).
- **State Management** – **Effector** (client‑side auth) + **TanStack Query** (server‑side).
- **Internationalization** – i18next + react‑i18next (EN, ES, FR).
- **Architecture** – Feature‑Sliced Design (FSD) for scalability.
- **Docker** – Multi‑container deployment with PostgreSQL, Redis, and Nginx reverse proxy.
- **Type Safety** – Full TypeScript across all packages.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         Turborepo + pnpm workspaces                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   ┌──────┐│
│  │   apps/backend   │  │  apps/frontend   │  │   apps/remote    │   │Redis ││
│  │  Express + Seq   │  │   Vite + React   │  │  MFE (UserTable) │   │Queue ││
│  │   + PostgreSQL   │  │   (FSD + Effector│  │                  │◄──│Store ││
│  └────────┬─────────┘  │   + TanStack Q)  │  └────────┬─────────┘   └──────┘│
│           │            └────────┬─────────┘           │                     │
│           │  httpOnly cookie    │  Module Federation  │                     │
│           │    (JWT)            │  (dynamic import)   │                     │
│           ▼                     ▼                     ▼                     │
│     PostgreSQL (Docker)     Shell (port 5173)    Remote (5174)              │
└─────────────────────────────────────────────────────────────────────────────┘
```

- Backend API (`/api`) serves REST endpoints, sets httpOnly JWT cookie.
- Shell loads remote MFE at runtime via Module Federation.
- Nginx reverse proxy unifies all services on port 80 in production.
- BullMQ + Redis handles background jobs (email, file processing).

---

## 📁 Monorepo Structure

```
monorepo/
├── apps/
│   ├── backend/           # Express + Sequelize + Redis + BullMQ + Email
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── models/    # User, File
│   │   │   ├── controllers/ (auth, user, file, email, jobs)
│   │   │   ├── routes/
│   │   │   ├── middleware/
│   │   │   ├── services/  # email, s3, upload, queue workers
│   │   │   └── queues/    # BullMQ queue setup & workers
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── frontend/          # Shell (FSD + Effector + TanStack Query)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── pages/
│   │   │   ├── features/  # auth, user, upload, notifications, email
│   │   │   ├── entities/
│   │   │   └── shared/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── remote/            # Microfrontend (UserTable)
├── packages/               # (optional) shared libraries
├── nginx/
│   └── default.conf
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── jest.config.base.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and `pnpm` (v8+)
- Docker (optional, for full stack with PostgreSQL & Redis)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/starter-kit.git
cd starter-kit
pnpm install
```

### 2. Environment Variables

Copy the example env file for backend:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env` with your values:

```env
# Database (PostgreSQL recommended)
DB_DIALECT=postgres
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/starter_db

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d

# Redis (for BullMQ)
REDIS_URL=redis://redis:6379

# SMTP (for email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=noreply@yourapp.com

# AWS S3 (optional)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=your-bucket
CLOUDFRONT_DOMAIN=https://your-cloudfront.net

# reCAPTCHA
RECAPTCHA_SECRET_KEY=your_secret_key

# Sentry (optional)
SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

For frontend, create `apps/frontend/.env.local`:

```env
VITE_RECAPTCHA_SITE_KEY=your_site_key
VITE_API_URL=http://localhost:5000
```

### 3. Run in Development Mode

```bash
# Starts all three apps in parallel (backend, shell, remote, plus Redis if local)
pnpm dev
```

- Backend API: `http://localhost:5000`
- Frontend Shell: `http://localhost:5173`
- Remote MFE: `http://localhost:5174`
- Redis: `redis://localhost:6379`

> **Note:** For Redis, either run `docker-compose up redis` or have a local Redis instance.

### 4. Build for Production

```bash
pnpm build
```

Build outputs are cached by Turborepo – subsequent builds are near‑instant.

### 5. Run with Docker (Full Stack)

```bash
docker-compose up --build
```

Access the full application at `http://localhost`. Services include:

- PostgreSQL (port 5432)
- Redis (port 6379)
- Backend API (internal)
- Frontend Shell + Remote MFE (via Nginx)

---

## 🧪 Key Scripts (from root)

| Command                             | Description                                    |
| ----------------------------------- | ---------------------------------------------- |
| `pnpm dev`                          | Run all apps in development mode (hot reload). |
| `pnpm build`                        | Build all apps (cached).                       |
| `pnpm start`                        | Run built apps (production mode).              |
| `pnpm test`                         | Run all tests across apps.                     |
| `pnpm clean`                        | Remove all `node_modules`, `dist`, and caches. |
| `turbo run build --filter=frontend` | Build only the shell.                          |

---

## 🛠️ Technology Deep Dive

### Backend

- **Express** – REST API with token authentication.
- **Sequelize** – ORM with PostgreSQL (SQLite for dev).
- **JWT** – Stored in httpOnly cookies (`Secure`, `SameSite=Strict`).
- **CAPTCHA** – Google reCAPTCHA v2 verification.
- **Redis + BullMQ** – Background job queue (email, file processing).
- **Nodemailer** – SMTP email; queued to avoid blocking.
- **AWS S3 + CloudFront** – File uploads with CDN.
- **Socket.io** – Real‑time notifications (with Redis adapter for scaling).
- **Sentry** – Error tracking and performance monitoring.
- **Helmet + Compression + Rate limiting** – Security & performance.
- **TypeScript** – Full type safety.

### Frontend Shell (Feature‑Sliced Design)

- **`@app`** – Providers, routing, global styles.
- **`@pages`** – Route‑level composition of features (`LoginPage`, `RegisterPage`, `UsersPage`, `ProfilePage`).
- **`@features`** – Business logic (`auth`, `user`, `upload`, `notifications`, `email`) with Effector & TanStack Query.
- **`@entities`** – Core business models (`User`).
- **`@shared`** – Reusable UI (`ProtectedRoute`, `Layout`, `Captcha`, `FileUploader`), API client, i18n config, Tailwind, Web Vitals.

### State Management

- **Effector** – Global client state (current user, auth loading, notifications).  
  Stores: `$user`, `$isLoading`, effects: `loginFx`, `logoutFx`, `checkAuthFx`.
- **TanStack Query** – Server state (users list, file list).  
  Automatic caching, background refetching, mutations.

### Real‑time & Notifications

- Socket.io client connected automatically after login.
- Server‑side rooms per user for private messages.
- Redis adapter for horizontal scaling.

### File Uploads

- Multer (memory storage) + AWS SDK v3.
- File metadata stored in PostgreSQL.
- Optional CloudFront CDN for accelerated delivery.

### Background Jobs

- BullMQ queue for async tasks (currently email sending).
- Add any CPU‑intensive or long‑running operation as a job.

### Styling

- **Ant Design** – Primary component library.
- **Tailwind CSS** – Utility‑first CSS for custom layouts (preflight disabled).

### Internationalization

- i18next + react‑i18next, language detector.
- Translation files in `public/locales/{lang}/translation.json`.
- Antd locale switched via `ConfigProvider`.

### Testing

- **Jest** + `ts-jest` – Unit and integration tests (backend & frontend).
- **Testing Library** – React component testing.
- **Supertest** – API endpoint testing.
- Run `pnpm test` at root.

### Error Tracking & Performance

- **Sentry** – Captures errors in backend and frontend; source maps uploaded.
- **Web Vitals** – Reports LCP, FID, CLS, INP, TTFB to console or analytics endpoint.

---

## 📚 API Endpoints

| Method | Endpoint             | Description                          | Auth         |
| ------ | -------------------- | ------------------------------------ | ------------ |
| POST   | `/api/auth/register` | Register new user (requires CAPTCHA) | No           |
| POST   | `/api/auth/login`    | Login, sets httpOnly cookie          | No           |
| POST   | `/api/auth/logout`   | Clears cookie                        | No           |
| GET    | `/api/auth/me`       | Get current user                     | Yes (cookie) |
| GET    | `/api/users`         | Get all users                        | Yes          |
| POST   | `/api/users`         | Create user                          | Yes          |
| DELETE | `/api/users/:id`     | Delete user (self only)              | Yes          |
| POST   | `/api/files/upload`  | Upload file to S3                    | Yes          |
| GET    | `/api/files`         | List user's files (metadata)         | Yes          |
| DELETE | `/api/files/:id`     | Delete file                          | Yes          |
| POST   | `/api/email/send`    | Send email (synchronous)             | Yes          |
| POST   | `/api/jobs/email`    | Schedule email via BullMQ            | Yes          |
| GET    | `/api/jobs/:id`      | Get job status                       | Yes          |

WebSocket events (Socket.io):

- `message` – send/receive real‑time messages.

---

## 🐳 Docker Deployment

Each service has an optimised `Dockerfile`:

- Backend: multi‑stage, uses `tsc` + `pnpm` + node‑alpine.
- Frontend/remote: builds with Vite, served by Nginx.
- Redis + PostgreSQL: official images with healthchecks.

Run full stack:

```bash
docker-compose up --build
```

Environment variables for backend are passed via `docker-compose.yml`; override with `.env` file.

---

## 🤝 Contributing

Pull requests welcome. Please follow the existing FSD structure and TypeScript conventions.

---

## 📄 License

MIT

---

## 🙏 Acknowledgements

- [Vite](https://vitejs.dev) + [Ant Design](https://ant.design) + [Tailwind CSS](https://tailwindcss.com)
- [Module Federation](https://github.com/originjs/vite-plugin-federation)
- [Effector](https://effector.dev) + [TanStack Query](https://tanstack.com/query)
- [Turborepo](https://turbo.build) + [pnpm](https://pnpm.io)
- [BullMQ](https://bullmq.io/) + [Redis](https://redis.io)
- [Sentry](https://sentry.io) + [Web Vitals](https://web.dev/vitals/)

---

**Happy coding!** 🎉
