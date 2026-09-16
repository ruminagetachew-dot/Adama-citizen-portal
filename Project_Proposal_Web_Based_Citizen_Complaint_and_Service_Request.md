# PROJECT PROPOSAL

## Web-Based Citizen Complaint Management System for Adama City Administration

---

**HARAMAYA UNIVERSITY**

**COLLEGE OF COMPUTING AND INFORMATICS**

**DEPARTMENT OF INFORMATION SCIENCE**

**PROJECT PROPOSAL ON**

**WEB-BASED CITIZEN COMPLAINT MANAGEMENT SYSTEM**

**FOR ADAMA CITY ADMINISTRATION**

| | |
|--|--|
| **Prepared By** | ____________________ (ID: __________) |
| **Host Company** | Adama City Administration Science and Technology Office |
| **Advisor** | ____________________ |
| **Submission Date** | ____________________ |

**Haramaya, Ethiopia**

---

## Declaration

I hereby declare that this project proposal, titled **"Web-Based Citizen Complaint Management System for Adama City Administration"**, is my original work prepared for **Haramaya University, College of Computing and Informatics, Department of Information Science** under the guidance of my advisor.

| | |
|--|--|
| **Name** | ____________________ |
| **ID** | __________ |
| **Signature** | ______________________________ |
| **Date** | ____________________ |

---

## Acknowledgement

I thank Almighty God, my advisor, Haramaya University staff, and **Adama City Administration Science and Technology Office** for hosting this work and supporting the development of the system.

---

## Abstract (Executive Summary)

Adama City Administration handles many citizen complaints through manual, paper-based processes. This causes delays, poor records, weak tracking, and limited transparency.

This project implements a **Web-Based Citizen Complaint Management System** using the **MERN stack** (MongoDB, Express.js, React, Node.js). The system supports three roles: **Citizen**, **Administrator**, and **Department Officer**. Citizens register, submit categorized complaints with optional photos, track status by reference ID, and edit pending complaints. Administrators manage users and departments, assign work, and view reports. Officers process department tasks and add resolution notes.

Key features include JWT authentication, role-based access control, hierarchical location (Kebele–Landmark–Specific), status history, in-app notifications, multi-language guest UI (English, Amharic, Afaan Oromo), password reset, and optional AI assistance (writing help, triage, FAQ chat, voice input).

**Keywords:** citizen complaint, e-governance, Adama City Administration, MERN, role-based access control

---

## Table of Contents

| Section | Title | Page |
|---------|-------|------|
| | **Front Matter** | |
| | Declaration | i |
| | Acknowledgement | ii |
| | Abstract (Executive Summary) | iii |
| | Table of Contents | iv |
| | List of Acronyms | v |
| | List of Figures | vi |
| | **Main Content** | |
| **Chapter 1** | **INTRODUCTION** | 1 |
| 1.1 | Background of the Study | 1 |
| 1.2 | Problem Statement | 2 |
| 1.3 | Objectives | 2 |
| 1.4 | Scope of the Project | 3 |
| 1.5 | Limitations | 3 |
| 1.6 | Literature Review and Related Work | 4 |
| **Chapter 2** | **SYSTEM REQUIREMENTS AND DESIGN** | 5 |
| 2.1 | Proposed System | 5 |
| 2.2 | Actors | 6 |
| 2.3 | Functional Requirements | 6 |
| 2.4 | Non-Functional Requirements | 7 |
| 2.5 | System Architecture | 8 |
| 2.6 | System Workflow | 9 |
| 2.7 | Technology Stack | 10 |
| 2.8 | Database Design (Main Collections) | 11 |
| **Chapter 3** | **METHODOLOGY AND PROJECT PLAN** | 12 |
| 3.1 | Software Development Methodology | 12 |
| 3.2 | Methods of Data Collection | 14 |
| 3.3 | Development and Deployment Environment | 15 |
| 3.3.1 | Hardware Requirements | 15 |
| 3.3.2 | Software Environment and Tools | 16 |
| 3.4 | Project Schedule and Timeline (12 Weeks) | 17 |
| 3.5 | System Testing Plan | 18 |
| 3.5.1 | Automated and Manual Test Cases | 19 |
| 3.6 | Deployment and Operational Plan | 20 |
| 3.6.1 | Production Setup Steps | 21 |
| **Chapter 4** | **RESULTS AND DISCUSSION** | 22 |
| 4.1 | Results | 22 |
| 4.2 | Discussion | 23 |
| 4.3 | Expected Benefits | 23 |
| 4.4 | Future Enhancements | 24 |
| **Chapter 5** | **CONCLUSION** | 25 |
| | **Back Matter** | |
| | References | 26 |
| | Version History | 27 |

---

## List of Acronyms

| Acronym | Full Form |
|---------|-----------|
| AI | Artificial Intelligence |
| API | Application Programming Interface |
| ASTU | Adama Science and Technology University |
| CPU | Central Processing Unit |
| CRUD | Create, Read, Update, Delete |
| CSS | Cascading Style Sheets |
| DB | Database |
| DDR | Double Data Rate |
| EN | English |
| FAQ | Frequently Asked Questions |
| GB | Gigabyte |
| GIS | Geographic Information System |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| HTTPS | HyperText Transfer Protocol Secure |
| ID | Identifier |
| IDE | Integrated Development Environment |
| i18n | Internationalization |
| JS | JavaScript |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| KVM | Kernel-based Virtual Machine |
| LTS | Long-Term Support |
| MB | Megabyte |
| MERN | MongoDB, Express.js, React, Node.js |
| npm | Node Package Manager |
| NVMe | Non-Volatile Memory Express |
| OM | Afaan Oromo |
| PM2 | Process Manager 2 |
| RAM | Random Access Memory |
| RBAC | Role-Based Access Control |
| REST | Representational State Transfer |
| SPA | Single-Page Application |
| SSD | Solid State Drive |
| SSL | Secure Sockets Layer |
| TLS | Transport Layer Security |
| UAT | User Acceptance Testing |
| UI | User Interface |
| URI | Uniform Resource Identifier |
| URL | Uniform Resource Locator |
| VPS | Virtual Private Server |
| VS Code | Visual Studio Code |

---

## List of Figures

| Figure No. | Title | Page |
|------------|-------|------|
| Figure 2.1 | Hierarchical Organizational Chart | 6 |
| Figure 2.2 | System Actors and Roles | 6 |
| Figure 2.3 | System Architecture Design | 8 |
| Figure 2.4 | System Workflow Diagram | 9 |
| Figure 2.5 | Use Case Diagram | 10 |
| Figure 2.6 | Entity-Relationship Diagram (ERD) | 11 |
| Figure 2.7 | Data Flow Diagram (DFD) | 11 |
| Figure 3.1 | Agile Software Development Methodology | 13 |
| Figure 3.2 | Production Deployment Architecture | 21 |
| Figure 3.3 | Project Timeline (12 Weeks) | 17 |
| Figure 4.1 | Landing Page (Multi-language) | 22 |
| Figure 4.2 | Registration and Login Interface | 22 |
| Figure 4.3 | Submit Complaint Form | 22 |
| Figure 4.4 | Citizen Dashboard and My Submissions | 23 |
| Figure 4.5 | Officer Dashboard | 23 |
| Figure 4.6 | Admin Complaints and Reports | 23 |

---

## CHAPTER ONE: INTRODUCTION

### 1.1 Background of the Study

Adama City citizens report problems such as road damage, waste collection failures, water leaks, and streetlight outages. These complaints are often handled manually through office visits and paper forms, leading to slow response, lost records, and poor follow-up.

### 1.2 Problem Statement

- Manual complaint handling and weak record keeping  
- No centralized tracking or reference numbers  
- Delayed department response  
- Limited transparency and reporting  
- No audit trail for status changes  

### 1.3 Objectives

**General objective:** Develop a web-based complaint management system that improves transparency, efficiency, and accountability in Adama City municipal service delivery.

**Specific objectives:**

- Online registration, login, and password reset  
- Electronic complaint submission with categories, location, and optional photo  
- Status tracking with history timeline  
- Role-based dashboards for citizen, admin, and officer  
- Department assignment workflow and in-app notifications  
- Reports and activity logs for monitoring  

### 1.4 Scope of the Project

**In scope:** JWT auth, complaint CRUD (edit while pending), hierarchical location (18 kebeles + landmarks), photo upload (max 2 MB), status workflow, notifications, reports, audit log, guest i18n (EN/AM/OM), AI assist sidecar (writing, triage, FAQ, voice input).

**Out of scope:** Service request module (removed to simplify workflow), GIS maps, native mobile apps, online payments, full SMS/email rollout (backend prepared; production config required), API pagination and rate limiting.

### 1.5 Limitations

- Requires internet access  
- Image uploads limited to 2 MB  
- Some authenticated screens remain primarily in English  
- Production SMS/email depends on external provider configuration  
- No integration with legacy paper records  

### 1.6 Literature Review and Related Work

| System | Relevance |
|--------|-----------|
| FixMyStreet (UK) | Citizen-driven online reporting |
| 311 Systems (USA) | Categorization and department routing |
| Ethiopian e-Service initiatives | National digital government direction |

**Gap:** Adama City lacked a centralized web platform connecting citizens, administrators, and officers with transparent tracking. This project addresses that gap.

---

## CHAPTER TWO: SYSTEM REQUIREMENTS AND DESIGN

### 2.1 Proposed System

Three-tier web application: **React (Vite) frontend**, **Node.js/Express API**, **MongoDB** database, plus optional **AI service** on port 5100.

**Citizens can:** Register, log in, reset password, submit complaints, edit pending complaints, track status, view notifications, use AI writing help and voice input.

**Administrators can:** Manage users (activate/deactivate), manage departments, assign complaints, update/reject status, view reports and activity logs.

**Officers can:** View department queue, start work, add resolution notes, mark Resolved or Closed (cannot reject).

### 2.2 Actors

**Figure 2.1: Hierarchical Organizational Chart**

![Hierarchical Organizational Chart](images/organizational_chart.png)

*Insert image showing the organizational hierarchy: Adama City Administration at the top, followed by departments (Roads & Infrastructure, Water Supply, Sanitation, Public Utilities), with department officers under each department, and citizens as external stakeholders.*

---

**Figure 2.2: System Actors and Roles**

![System Actors and Roles](images/actors_roles.png)

*Insert image showing three main actors with their key responsibilities:*
- *Citizen icon with actions: Register, Submit Complaint, Track Status*
- *Administrator icon with actions: Manage Users, Assign Work, Generate Reports*
- *Department Officer icon with actions: Process Queue, Update Status, Add Resolution Notes*

---

| Actor | Role |
|-------|------|
| Citizen | Submits and tracks own complaints |
| Administrator | City-wide management and assignment |
| Department Officer | Processes assigned department work |

### 2.3 Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | User registration and JWT login |
| FR-02 | Password reset via email token |
| FR-03 | Complaint submission (category, kebele, landmark, description, photo) |
| FR-04 | Edit complaint while status is Pending |
| FR-05 | Status tracking with history timeline |
| FR-06 | Assignment to department and optional officer |
| FR-07 | Role-based dashboards and reports |
| FR-08 | In-app notifications (auto-mark read on view) |
| FR-09 | Activity/audit log |
| FR-10 | AI assistance (optional): writing, triage, FAQ, voice |

**Complaint categories:** Road Maintenance, Waste Management, Water Supply, Street Lighting, Drainage, Public Safety, Noise Pollution, Other.

**Status values:** Pending → In Progress → Resolved / Closed; Admin may Reject from Pending or In Progress.

**Location format:** `Kebele - Landmark - Specific location` (18 kebeles, 13 verified landmarks).

### 2.4 Non-Functional Requirements

- **Security:** bcrypt passwords, JWT, RBAC, input validation, Helmet, secure file upload  
- **Performance:** Indexed queries; API target under 2 seconds  
- **Usability:** Responsive SPA, validation messages, multi-language guest portal  
- **Maintainability:** Modular routes/controllers/models; Git version control  

### 2.5 System Architecture

**Figure 2.3: System Architecture Design**

![System Architecture Design](images/system_architecture.png)

*Insert image showing the three-tier architecture:*
- *Presentation Layer: React SPA (Browser)*
- *Application Layer: Express.js REST API with JWT/RBAC middleware*
- *Data Layer: MongoDB Atlas*
- *Optional: AI Service component (port 5100)*
- *Supporting: File Upload Storage (/uploads directory)*

---

```
[Browser - React SPA] → HTTPS/REST → [Express API + JWT/RBAC] → [MongoDB Atlas]
                                              ↓
                                    [AI Service - optional]
                                    [File uploads /uploads]
```

### 2.6 System Workflow

**Figure 2.4: System Workflow Diagram**

![System Workflow Diagram](images/system_workflow.png)

*Insert image showing the complete workflow:*
1. *Citizen registers → Submits complaint with photo → System assigns reference ID (CMP-YYYY-XXXX) → Status: Pending*
2. *Admin reviews → Routes to department (remains Pending) OR Assigns to officer (status: In Progress)*
3. *Officer processes → Starts work (In Progress) → Adds resolution notes → Sets status to Resolved/Closed*
4. *System updates: Status history logged, notifications sent to citizen, activity log recorded*
5. *Citizen tracks progress → Views status timeline → Receives in-app notifications*

---

**Figure 2.5: Use Case Diagram**

![Use Case Diagram](images/use_case_diagram.png)

*Insert UML Use Case diagram showing:*
- *Actor: Citizen with use cases (Register, Login, Submit Complaint, Edit Pending Complaint, Track Status, View Notifications, Reset Password)*
- *Actor: Administrator with use cases (Manage Users, Manage Departments, Assign Complaints, Update Status, View Reports, View Activity Log)*
- *Actor: Department Officer with use cases (View Queue, Start Work, Update Status, Add Resolution Notes, View Assigned Tasks)*
- *System boundary: Adama Citizen Complaint Management System*

---

1. Citizen registers and submits a complaint → system assigns reference ID (e.g., CMP-2026-0001), status **Pending**.  
2. Admin routes to department (Pending) or assigns officer (**In Progress**).  
3. Officer processes and sets **Resolved** or **Closed**.  
4. Status history, notifications, and activity log are updated; citizen tracks progress online.

### 2.7 Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, React Router, Context API, CSS3 |
| Backend | Node.js, Express 5, Mongoose, JWT, bcrypt, Multer, Helmet |
| Database | MongoDB Atlas / local MongoDB |
| AI Service | Express sidecar, Gemini/OpenAI API, heuristic fallback |
| Tools | VS Code, Git, Postman |

### 2.8 Database Design (Main Collections)

**Figure 2.6: Entity-Relationship Diagram (ERD)**

![Entity-Relationship Diagram](images/erd_diagram.png)

*Insert ER diagram showing:*
- *Users entity (PK: _id, attributes: fullName, email, passwordHash, role, phoneNumber, departmentId FK, isActive)*
- *Departments entity (PK: _id, attributes: name, description, isActive)*
- *Complaints entity (PK: _id, attributes: referenceId, title, description, category, location, status, photoUrl, citizenId FK, departmentId FK, assignedOfficerId FK, timestamps)*
- *StatusHistories entity (PK: _id, attributes: entityType, entityId FK, fromStatus, toStatus, note, changedBy FK, changedAt)*
- *Notifications entity (PK: _id, attributes: userId FK, title, message, relatedEntityType, relatedEntityId FK, isRead, createdAt)*
- *ActivityLogs entity (PK: _id, attributes: userId FK, action, entityType, entityId FK, details, createdAt)*
- *Relationships:*
  - *Users 1:N Complaints (as citizen)*
  - *Users 1:N Complaints (as assigned officer)*
  - *Departments 1:N Complaints*
  - *Departments 1:N Users (department officers)*
  - *Users 1:N StatusHistories*
  - *Users 1:N Notifications*
  - *Users 1:N ActivityLogs*

---

**Figure 2.7: Data Flow Diagram (DFD)**

![Data Flow Diagram](images/dfd_diagram.png)

*Insert Level 0 DFD showing:*
- *External entities: Citizen, Administrator, Department Officer*
- *Central process: Complaint Management System*
- *Data stores: Users DB, Complaints DB, Departments DB, Notifications DB, Activity Logs DB*
- *Data flows:*
  - *Citizen → Submit complaint data → System*
  - *System → Store complaint → Complaints DB*
  - *System → Send confirmation + reference ID → Citizen*
  - *Administrator → Assignment/status update → System*
  - *System → Update records → Complaints DB, Status History DB, Activity Logs DB*
  - *System → Send notifications → Notifications DB → Citizen/Officer*
  - *Officer → Resolution notes → System*
  - *System → Generate reports → Administrator*

---

| Collection | Purpose |
|------------|---------|
| users | Citizens, admins, officers |
| departments | Municipal departments |
| complaints | Complaint records |
| statusHistories | Status change audit |
| notifications | In-app alerts |
| activityLogs | Admin action trail |

---

## CHAPTER THREE: METHODOLOGY AND PROJECT PLAN

### 3.1 Software Development Methodology
To design, implement, and validate the Web-Based Citizen Complaint Management System for Adama City Administration, an **Agile Scrum Development Methodology** is adopted. This approach divides the 12-week development lifecycle into short, iterative cycles called *Sprints* (each lasting two weeks). This methodology is highly suitable for municipal e-governance systems due to its adaptability to shifting policy requirements, continuous user-feedback integration, and emphasis on working software increments.

The development lifecycle follows these key phases:
1. **Requirements Gathering & Domain Analysis:** Elicitation of functional and non-functional specifications from city administrators, public officers, and citizens.
2. **System Design & Schema Modeling:** Defining database structures like [`User.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/User.js), [`Complaint.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/Complaint.js), and [`StatusHistory.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/StatusHistory.js), designing API contracts, and drafting user interfaces.
3. **Sprint Planning & Incremental Coding:** Writing clean, modular Node.js Express controllers and creating responsive React pages.
4. **Integration & Continuous Testing:** Integrating frontend views with the RESTful backend endpoints, followed by role-based access validation.
5. **Deployment & Operations Setup:** Setting up environment variables, PM2 process management, and configuring Nginx on the target host.

**Figure 3.1: Agile Software Development Methodology**

![Agile Methodology Diagram](images/agile_methodology.png)

*Insert image showing the iterative Agile cycle with the following flowchart:*

---

```
                  ┌─────────────────────────────────────┐
                  │ Requirements Gathering & Analysis   │
                  └──────────────────┬──────────────────┘
                                     ▼
                  ┌─────────────────────────────────────┐
                  │  System Design & Database Schema    │
                  └──────────────────┬──────────────────┘
                                     ▼
            ┌─► ┌─────────────────────────────────────┐ ─┐
            │   │ Sprint Planning & Task Execution    │  │
            │   └──────────────────┬──────────────────┘  │
            │                      ▼                     │
            │   ┌─────────────────────────────────────┐  │ Iterative
            │   │ Incremental Coding (MERN Stack)     │  │ Agile
            │   └──────────────────┬──────────────────┘  │ Sprints
            │                      ▼                     │
            │   ┌─────────────────────────────────────┐  │
            │   │  Integration & Verification Testing  │  │
            │   └──────────────────┬──────────────────┘  │
            └──────────────────────┼──────────────────┘ ─┘
                                   ▼
                  ┌─────────────────────────────────────┐
                  │    Production Nginx Deployment      │
                  └─────────────────────────────────────┘
```

### 3.2 Methods of Data Collection
To construct a representative domain model and specify realistic workflows for Adama City, data was gathered through primary and secondary research channels:
* **Primary Data Collection:**
  * **Semi-Structured Interviews:** Conducted with system administrators, IT support staff, and municipal officers at the *Adama City Administration Science and Technology Office* to map administrative hierarchies and paper dispatch rules.
  * **Direct Field Observation:** Observing the current physical citizen desk at the municipal building to trace the average time, records, and friction points associated with processing physical paperwork.
* **Secondary Data Collection:**
  * **System Reference Reviews:** Analysis of existing e-governance platforms such as *FixMyStreet* and western municipal *311 Systems*.
  * **Policy Frameworks:** Studying the digital development standards outlined in the *Digital Ethiopia 2025* national strategy to ensure architectural compliance.

### 3.3 Development and Deployment Environment
The development and operational environments are standardized to ensure scalability, ease of migration, and predictable performance.

#### 3.3.1 Hardware Requirements
* **Development Machine:** 
  * CPU: Intel Core i5/i7 (or Apple Silicon M-series equivalent)  
  * Memory: 16 GB DDR4 RAM  
  * Storage: 512 GB NVMe SSD  
* **Production Hosting Target (VPS):**
  * Virtualization: KVM-based Virtual Private Server (Ubuntu Server 22.04 LTS)  
  * Memory: Minimum 2 GB (Recommended 4 GB) RAM  
  * Storage: 40 GB SSD  
  * Networking: Public Static IP address with HTTP/HTTPS ports open (80, 443)

#### 3.3.2 Software Environment and Tools
* **Operating System:** Windows 10/11 (Development), Ubuntu 22.04 LTS (Production Host)
* **Runtime Stack:** Node.js (v18.x or v20.x LTS) with npm package manager
* **Integrated Development Environment:** Visual Studio Code (VS Code)
* **API Testing Tool:** Postman Utility Suite
* **Version Control:** Git version management, hosted via GitHub repositories
* **Process Manager:** PM2 (Production clustering and uptime daemon)
* **Web Server & Reverse Proxy:** Nginx with SSL termination via Let's Encrypt Certbot
* **Database Management:** MongoDB Atlas (Cloud-managed database cluster)

### 3.4 Project Schedule and Timeline (12 Weeks)
The project schedule is structured over 12 consecutive weeks, detailing milestones, deliverable targets, and specific sprints:

**Figure 3.3: Project Timeline (12 Weeks)**

![Project Timeline](images/project_timeline.png)

*Insert Gantt chart or timeline diagram showing the 12-week schedule with the following phases:*
- *Weeks 1-2: Requirements & Architecture Design*
- *Weeks 3-4: Backend Foundation (Auth & Organization)*
- *Weeks 5-6: Core Workflow API & Notifications*
- *Weeks 7-8: Citizen & Admin Frontend Layouts*
- *Week 9: Officer Workflow & Location Systems*
- *Week 10: Enhanced Features & Translation*
- *Week 11: Comprehensive Testing & Refactoring*
- *Week 12: Production Deployment & Final Documentation*

---

| Week | Focus / Phase | Core Activities & Tasks | Key Deliverable |
|------|---------------|--------------------------|-----------------|
| **Weeks 1–2** | **Requirements & Architecture Design** | Domain modeling, database Schema designs ([`User.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/User.js), [`Complaint.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/Complaint.js)), REST API design, wireframing. | Project Proposal approved, API Specifications. |
| **Weeks 3–4** | **Backend Foundation (Auth & Org)** | Setting up Node/Express app, JWT token authentication, User models, Department configurations. | Secure signup, login, and token-verification APIs. |
| **Weeks 5–6** | **Core Workflow API & Notifications** | Coding complaint submission pipelines, assignment logs ([`ActivityLog.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/ActivityLog.js)), status state transitions, in-app notifications. | Core REST API backend routes fully functional. |
| **Weeks 7–8** | **Citizen & Admin Frontend Layouts** | Building React dashboard, submitting forms via [`NewComplaintPage.jsx`](file:///c:/Users/Hp/Desktop/Citizen/frontend/src/pages/citizen/NewComplaintPage.jsx), routing panels, status updates. | Responsive Citizen and Admin interfaces. |
| **Week 9** | **Officer Workflow & Location Systems** | Developing Department Officer task queue, Kebele–Landmark dropdown selections, and integrating local AI assistance features. | Role-based dashboard workflows (Officer + AI help). |
| **Week 10** | **Enhanced Features & Translation** | Multi-language translation setup (EN, AM, OM), password reset via [`ResetPasswordPage.jsx`](file:///c:/Users/Hp/Desktop/Citizen/frontend/src/pages/ResetPasswordPage.jsx), editing pending posts. | Password recovery, guest dashboard, localized UI. |
| **Week 11** | **Comprehensive Testing & Refactoring** | Executing testing scenarios (RBAC verification, manual REST audits, UAT user validation, error resolving). | Verified test logs, debugged application package. |
| **Week 12** | **Production Deployment & Final Documentation** | Hosting build configurations, configuring Nginx reverse-proxies, seeding databases, writing final technical document. | Production-ready live system and technical project report. |

### 3.5 System Testing Plan
To ensure robustness, security compliance, and correct role permissions, a multi-tiered testing plan is executed:
1. **Unit Testing:** Validating individual backend helper utilities, authentication middlewares, and validation schemas.
2. **Integration Testing:** Testing API routes using Postman, verifying that the database schemas (e.g., [`User.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/User.js)) correspond to incoming JSON requests.
3. **Role-Based Access Control (RBAC) Security Testing:** Ensuring that officers and citizens cannot access admin endpoints, and checking authorization tokens.
4. **User Acceptance Testing (UAT):** Simulated testing with mock citizens and department officers to ensure simple navigation and usability.

#### 3.5.1 Automated and Manual Test Cases
The system is validated against the following concrete testing suite:

| Test ID | Scenario | Input / Test Steps | Expected Result | Actual Outcome | Status |
|---------|----------|---------------------|-----------------|----------------|--------|
| **TC-01** | Citizen Registration | Submit new registration payload via register route. | User account created; password hashed in DB via bcrypt. | User added successfully; passwords encrypted. | Pass |
| **TC-02** | Secure Authentication | Log in with valid credentials; log in with invalid credentials. | Valid yields JWT token and user info; invalid yields 401 Unauthorized. | Token returned on success; error thrown on mismatch. | Pass |
| **TC-03** | Complaint Submission | Submit valid complaint with category, kebele, landmark, photo. | Status set to **Pending**, Unique Reference ID generated (e.g., `CMP-YYYY-XXXX`). | Complaint stored; reference ID assigned; status: Pending. | Pass |
| **TC-04** | Edit Pending Complaint | Modify a complaint which has a status of **Pending**. | Database updates values; response returns success code. | Complaint successfully edited; updates reflected on dashboard. | Pass |
| **TC-05** | Unauthorized Edit Block | Attempt to edit a complaint which has a status of **In Progress** or **Resolved**. | System rejects edit request with 400 Bad Request. | API denies modification attempt with appropriate message. | Pass |
| **TC-06** | Administrative Routing | Admin assigns complaint to a specific department. | System registers assignment, creates [`StatusHistory.js`](file:///c:/Users/Hp/Desktop/Citizen/backend/src/models/StatusHistory.js) entry, notifies department. | Department assigned; status changes to In Progress; officer notified. | Pass |
| **TC-07** | Officer Resolution | Officer updates status to Resolved and inputs resolution description. | Status is set to **Resolved**, citizen notified, audit log entry created. | Complaint updated to Resolved; email/in-app alert dispatched. | Pass |
| **TC-08** | RBAC Cross-Access | Request admin user logs using a Citizen JWT. | Server blocks request and returns 403 Forbidden. | Access denied; route blocked by auth middleware. | Pass |

### 3.6 Deployment and Operational Plan
The system is designed for deployment on KVM-based virtual servers. The production architecture uses the standard MERN deployment topology:

**Figure 3.2: Production Deployment Architecture**

![Production Deployment Architecture](images/deployment_architecture.png)

*Insert diagram showing production infrastructure:*
- *Client browsers (Citizen/Admin/Officer users)*
- *HTTPS traffic (Port 443) through firewall*
- *Nginx Reverse Proxy (SSL termination, static file serving, API proxying)*
- *PM2 Process Manager running Node.js/Express backend*
- *MongoDB Atlas Cloud Cluster*
- *Optional: AI Service on port 5100*
- *File storage: /uploads directory*

---

```
[ Citizen/Admin Users ] ──── HTTPS (Port 443) ────► [ Nginx Reverse Proxy ]
                                                            │
                     ┌──────────────────────────────────────┴──────────────────────────────────────┐
                     ▼                                                                             ▼
        [ React Frontend App ]                                                           [ Express Backend API ]
      (Static build served via Nginx)                                                    (Node process run by PM2)
                                                                                                   │
                                                                                                   ▼
                                                                                         [ MongoDB Cloud Cluster ]
```

#### 3.6.1 Production Setup Steps
1. **Environment Configuration:** Deploy a secure `.env` file on the VPS including database connection strings, JWT private keys, and production configuration:
   ```ini
   PORT=5000
   MONGO_URI=mongodb+srv://admin:secure_password@cluster0.mongodb.net/citizen_db
   JWT_SECRET=super_secret_production_key_2026
   CLIENT_ORIGIN=https://citizen.adamacity.gov.et
   ```
2. **Frontend Compiling:** Compile the React frontend SPA into static HTML/CSS/JS components inside the build directory:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
3. **Daemon Process Management:** Run the Express backend API in clustered mode using PM2 to guarantee automatic restarts on failure and background execution:
   ```bash
   cd backend
   npm install --production
   pm2 start src/index.js --name "citizen-backend-api"
   pm2 save
   pm2 startup
   ```
4. **Nginx Reverse Proxy & SSL Setup:** Configure Nginx to serve the compiled frontend files directly and proxy API calls to port `5000`. Secure all connections with TLS certificates via Let's Encrypt:
   ```nginx
   server {
       listen 80;
       server_name citizen.adamacity.gov.et;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl;
       server_name citizen.adamacity.gov.et;

       ssl_certificate /etc/letsencrypt/live/citizen.adamacity.gov.et/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/citizen.adamacity.gov.et/privkey.pem;

       location / {
           root /var/www/citizen/frontend/dist;
           try_files $uri /index.html;
       }

       location /api/ {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
5. **Database Seeding:** Populate initial municipal departments (e.g., Water Supply, Street Lighting, Waste Management) and create the root administrative account for city managers.

---

## CHAPTER FOUR: RESULTS AND DISCUSSION

The system was implemented and tested for all three roles in the development environment.

### 4.1 Results

**Public portal:** Landing page with EN/AM/OM language switch, registration, login, forgot/reset password.

**Citizen modules:** Dashboard, submit complaint (category + kebele + landmark + photo), edit pending complaint, My Submissions with status badges, notifications.

**Officer modules:** Task queue, status updates, resolution notes, dashboard counters.

**Admin modules:** User/department management, complaint assignment, reports by status and category, activity log.

*Insert screenshots when pasting into Word:*

- Figure 4.1: Landing page  
- Figure 4.2: Registration / Login  
- Figure 4.3: Submit Complaint form  
- Figure 4.4: Citizen dashboard / My Submissions  
- Figure 4.5: Officer dashboard  
- Figure 4.6: Admin complaints and reports  

### 4.2 Discussion

The system replaces fragmented paper handling with a centralized digital channel. Reference IDs, status history, and activity logs improve accountability. RBAC ensures each role sees only permitted data. Reports support departmental planning.

**Remaining gaps:** Production SMS/email needs provider setup; GIS and mobile app remain future work.

### 4.3 Expected Benefits

**Citizens:** Easy submission, real-time tracking, transparency.  
**Administration:** Central records, faster response, data-driven decisions.

### 4.4 Future Enhancements

- Full SMS/email notification rollout  
- GIS map-based location  
- Native mobile app  
- Advanced analytics with export  
- API pagination, rate limiting, JWT refresh tokens  

---

## CHAPTER FIVE: CONCLUSION

This project designed and implemented a **Web-Based Citizen Complaint Management System** for Adama City Administration. Citizens can submit and track complaints online; administrators assign and monitor work; officers resolve tasks within their departments. JWT authentication, RBAC, status history, and notifications provide a secure and transparent workflow.

The MERN-based solution is technically feasible and ready for phased deployment at Adama City Administration Science and Technology Office, with room for future enhancements such as SMS alerts and GIS integration.

---

## References

1. FixMyStreet. https://www.fixmystreet.com/  
2. MongoDB Documentation. https://www.mongodb.com/docs/  
3. Express.js. https://expressjs.com/  
4. React. https://react.dev/  
5. OWASP Authentication Cheat Sheet. https://cheatsheetseries.owasp.org/  
6. JWT.io. https://jwt.io/introduction  
7. Ethiopian Ministry of Innovation and Technology. *Digital Ethiopia 2025*.  
8. Sommerville, I. *Software Engineering* (10th ed.). Pearson.  

---

| Version | Date | Changes |
|---------|------|---------|
| 3.0 | August 2026 | Condensed proposal; aligned with current complaint-only system; added location hierarchy, edit complaint, AI assist, password reset; removed service request module |

*End of Proposal*
