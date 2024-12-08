# Railway Management System

## Overview

This project provides an API for managing railway operations such as user registration, train management, seat booking, and checking availability.

### Project Structure

- **config/**: Contains database and authentication configuration.
- **controllers/**: Contains business logic for user and admin actions.
- **models/**: Sequelize models for User, Train, and Booking.
- **routes/**: Contains the API route definitions.
- **middleware/**: Contains middleware for authentication and API key validation.

### Prerequisites

1. **Node.js** installed.
2. **PostgreSQL** database for storing data.
3. **Postman** to test the API.

### Setup Instructions

1. Clone the Repository
   ```bash
   git clone https://github.com/yourusername/railway-management-system.git
   cd railway-management-system

   ```
2. Install Dependencies
   ```bash
   npm install

   ```
3. Setup Environment Variables
   ```bash
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   API_KEY=your_api_key_for_admin_routes

   ```
4. Database Setup
- Create the Database
- Run the following SQL commands in your PostgreSQL environment:
  ```bash
  -- Create Users Table
  CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user'
  );   

  -- Create Trains Table
  CREATE TABLE "Trains" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  totalSeats INTEGER NOT NULL,
  availableSeats INTEGER NOT NULL
  );

  -- Create Bookings Table
  CREATE TABLE "Bookings" (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES "Users"(id),
  trainId INTEGER NOT NULL REFERENCES "Trains"(id),
  seatsBooked INTEGER NOT NULL
  );
 
6. Run Database Migrations
- This project uses Sequelize ORM. If your tables aren't created yet, run the following:
   ```bash
   npm run sync

   ```
7. Start the Application
   ```bash
   npm start
    ```

# Postman API Testing

## 1. User Authentication (Login and Registration)

### Register a New User

**POST** `/auth/register`  

**URL**: `http://localhost:3000/auth/register`

#### Request Body:
     {
       "username": "user1",
       "password": "password123",
       "role": "user"
     }

### Login User

**POST** `/auth/login`  

**URL**: `http://localhost:3000/auth/login`

#### Request Body:
````json
{
    "username": "user1",
    "password": "password123"
}
````
## 2. Admin Operations (Add Train)

### Add a New Train

**POST** `/admin/add-train`  

**URL**: `http://localhost:3000/admin/add-train`  

**Headers**: Add `x-api-key` with the value from `.env`

#### Request Body:

````json
{
  "name": "Express 101",
  "source": "New York",
  "destination": "Chicago",
  "totalSeats": 100,
  "availableSeats": 100
}
````
## 3. User Operations (Check Availability and Book Seats)

### Check Train Availability
**GET**: `/user/availability`

**URL**: `http://localhost:3000/user/availability?source=New York&destination=Chicago`

#### Response:
Returns a list of trains between the specified source and destination:
````json
[
  {
    "id": 1,
    "name": "Express 101",
    "source": "New York",
    "destination": "Chicago",
    "totalSeats": 100,
    "availableSeats": 100
  }
]
````
## 4. User Operations (Book Seats)

### Book Seats
**POST** `/user/book`  

**URL**: `http://localhost:3000/user/book`  

**Headers**: Add `Authorization` with the value `Bearer <JWT_TOKEN>`

#### Request Body:
````json
{
  "trainId": 1,
  "seatsToBook": 2
}
````
## 5. User Operations (View Booking Details)

### View All Bookings
**GET** `/user/getAllBookings`  

**URL**: `http://localhost:3000/user/getAllBookings`  

**Headers**: Add `Authorization` with the value `Bearer <JWT_TOKEN>`

#### Example Response:
````json
[
  {
    "booking_id": 17,
    "number_of_seats": 50,
    "train_number": "123123",
    "source": "Ranchi",
    "destination": "Delhi"
  }
]
````
