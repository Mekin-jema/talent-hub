# Job Board API Documentation

## Base URL
```
https://talent-hub-1-91qb.onrender.com/api/v1
```

## Authentication
Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## API Endpoints

### Authentication Routes (`/auth`)

#### Register a new user
- **URL**: `/auth/register`
- **Method**: `POST`
- **Authentication**: Not required
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe",
    "role": "DEVELOPER" // Optional, defaults to DEVELOPER
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "message": "User registered successfully",
    "data": {
      "token": "jwt_token_here",
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

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Authentication**: Not required
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Login successful",
    "data": {
      "token": "jwt_token_here",
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

#### Get current user
- **URL**: `/auth/me`
- **Method**: `GET`
- **Authentication**: Required
- **Success Response**: `200 OK`
  ```json
  {
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

#### Logout
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Authentication**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Logout successful"
  }
  ```

### Jobs Routes (`/jobs`)

#### Get all jobs
- **URL**: `/jobs`
- **Method**: `GET`
- **Authentication**: Not required
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Jobs retrieved successfully",
    "data": [
      {
        "id": "job_id",
        "title": "Job Title",
        "type": "FULL_TIME",
        "description": "Job description",
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
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
  ```

#### Get job by ID
- **URL**: `/jobs/:id`
- **Method**: `GET`
- **Authentication**: Not required
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Job retrieved successfully",
    "data": {
      "id": "job_id",
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
      "posted": "2023-01-01T00:00:00.000Z",
      "skills": [
        {
          "id": "skill_id",
          "name": "JavaScript",
          "jobId": "job_id"
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

#### Create a job (Employers only)
- **URL**: `/jobs`
- **Method**: `POST`
- **Authentication**: Required (Employer role)
- **Body**:
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
- **Success Response**: `201 Created`
  ```json
  {
    "message": "Job created successfully",
    "data": {
      "id": "job_id",
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
      "posted": "2023-01-01T00:00:00.000Z",
      "userId": "employer_id",
      "skills": [
        {
          "id": "skill_id",
          "name": "JavaScript",
          "jobId": "job_id"
        },
        {
          "id": "skill_id",
          "name": "React",
          "jobId": "job_id"
        },
        {
          "id": "skill_id",
          "name": "Node.js",
          "jobId": "job_id"
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

#### Update a job (Owner or Admin only)
- **URL**: `/jobs/:id`
- **Method**: `PUT`
- **Authentication**: Required
- **Body**:
  ```json
  {
    "title": "Updated Job Title",
    "description": "Updated job description"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
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

#### Delete a job (Owner or Admin only)
- **URL**: `/jobs/:id`
- **Method**: `DELETE`
- **Authentication**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Job deleted successfully"
  }
  ```

### Applications Routes (`/applications`)

#### Apply for a job (Developers only)
- **URL**: `/applications/apply`
- **Method**: `POST`
- **Authentication**: Required (Developer role)
- **Body**:
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
- **Success Response**: `201 Created`
  ```json
  {
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

#### Get all applications (Admin only)
- **URL**: `/applications`
- **Method**: `GET`
- **Authentication**: Required (Admin role)
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Success Response**: `200 OK`
  ```json
  {
    "message": "Applications retrieved successfully",
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
            "name": "Employer Name"
          }
        },
        "applicant": {
          "id": "user_id",
          "name": "Applicant Name",
          "email": "applicant@example.com"
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
  ```

#### Get user's applications
- **URL**: `/applications/user/:userId`
- **Method**: `GET`
- **Authentication**: Required (User can only view their own applications, Admin can view all)
- **Success Response**: `200 OK`
  ```json
  {
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

#### Get applications for a job
- **URL**: `/applications/job/:jobId`
- **Method**: `GET`
- **Authentication**: Required (Job owner or Admin only)
- **Success Response**: `200 OK`
  ```json
  {
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

#### Update application status
- **URL**: `/applications/:id/status`
- **Method**: `PUT`
- **Authentication**: Required (Job owner or Admin only)
- **Body**:
  ```json
  {
    "status": "APPROVED" // PENDING, APPROVED, REJECTED
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
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

### Notifications Routes (`/notifications`)

#### Get user notifications
- **URL**: `/notifications`
- **Method**: `GET`
- **Authentication**: Required
- **Success Response**: `200 OK`
  ```json
  {
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

#### Mark notification as read
- **URL**: `/notifications/:id/read`
- **Method**: `PATCH`
- **Authentication**: Required
- **Success Response**: `200 OK`
  ```json
  {
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

#### Mark all notifications as read
- **URL**: `/notifications/read-all`
- **Method**: `PATCH`
- **Authentication**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "message": "All notifications marked as read"
  }
  ```

#### Clear all notifications
- **URL**: `/notifications`
- **Method**: `DELETE`
- **Authentication**: Required
- **Success Response**: `200 OK`
  ```json
  {
    "message": "All notifications cleared"
  }
  ```

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication token
- `403 Forbidden`: User doesn't have permission to access the resource
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource already exists (e.g., duplicate application)
- `500 Internal Server Error`: Server error

Error response format:
```json
{
  "message": "Error description",
  "error": "Detailed error message (optional)"
}
```

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
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```