# TalentHub API Documentation

## Overview

TalentHub is a comprehensive job board API that connects developers with employers. This RESTful API provides endpoints for user authentication, job management, application processing, and real-time notifications.

## Base URL

```
https://talent-hub-1-91qb.onrender.com/api/v1
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
2. [Jobs Endpoints](#jobs-endpoints)
3. [Applications Endpoints](#applications-endpoints)
4. [Notifications Endpoints](#notifications-endpoints)
5. [Error Handling](#error-handling)
6. [Data Types](#data-types)
7. [WebSocket Events](#websocket-events)
8. [Pagination](#pagination)

## Authentication Endpoints

### Register a New User

Creates a new user account.

**Endpoint:** `POST /auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "role": "DEVELOPER"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "DEVELOPER",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

### Login

Authenticates a user and returns a JWT token.

**Endpoint:** `POST /auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "DEVELOPER"
    }
  }
}
```

### Get Current User

Retrieves the authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "User data retrieved successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "DEVELOPER",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

### Logout

Invalidates the user's current session.

**Endpoint:** `POST /auth/logout`

**Authentication:** Required

**Response:**
```json
{
  "message": "Logout successful"
}
```

## Jobs Endpoints

### Get All Jobs

Retrieves a paginated list of all job postings.

**Endpoint:** `GET /jobs`

**Authentication:** Not required

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": [
    {
      "id": "job_id",
      "title": "Job Title",
      "type": "FULL_TIME",
      "description": "Job description",
      "requirements": ["Requirement 1", "Requirement 2"],
      "location": "Remote",
      "salary": "$80,000 - $100,000",
      "posted": "2023-01-01T00:00:00.000Z",
      "createdBy": {
        "id": "employer_id",
        "fullName": "Employer Name",
        "email": "employer@example.com"
      },
      "_count": {
        "applications": 5
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Get Job by ID

Retrieves a specific job by its ID.

**Endpoint:** `GET /jobs/:id`

**Authentication:** Not required

**Response:**
```json
{
  "success": true,
  "message": "Job retrieved successfully",
  "data": {
    "id": "job_id",
    "title": "Job Title",
    "type": "FULL_TIME",
    "description": "Job description",
    "requirements": ["Requirement 1", "Requirement 2"],
    "location": "Remote",
    "salary": "$80,000 - $100,000",
    "skills": [
      {
        "id": "skill_id",
        "name": "JavaScript"
      }
    ],
    "createdBy": {
      "id": "employer_id",
      "fullName": "Employer Name",
      "email": "employer@example.com"
    },
    "applications": [
      {
        "id": "application_id",
        "applicant": {
          "id": "applicant_id",
          "fullName": "Applicant Name",
          "email": "applicant@example.com"
        }
      }
    ],
    "_count": {
      "applications": 5
    }
  }
}
```

### Create a Job

Creates a new job posting (Employer/Admin only).

**Endpoint:** `POST /jobs`

**Authentication:** Required (Employer or Admin role)

**Request Body:**
```json
{
  "title": "Job Title",
  "type": "FULL_TIME",
  "description": "Job description",
  "requirements": ["Requirement 1", "Requirement 2"],
  "responsibilities": ["Responsibility 1", "Responsibility 2"],
  "location": "Remote",
  "aboutCompany": "About the company",
  "logo": "https://example.com/logo.png",
  "salary": "$80,000 - $100,000",
  "category": "Software Development",
  "featured": true,
  "skills": ["JavaScript", "React", "Node.js"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job created successfully",
  "data": {
    "id": "job_id",
    "title": "Job Title",
    "type": "FULL_TIME",
    "description": "Job description",
    "requirements": ["Requirement 1", "Requirement 2"],
    "location": "Remote",
    "salary": "$80,000 - $100,000",
    "skills": [
      {
        "id": "skill_id",
        "name": "JavaScript"
      },
      {
        "id": "skill_id",
        "name": "React"
      },
      {
        "id": "skill_id",
        "name": "Node.js"
      }
    ],
    "createdBy": {
      "id": "employer_id",
      "fullName": "Employer Name",
      "email": "employer@example.com"
    }
  }
}
```

### Update a Job

Updates an existing job (Owner or Admin only).

**Endpoint:** `PUT /jobs/:id`

**Authentication:** Required

**Request Body:**
```json
{
  "title": "Updated Job Title",
  "description": "Updated job description"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job updated successfully",
  "data": {
    "id": "job_id",
    "title": "Updated Job Title",
    "description": "Updated job description",
    "createdBy": {
      "id": "employer_id",
      "name": "Employer Name",
      "email": "employer@example.com"
    }
  }
}
```

### Delete a Job

Deletes a job posting (Owner or Admin only).

**Endpoint:** `DELETE /jobs/:id`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully"
}
```

## Applications Endpoints

### Apply for a Job

Submits an application for a job (Developer only).

**Endpoint:** `POST /applications/apply`

**Authentication:** Required (Developer role)

**Request Body:**
```json
{
  "id": "job_id",
  "data": {
    "coverLetter": "My cover letter",
    "salaryExpectation": "$80,000",
    "noticePeriod": "2 weeks",
    "resumeUrl": "https://example.com/resume.pdf"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": "application_id",
    "userId": "user_id",
    "jobId": "job_id",
    "resumeUrl": "https://example.com/resume.pdf",
    "coverLetter": "My cover letter",
    "salaryExpectation": "$80,000",
    "noticePeriod": "2 weeks",
    "status": "PENDING",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "job": {
      "id": "job_id",
      "title": "Job Title",
      "createdBy": {
        "id": "employer_id",
        "fullName": "Employer Name",
        "email": "employer@example.com"
      }
    },
    "applicant": {
      "id": "user_id",
      "fullName": "Applicant Name",
      "email": "applicant@example.com"
    }
  }
}
```

### Get User Applications

Retrieves all applications for the authenticated user.

**Endpoint:** `GET /applications/my-applications`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "User applications retrieved successfully",
  "data": [
    {
      "id": "application_id",
      "userId": "user_id",
      "jobId": "job_id",
      "status": "PENDING",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "job": {
        "id": "job_id",
        "title": "Job Title",
        "createdBy": {
          "id": "employer_id",
          "name": "Employer Name",
          "email": "employer@example.com"
        }
      }
    }
  ]
}
```

### Get Applications for a Job

Retrieves all applications for a specific job (Job owner or Admin only).

**Endpoint:** `GET /applications/job/:jobId`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Job applications retrieved successfully",
  "data": [
    {
      "id": "application_id",
      "userId": "user_id",
      "jobId": "job_id",
      "status": "PENDING",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "applicant": {
        "id": "user_id",
        "name": "Applicant Name",
        "email": "applicant@example.com"
      }
    }
  ]
}
```

### Update Application Status

Updates the status of an application (Job owner or Admin only).

**Endpoint:** `PATCH /applications/:id/status`

**Authentication:** Required

**Request Body:**
```json
{
  "status": "APPROVED"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application status updated successfully",
  "data": {
    "id": "application_id",
    "userId": "user_id",
    "jobId": "job_id",
    "status": "APPROVED",
    "job": {
      "id": "job_id",
      "title": "Job Title"
    },
    "applicant": {
      "id": "user_id",
      "name": "Applicant Name",
      "email": "applicant@example.com"
    }
  }
}
```

## Notifications Endpoints

### Get User Notifications

Retrieves all notifications for the authenticated user.

**Endpoint:** `GET /notifications`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Notifications retrieved successfully",
  "data": [
    {
      "id": "notification_id",
      "userId": "user_id",
      "type": "APPLICATION_STATUS_CHANGE",
      "message": "Your application status has been updated",
      "isRead": false,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "application": {
        "job": {
          "title": "Job Title"
        }
      }
    }
  ]
}
```

### Mark Notification as Read

Marks a specific notification as read.

**Endpoint:** `PATCH /notifications/:id/read`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "Notification marked as read",
  "data": {
    "id": "notification_id",
    "userId": "user_id",
    "type": "APPLICATION_STATUS_CHANGE",
    "message": "Your application status has been updated",
    "isRead": true,
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

### Mark All Notifications as Read

Marks all notifications for the user as read.

**Endpoint:** `PATCH /notifications/read-all`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### Clear All Notifications

Deletes all notifications for the user.

**Endpoint:** `DELETE /notifications`

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "message": "All notifications cleared"
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

**Common Error Codes:**
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: User doesn't have permission to access the resource
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate application)
- `500 Internal Server Error`: Server error

## Data Types

### User Roles
- `DEVELOPER`: Can apply for jobs
- `EMPLOYER`: Can post and manage jobs
- `ADMIN`: Can manage all resources

### Job Types
- `FULL_TIME`
- `PART_TIME`
- `CONTRACT`
- `INTERNSHIP`
- `REMOTE`

### Application Status
- `PENDING`: Initial status when application is submitted
- `APPROVED`: Application has been approved
- `REJECTED`: Application has been rejected

## WebSocket Events

The API supports real-time notifications through WebSocket connections:

- `new-application`: Sent to employers when a new application is submitted
- `application-status-changed`: Sent to applicants when their application status changes

## Pagination

Endpoints that return lists of resources support pagination through query parameters:
- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10)

Pagination metadata is included in the response:
```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```


# 🚀 TalentHub - Job Board API

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14+ | React framework with App Router, SSR, and API routes |
| **Backend** | Node.js + Express.js | RESTful API server with middleware support |
| **Database** | PostgreSQL + Prisma ORM | Relational database with type-safe query builder |
| **Deployment** | Docker + Render | Containerization and cloud deployment |
| **Database Hosting** | Neon | Serverless PostgreSQL platform |
| **Authentication** | JWT (JSON Web Tokens) | Secure token-based authentication |
| **Security** | Helmet.js + CORS | API security headers and cross-origin protection |
| **Logging** | Morgan | HTTP request logging |
| **Validation** | Express Validator | Request data validation |


