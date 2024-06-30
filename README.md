# Reservation Manager System

This project is a code challenge for Tot, which involved a reservation system for a restaurant. Although the challenge only required a backend implementation, my skills in frontend development allowed me to create a full-stack application. The project is deployed on Vercel and can be accessed at [Reservation Manager System](https://reservation-manager-system.vercel.app).

## Table of Contents
- [Features and Rules](#features-and-rules)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Running Locally](#running-locally)
- [API Endpoints](#api-endpoints)
- [Constants](#constants)

## Features & Rules
- **User Management**: Create and retrieve users.
- **Reservation Management**: Create and retrieve reservations within a specific date range or for a specific user.

Restaurant's constants and rules are defined in a `constants.ts` file (in the lib directory) for easy reuse and modification throughout the codebase:

```sh
    export const TOTAL_TABLES = 5;
    export const SEATS_PER_TABLE = 4;
    export const OPENING_HOUR_UTC = 17;
    export const CLOSING_HOUR_UTC = 22;
```

## Technologies Used
- **Backend**: Next.js, TypeScript, NeonDB (PostgreSQL), Prisma
- **Frontend**: React, TailwindCSS, DaisyUI
- **Deployment**: Vercel

## Deployment
The project is deployed on Vercel and can be accessed [here](https://reservation-manager-system.vercel.app).

## Running Locally
To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/diegoddie/reservation-manager-system.git
    cd reservation-manager
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root of the project and add your PostgreSQL connection string:
    ```env
    DATABASE_URL=postgresql://your-username:your-password@your-host/your-database?sslmode=require
    ```

4. Generate Prisma client:
    ```sh
    npx prisma generate
    ```

5. Apply the database migrations:
    ```sh
    npx prisma db push
    ```

6. Start the development server:
    ```sh
    npm run dev
    ```

## API Endpoints
The API endpoints can be tested using tools like Postman. The available endpoints are:

- **GET `/api/users`**: Retrieves all users in the database.
- **POST `/api/users`**: Creates a new user.
- **GET `/api/reservations`**: Retrieves reservations within a specified date range. Example query: `localhost:3000/api/reservations?startDate=2023-06-30T17:00:00Z&endDate=2023-06-30T21:00:00Z`
- **GET `/api/reservations/:email`**: Retrieves reservations for a specific user based on their email.
- **POST `/api/reservations`**: Creates a new reservation.
