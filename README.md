# 🗓️ Role-Based Booking API (NestJS + MongoDB)

A backend system for **role-based availability and slot booking**, supporting two roles: `User` and `Admin`.

## 🛠️ Tech Stack

- **Node.js / NestJS** (v10+)
- **MongoDB** with Mongoose
- **JWT** Authentication
- **Swagger** API Docs
- **Role-Based Access Control (RBAC)**

## 📁 Project Structure

```
src/
│
├── auth/               # Authentication module (login)
├── users/              # User registration, schema
├── availability/       # Availability creation logic
├── booking/            # Slot booking and admin view
├── common/guards/      # Auth & Role guards
├── main.ts             # Entry point
├── app.module.ts       # App root module
```

## ✅ Features

### 🔐 Auth

- JWT-based login
- Supports **User** and **Admin** roles
- Role info included in token

### 👤 User APIs

- **Create Availability**
  - Fields: `date`, `startTime`, `endTime`
  - Date allowed: Today up to 7 days ahead
  - Example:
    ```json
    {
      "date": "2025-07-25",
      "startTime": "10:00",
      "endTime": "12:00"
    }
    ```

### 🧑‍💼 Admin APIs

- **View Available Slots**
  - Fetches all user availabilities
  - Breaks them into **30-minute intervals**
  - Excludes:
    - Slots < 30 minutes
    - Booked slots
    - Adjacent to booked slots

- **Book Slot**
  - Input: `userId`, `date`, `startTime`
  - Marks slot as `booked: true`
  - Example:
    ```json
    {
      "userId": "<userId>",
      "date": "2025-07-25",
      "startTime": "10:30"
    }
    ```

## 🔑 Authentication

### 🪪 Login (Admin / User)

**POST** `/auth/login`

```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

Response:
```json
{
  "access_token": "<JWT_TOKEN>"
}
```

Use `Bearer <token>` in Swagger or headers.

## 🔐 Protected Routes

| Role  | Endpoint                          | Description                     |
|-------|-----------------------------------|---------------------------------|
| User  | `POST /availability`              | Add availability                |
| Admin | `GET /booking/slots?date=YYYY-MM-DD` | View slots (30-min filtered) |
| Admin | `POST /booking/book`              | Book a slot                     |

## 🧪 Swagger API Docs

Run the app and open:

```
http://localhost:3000/api
```

Use the **Authorize** button to test with JWT token:
```
Bearer <your_token>
```

## 🧾 Environment Variables

Create `.env` file:

```env
PORT=3000
JWT_SECRET=your_secret_key
MONGO_URI=mongodb://localhost:27017/bookingdb
JWT_EXPIRES_IN=1d
```

## 🧬 Database Models

### User

```ts
{
  _id,
  email: string,
  password: string (hashed),
  role: 'User' | 'Admin'
}
```

### Availability

```ts
{
  _id,
  userId: ObjectId,
  date: 'YYYY-MM-DD',
  startTime: 'HH:mm',
  endTime: 'HH:mm',
  booked: boolean
}
```

## ▶️ Getting Started

```bash
# Install dependencies
npm install

# Run in dev mode
npm run start:dev

# Build
npm run build
```

## 🧪 Test Credentials

### Admin
```
email: admin@example.com
password: admin123
```

### User
```
email: user@example.com
password: user123
```

## 📦 Seed Data (Optional)

You can create default admin/user manually or via seed script (optional).

## 📌 Notes

- 30-minute slots are dynamically generated.
- Slots < 30 minutes are ignored.
- Booked & adjacent slots are hidden from Admin view.
- Full Role-Based API protection in place.

## 📄 License

MIT
