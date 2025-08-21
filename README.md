
# 🎯 TalentHub – Mini Job Portal

TalentHub is a **mini job portal platform** where companies can post job listings, developers can apply for jobs, and admins can review applications. This project demonstrates skills in **frontend design, backend logic, API development, and database management** while being simple enough for rapid development.

---

## 💡 Objective

The goal is to build a lightweight, functional job portal that allows users to:

* Employers: Post and manage job listings.
* Developers: Apply for jobs and track applications.
* Admins: Monitor applications and manage the platform.

---

## 🔹 Core Features

### Frontend (React / Next.js / Tailwind)

* **Landing Page**

  * Logo: Simple text logo “TalentHub”
  * Job listings display
  * Apply button for developers

* **Employer Functionality**

  * Form to add new job postings

* **Developer Functionality**

  * Apply to jobs via a form
  * Dashboard to view all applied jobs

---

### Backend (Node.js / Express / Python / PHP)

* **Authentication**

  * JWT or session-based login/signup

* **CRUD Endpoints**

  * `/jobs`: Create, list, delete jobs
  * `/applications`: Apply and view applications
  * Validation: Prevent duplicate applications

* **Optional**

  * Real-time notifications using Socket.io

---

### Database (SQL / MongoDB / Postgres)

* **Users**: `id`, `name`, `email`, `role` (employer/applicant)
* **Jobs**: `id`, `title`, `description`, `createdBy`
* **Applications**: `id`, `jobId`, `userId`, `status` (applied/shortlisted/rejected)

---

### API Endpoints

| Endpoint                | Method | Description                  |
| ----------------------- | ------ | ---------------------------- |
| `/auth/register`        | POST   | User signup                  |
| `/auth/login`           | POST   | User login                   |
| `/jobs`                 | GET    | List all jobs                |
| `/jobs`                 | POST   | Create a job (employer only) |
| `/applications`         | POST   | Apply for a job              |
| `/applications/:userId` | GET    | View user applications       |

---

## ✨ Bonus Features

* File upload for resumes
* Admin panel for jobs & applications
* Search & filter jobs by keywords or skills
* Dark mode toggle
* Analytics (applications count per job)

---

## 🎨 Branding & UI

* **Project Name:** TalentHub
* **Colors:**

  * Primary: Blue (#1E40AF)
  * Secondary: Green (#10B981)
  * Background: White

---

## 🛠 Instructions for Candidates

1. **Repository Setup:** GitHub/GitLab with regular commits
2. **Frontend:** React/Next.js + Tailwind
3. **Backend:** Node.js/Express (or Django/PHP)
4. **Database:** SQL / MongoDB / Postgres
5. **API Documentation:** Include README or Swagger
6. **Deployment (Bonus):** Frontend on Vercel, Backend on Render/Heroku

---

## ✅ Evaluation Criteria

* **Frontend:** Clean, responsive UI; reusable components
* **Backend:** Secure, structured, scalable endpoints
* **API:** Clear docs, correct HTTP methods, error handling
* **Database:** Proper schema design & relationships
* **Code Quality:** Folder structure, comments, commits
* **Extra Features:** Any bonus work beyond requirements
* **Branding:** Professional look and feel

---

## ⏱ Project Timeline

* **Estimated Completion:** 3–5 days
* Strong candidates may differentiate by adding search, analytics, or other enhancements.

