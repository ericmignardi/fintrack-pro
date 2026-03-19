# fintrack-pro 💰

A modern, full-stack financial tracking application built for efficiency and precision. Manage your transactions, visualize your spending, and stay on top of your budget with ease.

---

## Features

- **Transaction Management**: Full CRUD functionality to track every income source and expense.
- **Data Visualization**: Interactive dashboards and charts to analyze spending trends and financial health.
- **Secure Authentication**: Robust user access control using JWT, bcrypt, and secure cookie handling.
- **Real-time Budgeting**: Monitor your savings and expenses with live updates and responsive design.
- **API Security**: Implemented with helmet, rate limiting, and server-side validation for maximum protection.

## Tech Stack

- **Frontend**:
  - **React 19**: UI library for building a dynamic user interface.
  - **Vite 7**: Fast and modern build system and dev server.
  - **Tailwind CSS v4**: Utility-first CSS framework for modern styling.
  - **React Router 7**: Declarative routing for seamless navigation.
  - **Recharts**: Powerful charting library for financial data visualization.
- **Backend**:
  - **Node.js**: Asynchronous JavaScript runtime.
  - **Express 5**: Fast, unopinionated, minimalist web framework.
  - **PostgreSQL**: Industry-standard relational database.
  - **Prisma**: Type-safe ORM for database modeling and migrations.
- **Security & Testing**:
  - **JWT**: Token-based authentication and authorization.
  - **Bcrypt**: Industrial-strength password hashing.
  - **Jest & Supertest**: Comprehensive unit and integration testing.

---

## Installation & Setup

**Prerequisites:**

- Node.js 20+
- PostgreSQL database
- Environment variables configured in `.env`

```bash
# Clone the repository
git clone https://github.com/ericmignardi/fintrack-pro.git
cd fintrack-pro

# Install dependencies for both frontend and backend
cd backend && npm install
cd ../frontend && npm install
```

## Usage

**Start the Backend Server:**

```bash
cd backend
npm run dev
```

**Start the Frontend Development Server:**

```bash
cd frontend
npm run dev
```

**Run Database Migrations:**

```bash
cd backend
npx prisma migrate dev
```

**Execute Tests:**

```bash
cd backend
npm test
```

---

## Things Learned

Developing fintrack-pro provided deep insights into modern full-stack architecture and financial software design:

- **Type-Safe Database Modeling**: Leveraging Prisma to ensure data integrity and schema consistency across the stack.
- **State Management & Routing**: Managing complex application states and navigation in a modern React environment.
- **Full-Stack Security**: Implementing multiple layers of protection, from password hashing to rate limiting and secure JWT handling.
- **Data Visualization Design**: Creating intuitive and meaningful financial charts that translate raw data into actionable insights.
- **Advanced Testing Patterns**: Writing robust unit and integration tests for mission-critical financial APIs.
