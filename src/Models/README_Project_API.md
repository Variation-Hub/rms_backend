# Project Management API Documentation

## Overview
The Project Management API provides comprehensive CRUD operations for managing projects in the Resource Management System. Projects can be of type CIR (Contractor Independent Resource) or ACR (Agency Contract Resource).

## Base URL
```
/project
```

## Authentication
All endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### 1. Create Project
**POST** `/projects`

Creates a new project with the specified details.

#### Request Body
```json
{
  "projectName": "Web Development Project",
  "publishedDate": "2024-01-15T00:00:00.000Z",
  "client": "Tech Solutions Inc",
  "clientLocation": "London, UK",
  "workType": "Full-time",
  "dayRatesRange": {
    "min": 400,
    "max": 600
  },
  "noOfPositions": 3,
  "clearanceOrCertifications": ["Security Clearance", "AWS Certified"],
  "status": "Active",
  "type": "CIR"
}
```

#### Response
```json
{
  "message": "Project created successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "projectName": "Web Development Project",
    "publishedDate": "2024-01-15T00:00:00.000Z",
    "client": "Tech Solutions Inc",
    "clientLocation": "London, UK",
    "workType": "Full-time",
    "dayRatesRange": {
      "min": 400,
      "max": 600
    },
    "noOfPositions": 3,
    "clearanceOrCertifications": ["Security Clearance", "AWS Certified"],
    "status": "Active",
    "type": "CIR",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "createdBy": "507f1f77bcf86cd799439012",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "updatedBy": "507f1f77bcf86cd799439012"
  }
}
```

### 2. Get All Projects
**GET** `/projects`

Retrieves all projects with pagination and filtering options.

#### Query Parameters
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `projectName` (optional): Filter by project name (partial match, case-insensitive)
- `client` (optional): Filter by client name (partial match, case-insensitive)
- `status` (optional): Filter by status (Active, Future Role, Expired, or All)
- `type` (optional): Filter by type (CIR, ACR, or All)
- `workType` (optional): Filter by work type (partial match, case-insensitive)
- `isActive` (optional): Filter by active status (true/false)
- `startDate` (optional): Filter by published date range start (YYYY-MM-DD)
- `endDate` (optional): Filter by published date range end (YYYY-MM-DD)
- `minDayRate` (optional): Filter by minimum day rate
- `maxDayRate` (optional): Filter by maximum day rate

#### Example Request
```
GET /projects?page=1&limit=10&status=Active&type=CIR&minDayRate=300
```

#### Response
```json
{
  "message": "Projects fetched successfully",
  "status": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "projectName": "Web Development Project",
      "publishedDate": "2024-01-15T00:00:00.000Z",
      "client": "Tech Solutions Inc",
      "clientLocation": "London, UK",
      "workType": "Full-time",
      "dayRatesRange": {
        "min": 400,
        "max": 600
      },
      "noOfPositions": 3,
      "clearanceOrCertifications": ["Security Clearance", "AWS Certified"],
      "status": "Active",
      "type": "CIR",
      "isActive": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "updatedAt": "2024-01-15T10:30:00.000Z",
      "updatedBy": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  ],
  "meta_data": {
    "page": 1,
    "items": 25,
    "page_size": 10,
    "pages": 3
  }
}
```

### 3. Get Project by ID
**GET** `/projects/:id`

Retrieves a specific project by its ID.

#### Path Parameters
- `id`: Project ID

#### Example Request
```
GET /projects/507f1f77bcf86cd799439011
```

#### Response
```json
{
  "message": "Project fetched successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "projectName": "Web Development Project",
    "publishedDate": "2024-01-15T00:00:00.000Z",
    "client": "Tech Solutions Inc",
    "clientLocation": "London, UK",
    "workType": "Full-time",
    "dayRatesRange": {
      "min": 400,
      "max": 600
    },
    "noOfPositions": 3,
    "clearanceOrCertifications": ["Security Clearance", "AWS Certified"],
    "status": "Active",
    "type": "CIR",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "updatedBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 4. Update Project
**PUT** `/projects/:id`

Updates an existing project with new information.

#### Path Parameters
- `id`: Project ID

#### Request Body
```json
{
  "projectName": "Updated Web Development Project",
  "dayRatesRange": {
    "min": 450,
    "max": 650
  },
  "noOfPositions": 4
}
```

#### Response
```json
{
  "message": "Project updated successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "projectName": "Updated Web Development Project",
    "publishedDate": "2024-01-15T00:00:00.000Z",
    "client": "Tech Solutions Inc",
    "clientLocation": "London, UK",
    "workType": "Full-time",
    "dayRatesRange": {
      "min": 450,
      "max": 650
    },
    "noOfPositions": 4,
    "clearanceOrCertifications": ["Security Clearance", "AWS Certified"],
    "status": "Active",
    "type": "CIR",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "createdBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "updatedAt": "2024-01-15T11:00:00.000Z",
    "updatedBy": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Jane Smith",
      "email": "jane@example.com"
    }
  }
}
```

### 5. Delete Project (Soft Delete)
**DELETE** `/projects/:id`

Soft deletes a project by setting `isActive` to false.

#### Path Parameters
- `id`: Project ID

#### Response
```json
{
  "message": "Project deleted successfully",
  "status": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "isActive": false,
    "updatedBy": "507f1f77bcf86cd799439013"
  }
}
```

### 6. Hard Delete Project
**DELETE** `/projects/:id/permanent`

Permanently removes a project from the database.

#### Path Parameters
- `id`: Project ID

#### Response
```json
{
  "message": "Project permanently deleted",
  "status": true,
  "data": null
}
```

### 7. Get Project Statistics
**GET** `/projects/stats`

Retrieves comprehensive statistics about all projects.

#### Response
```json
{
  "message": "Project statistics fetched successfully",
  "status": true,
  "data": {
    "totalProjects": 150,
    "activeProjects": 85,
    "futureRoleProjects": 45,
    "expiredProjects": 20,
    "cirProjects": 90,
    "acrProjects": 60,
    "totalPositions": 450,
    "avgMinDayRate": 425.5,
    "avgMaxDayRate": 675.2
  }
}
```

### 8. Bulk Update Project Status
**PUT** `/projects/bulk/status`

Updates the status of multiple projects at once.

#### Request Body
```json
{
  "projectIds": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013"
  ],
  "status": "Expired"
}
```

#### Response
```json
{
  "message": "3 projects updated successfully",
  "status": true,
  "data": {
    "modifiedCount": 3,
    "matchedCount": 3
  }
}
```

## Data Model

### Project Schema
```typescript
interface IProject {
  projectName: string;                    // Required: Project name
  publishedDate: Date;                    // Required: When the project was published
  client: string;                         // Required: Client name
  clientLocation: string;                 // Required: Client location
  workType: string;                       // Required: Type of work (Full-time, Part-time, etc.)
  dayRatesRange: {                        // Required: Day rate range
    min: number;                          // Minimum day rate
    max: number;                          // Maximum day rate
  };
  noOfPositions: number;                  // Required: Number of positions available
  clearanceOrCertifications: string[];    // Optional: Required clearances/certifications
  status: 'Active' | 'Future Role' | 'Expired';  // Required: Project status
  type: 'CIR' | 'ACR';                   // Required: Project type
  isActive: boolean;                      // Default: true
  createdAt: Date;                        // Auto-generated
  createdBy: ObjectId;                    // Required: User who created the project
  updatedAt: Date;                        // Auto-generated
  updatedBy: ObjectId;                    // Required: User who last updated the project
}
```

## Validation Rules

1. **Project Name**: Required, trimmed
2. **Published Date**: Required, valid date
3. **Client**: Required, trimmed
4. **Client Location**: Required, trimmed
5. **Work Type**: Required, trimmed
6. **Day Rates Range**: 
   - Both min and max are required
   - Must be non-negative numbers
   - Min cannot be greater than max
7. **Number of Positions**: Required, minimum value of 1
8. **Status**: Must be one of: 'Active', 'Future Role', 'Expired'
9. **Type**: Must be one of: 'CIR', 'ACR'
10. **Clearance/Certifications**: Array of strings, optional

## Error Handling

All endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "status": false,
  "data": null
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `404`: Not Found
- `500`: Internal Server Error

## Filtering Examples

### Filter by Project Name (Partial Match)
```
GET /projects?projectName=web
```
Returns projects with "web" in the project name (case-insensitive)

### Filter by Date Range
```
GET /projects?startDate=2024-01-01&endDate=2024-01-31
```
Returns projects published between January 1-31, 2024

### Filter by Day Rate Range
```
GET /projects?minDayRate=400&maxDayRate=600
```
Returns projects where the day rate range overlaps with 400-600

### Filter by Multiple Criteria
```
GET /projects?status=Active&type=CIR&isActive=true&page=1&limit=20
```
Returns active CIR projects, paginated with 20 items per page

## Performance Features

1. **Database Indexing**: Optimized indexes on frequently queried fields
2. **Pagination**: Built-in pagination support for large datasets
3. **Population**: Automatic population of user details for createdBy/updatedBy fields
4. **Validation**: Pre-save and pre-update middleware for data integrity
5. **Filtering**: Efficient MongoDB query building with regex support

## Security Features

1. **Authentication**: JWT token-based authentication required for all endpoints
2. **Authorization**: Role-based access control
3. **Input Validation**: Comprehensive validation of all input data
4. **Audit Trail**: Tracking of who created and last updated each project
5. **Soft Delete**: Option to soft delete projects instead of permanent removal
