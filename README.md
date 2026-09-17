# Adama City — Citizen Complaint Management System

A web-based citizen complaint management system developed for **Adama City Administration** to digitize the submission, assignment, tracking, and resolution of municipal complaints. Citizens can report problems online, administrators can assign complaints to departments and officers, and officers can manage and resolve assigned complaints with complete status tracking.

## Overview

| Concept          | Description                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Complaint**    | A report submitted by a citizen about a municipal problem such as a broken streetlight, water leak, uncollected waste, or drainage issue |
| **Actors**       | Citizen, Administrator, Department Officer                                                                                               |
| **Status Flow**  | Pending → In Progress → Resolved → Closed                                                                                                |
| **Architecture** | React (Vite) frontend → Express REST API → MongoDB Atlas or local MongoDB                                                                |

## Main Objectives

The system is designed to:

* Allow citizens to submit complaints online.
* Provide citizens with a complaint tracking mechanism.
* Allow administrators to assign complaints to departments and officers.
* Allow department officers to manage and resolve assigned complaints.
* Maintain complaint status history.
* Provide notifications to users.
* Support role-based access control.
* Provide administrators with reports and activity logs.
* Improve the efficiency and transparency of municipal complaint management.

## Documentation

* [Project Proposal](./Project_Proposal_Web_Based_Citizen_Complaint_Management.md) — system requirements, database design, ER diagram, testing, deployment, and project documentation
* [Frontend README](./frontend/README.md) — frontend structure, setup, and development scripts

## Quick Start

### 1. Backend API

Open a terminal and run:

```bash
cd backend
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure the required database credentials and JWT secret in `.env`.

Seed the database with demo users and sample data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The backend API will run at:

```text
http://localhost:5000/api
```

### 2. Frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Demo Accounts

The system provides the following demo accounts for testing:

| Role               | Email              | Password     |
| ------------------ | ------------------ | ------------ |
| Citizen            | `citizen@test.com` | `citizen123` |
| Administrator      | `admin@test.com`   | `admin123`   |
| Department Officer | `officer@test.com` | `officer123` |

> **Note:** These are development/demo credentials and should not be used in a production environment.

## System Features

| Area                   | Capabilities                                                                                                                                                            |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Public**             | Guest landing page, English/Amharic/Afaan Oromo interface, navigation, login, and citizen registration                                                                  |
| **Citizen**            | Register, login, submit complaints, upload optional photos, edit pending complaints, track complaint status and history, view notifications, and manage profile         |
| **Administrator**      | View complaints, assign departments and officers, reject complaints, update complaint status, manage users, manage departments, view reports, and monitor activity logs |
| **Department Officer** | View department complaints, view assigned complaints, start work, update complaint status, and resolve or close complaints                                              |

## Complaint Status Rules

The system implements role-based status transitions.

### Administrator

* Assigning a complaint to a department keeps the complaint **Pending**.
* Assigning a complaint to an officer changes the complaint to **In Progress**.
* A pending complaint can be **Rejected** by the administrator.
* An in-progress complaint can be marked **Resolved**, **Closed**, or **Rejected**.
* A resolved complaint can be **Closed**.

### Department Officer

* A pending assigned complaint can be changed to **In Progress**.
* An in-progress complaint can be changed to **Resolved** or **Closed**.
* Department officers **cannot reject complaints**.

### General Status Flow

```text
Pending
   ↓
In Progress
   ↓
Resolved
   ↓
Closed
```

A complaint may also be rejected by an administrator when permitted by the system rules.

## Complaint Categories

Citizens can submit complaints under the following categories:

* Road Maintenance
* Waste Management
* Water Supply
* Street Lighting
* Drainage
* Public Safety
* Noise Pollution
* Other

## User Roles

### 1. Citizen

Citizens can:

* Create an account.
* Log in securely.
* Submit complaints.
* Add complaint descriptions and locations.
* Upload optional complaint photos.
* Edit complaints while they are pending.
* Track complaint status.
* View complaint history.
* Receive notifications.
* Update their profile.
* Use AI-assisted complaint submission features where configured.

### 2. Administrator

Administrators can:

* View all complaints.
* Assign complaints to departments.
* Assign complaints to department officers.
* Update complaint status.
* Reject complaints when permitted.
* Manage users.
* Activate or deactivate user accounts.
* Add and manage departments.
* View complaint reports and summary information.
* Monitor system activity logs.

### 3. Department Officer

Department officers can:

* View complaints assigned to their department.
* View complaints assigned directly to them.
* Start working on complaints.
* Update complaint status.
* Add resolution information or notes.
* Resolve assigned complaints.
* Close complaints when permitted.

## Technologies Used

| Layer                    | Technology                                             | Status |
| ------------------------ | ------------------------------------------------------ | ------ |
| **Frontend**             | React 19, Vite, React Router, Context API, Vanilla CSS | ✅ Done |
| **Backend**              | Node.js, Express.js, Helmet, Multer, express-validator | ✅ Done |
| **Database**             | MongoDB Atlas / Local MongoDB, Mongoose                | ✅ Done |
| **Authentication**       | JWT, bcrypt, role-based access control                 | ✅ Done |
| **API Communication**    | REST API, native `fetch`                               | ✅ Done |
| **Internationalization** | English, Amharic, Afaan Oromo guest interface          | ✅ Done |
| **File Upload**          | Multer                                                 | ✅ Done |

## Security

The system includes several security mechanisms:

* JWT-based authentication.
* Password hashing using bcrypt.
* Role-based route protection.
* Input validation using `express-validator`.
* HTTP security headers using Helmet.
* Protected administrative and officer routes.
* Restricted access to complaint management functions according to user roles.

## Photo Upload

Citizens can optionally attach photos when submitting complaints.

Supported image formats include:

* JPEG
* PNG
* WebP
* GIF

The maximum supported file size is **2 MB**.

## Notifications

The system includes a notification mechanism for user-related complaint updates.

Email notification support is configured in the project where applicable. Production SMS notification integration is planned as future work and is not considered a fully completed production feature.

## AI Assistance

The system includes an AI assistance component designed to support complaint submission and complaint management.

Depending on configuration, the AI component can support:

* Complaint writing assistance.
* Complaint categorization or triage.
* Frequently asked questions.
* Basic conversational assistance.
* Voice input support where configured.
* Rule-based fallback when an external AI provider is unavailable.

The AI component is implemented as a separate service and can be configured to work with supported AI providers.

## Database

The system uses **MongoDB** with **Mongoose** for database management.

Main collections include:

* `users`
* `complaints`
* `departments`
* `statusHistories`
* `notifications`
* `activityLogs`

## Project Structure

```text
Citizen/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── ...
│
├── Project_Proposal_Web_Based_Citizen_Complaint_Management.md
└── README.md
```

## Backend Environment

Create a `.env` file inside the `backend` directory based on `.env.example`.

Example configuration:

```text
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_CLUSTER=your_cluster.mongodb.net
MONGODB_DB=adama_citizen

# Optional full MongoDB connection string
MONGODB_URI=

JWT_SECRET=your_secure_secret
CLIENT_ORIGIN=http://localhost:5173
```

### MongoDB Atlas

If MongoDB Atlas is used:

1. Create a MongoDB Atlas database.
2. Create a database user.
3. Add your IP address under **Network Access**.
4. Configure the MongoDB credentials in `.env`.
5. Start the backend server.

> Do not commit your `.env` file or database passwords to GitHub.

## Main API Routes

| Endpoint                     | Method     | Description                                   |
| ---------------------------- | ---------- | --------------------------------------------- |
| `/api/health`                | GET        | Check API health                              |
| `/api/auth/login`            | POST       | Authenticate a user                           |
| `/api/auth/register`         | POST       | Register a citizen                            |
| `/api/auth/me`               | GET        | Get the current authenticated user            |
| `/api/complaints`            | GET / POST | List or submit complaints                     |
| `/api/complaints/:id/assign` | PATCH      | Assign a complaint to a department or officer |
| `/api/complaints/:id/status` | PATCH      | Update complaint status                       |
| `/api/uploads`               | POST       | Upload a complaint photo                      |
| `/api/users`                 | GET        | List users for administrators                 |
| `/api/users/:id/active`      | PATCH      | Activate or deactivate a user                 |
| `/api/departments`           | GET / POST | List or add departments                       |
| `/api/notifications`         | GET        | Get user notifications                        |
| `/api/reports/summary`       | GET        | Get complaint summary information             |
| `/api/activity-logs`         | GET        | View administrative activity logs             |

## Authentication

After successful login:

1. The backend returns a JWT.
2. The frontend stores the JWT in `localStorage`.
3. The token is included when accessing protected API routes.
4. The backend verifies the token and user role before allowing protected operations.

The authentication system supports:

* Citizen authentication.
* Administrator authentication.
* Department Officer authentication.
* Role-based route protection.

## Development

Start the backend:

```bash
cd backend
npm install
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

The application can then be accessed through:

```text
http://localhost:5173
```

## Current Project Status

| Component                    | Status                     |
| ---------------------------- | -------------------------- |
| React frontend               | ✅ Completed                |
| Node.js / Express REST API   | ✅ Completed                |
| MongoDB database integration | ✅ Completed                |
| JWT authentication           | ✅ Completed                |
| Password hashing             | ✅ Completed                |
| Role-based access control    | ✅ Completed                |
| Complaint submission         | ✅ Completed                |
| Complaint photo upload       | ✅ Completed                |
| Complaint assignment         | ✅ Completed                |
| Complaint status tracking    | ✅ Completed                |
| User management              | ✅ Completed                |
| Department management        | ✅ Completed                |
| Notifications                | ✅ Implemented              |
| Reports summary              | ✅ Implemented              |
| Activity logging             | ✅ Implemented              |
| Guest multilingual interface | ✅ Completed                |
| AI assistance                | ✅ Implemented/configurable |
| Production deployment        | ⏳ Remaining                |
| Production SMS integration   | ⏳ Remaining                |
| Email password reset         | ⏳ Remaining                |
| Advanced report export       | ⏳ Remaining                |
| Pagination                   | ⏳ Remaining                |
| GIS / interactive mapping    | ⏳ Future work              |
| Native mobile application    | ⏳ Future work              |

## Roadmap

The following improvements are planned for future development:

1. **Production Deployment**

   * Deploy the frontend and backend to production servers.
   * Configure HTTPS.
   * Configure production environment variables.
   * Implement database backup procedures.

2. **Notification Improvements**

   * Complete production SMS integration.
   * Improve email notification workflows.
   * Complete production email password-reset functionality.

3. **Administration Improvements**

   * Add complete edit and delete operations for users and departments.
   * Add advanced report export.
   * Add pagination for large datasets.

4. **Future Extensions**

   * GIS and interactive complaint mapping.
   * Native mobile applications.
   * Additional analytics and reporting features.

## Project Purpose

This project was developed to support the digital management of citizen complaints within **Adama City Administration**. The system provides a centralized platform where complaints can be submitted, assigned, tracked, updated, and resolved while maintaining records of complaint history and administrative activities.

## License

This project is developed for academic and practical attachment purposes. Further licensing and deployment terms can be defined by the project owners and the relevant institution.
