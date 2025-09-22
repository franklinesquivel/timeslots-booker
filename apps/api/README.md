# Time Slot Booker API

This is the backend API for the Time Slot Booker application, built with [NestJS](https://nestjs.com/). It handles user authentication, booking management, and real-time conflict resolution with Google Calendar.

## ✨ Key Features

-   **Google OAuth 2.0 Authentication:** Secure user login and authorization using Google accounts.
-   **Booking Management:** A full set of endpoints to create, view, and cancel time slot bookings.
-   **Dual Conflict Resolution:** Prevents double bookings by checking against:
    1.  All existing bookings in the local database.
    2.  Events in the user's primary Google Calendar.
-   **Resilient Google API Integration:** Automatically handles expired Google access tokens by using the refresh token to get a new one.
-   **Structured Logging & Tracing:** All logs are in JSON format, and every request is tagged with a unique `traceId` for enhanced observability.
-   **Robust Error Handling:** A global exception filter provides consistent, structured error responses, including custom error codes for specific business rule failures.
-   **Type-Safe Validation:** All incoming request bodies are validated using Zod schemas via a reusable `ZodValidationPipe`.

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm
-   PostgreSQL

### 1. Set Up Environment Variables

Create a `.env` file in the `apps/api` directory by copying the example file:

```bash
cp .env.example .env
```

Fill in the required values in the new `.env` file, including your database connection string and Google OAuth credentials.

### 2. Set Up the Database

Run the Prisma migrations to set up your database schema:

```bash
cd apps/api
npx prisma migrate dev
```

### 3. Install Dependencies

Navigate to the root of the project and install the dependencies:

```bash
npm install
```

### 4. Run the Application

You can run the API in development mode, which supports hot-reloading:

```bash
npm run start:dev api
```

The API will be available at `http://localhost:3000`.

## 📝 API Endpoints

All booking endpoints are protected and require a valid JWT Bearer token.

| Method | Endpoint                  | Description                               |
| :----- | :------------------------ | :---------------------------------------- |
| `GET`  | `/auth/google/login`      | Initiates the Google OAuth 2.0 login flow. |
| `GET`  | `/auth/google/callback`   | Callback URL for Google to redirect to.    |
| `GET`  | `/bookings`               | Get all bookings for the authenticated user. |
| `POST` | `/bookings`               | Create a new booking.                      |
| `POST` | `/bookings/:id/cancel`    | Cancel an existing booking.                |

---

This project was built following modern best practices for creating scalable and maintainable server-side applications.
