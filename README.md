# StudyNotion Client

Frontend application for the StudyNotion platform.

This app is built with React and Tailwind CSS and provides:

- Authentication flows (signup, login, password reset)
- Student dashboard and enrolled courses
- Instructor dashboard and course management UI
- YouTube course creation and progress tracking UI
- Payment and profile management interfaces

## Repository Scope

This is the frontend repository only.

- Frontend: this repository
- Backend implementation: https://github.com/vj-004/StudyNotion-Server

## Why run locally?

For this project, local development gives the best full-stack experience.

- Smooth frontend/backend integration on localhost
- Easier debugging of auth, payments, and YouTube-course flows
- Best results for YouTube course creation when used with a local full-stack workflow and local LLM experimentation

## Prerequisites

- Node.js 18+
- npm 9+
- Backend running locally at `http://localhost:4000`

## Project Setup (Backend + Frontend in one common folder)

Recommended folder structure:

```text
study-notion/
  StudyNotion-Server/
  StudyNotion-Client/
```

Clone both repositories into one common parent folder:

```bash
mkdir study-notion
cd study-notion

git clone https://github.com/vj-004/StudyNotion-Server.git
git clone https://github.com/vj-004/StudyNotion-Client.git
```

Install dependencies:

```bash
cd StudyNotion-Server
npm install

cd ../StudyNotion-Client
npm install
```

### 1. Configure environment variables (frontend)

Create a `.env` file in `StudyNotion-Client` with:

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

You can copy from the template:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 2. Start backend

In one terminal:

```bash
cd StudyNotion-Server
npm run dev
```

Backend runs on `http://localhost:4000` by default.

### 3. Start frontend

In another terminal:

```bash
cd StudyNotion-Client
npm start
```

Frontend runs on `http://localhost:3000` by default.

No additional path/config changes are required when both repos are inside the same parent folder and the frontend `.env` points to localhost backend.

## Client Scripts

- `npm start`: starts the React development server
- `npm run build`: creates a production build
- `npm run eject`: ejects CRA configuration
- `npm run dev`: runs client and backend together only when backend is available at `../server`

## API Configuration

This client reads API base URL from:

- `REACT_APP_BASE_URL`

Typical local value:

```env
REACT_APP_BASE_URL=http://localhost:4000/api/v1
REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
```

## Razorpay Key Notes

- Frontend uses `REACT_APP_RAZORPAY_KEY` (public key id).
- Backend must contain `RAZORPAY_SECRET` in `StudyNotion-Server/.env`.
- Keep `RAZORPAY_SECRET` only on the backend and never expose it in frontend code.

## This README.md is AI generated and proof read by me. If there is any issue please contact me.