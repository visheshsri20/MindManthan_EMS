# MindManthan EMS

Employee Management System (EMS) for MindManthan

## Overview

MindManthan EMS is a full-stack web application for managing employees, departments, attendance, and payroll. It features role-based authentication, an admin dashboard, and a modern UI built with React and Tailwind CSS.

## Features

- **User Authentication** (JWT-based)
- **Role-Based Access** (Admin & Employee)
- **Department Management** (CRUD)
- **Employee Management**
- **Attendance & Payroll Modules** (placeholders)
- **Responsive Dashboard UI**
- **Search & Filter Departments**
- **Protected Routes**

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Other:** Vite, ESLint

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB database (local or Atlas)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mindmanthan-ems.git
cd mindmanthan-ems
```

#### 2. Setup the Backend

```bash
cd server
npm install
```

- Create a `.env` file in the `server` folder:

  ```
  PORT=5000
  MONGODB_URL=your_mongodb_connection_string
  JWT_KEY=your_jwt_secret
  ```

- Start the backend server:

  ```bash
  npm start
  ```

#### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```

- The frontend will run at [http://localhost:5173](http://localhost:5173)

## Usage

- Login as **admin** with:
  - Email: `admin@gmail.com`
  - Password: `admin`
- Manage departments, employees, and view dashboard.
- Employees can log in and view their dashboard.

## Folder Structure

```
server/
  controllers/
  db/
  middleware/
  models/
  routes/
  index.js
  .env
frontend/
  src/
    components/
    context/
    pages/
    utils/
  index.html
  tailwind.config.js
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Developed by MindManthan Team**
