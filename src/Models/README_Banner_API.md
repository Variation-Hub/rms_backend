# Banner Text API Documentation

## Overview
The Banner Text API allows you to manage banner text content for different pages in your application. It supports creating, updating, and retrieving banner text based on page types.

## Model Structure
```typescript
interface IBannerText {
    page_type: string;    // Unique identifier for the page
    content: string;      // The banner text content
    createdAt: Date;      // Creation timestamp
    updatedAt: Date;      // Last update timestamp
}
```

## API Endpoints

### 1. Create or Update Banner Text
**POST** `/api/v1/banner/`

Creates a new banner text or updates existing one if page_type already exists.

**Request Body:**
```json
{
    "page_type": "home",
    "content": "Welcome to our application!"
}
```

**Response:**
```json
{
    "message": "Banner text created successfully",
    "status": true,
    "data": {
        "_id": "...",
        "page_type": "home",
        "content": "Welcome to our application!",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
}
```

### 2. Get Banner Text by Page Type
**GET** `/api/v1/banner/page/:page_type`

Retrieves banner text for a specific page type.

**Example:** `/api/v1/banner/page/home`

**Response:**
```json
{
    "message": "Banner text retrieved successfully",
    "status": true,
    "data": {
        "_id": "...",
        "page_type": "home",
        "content": "Welcome to our application!",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
    }
}
```

### 3. Get All Banner Texts
**GET** `/api/v1/banner/`

Retrieves all banner texts with pagination and search functionality.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `keyword` (optional): Search in page_type or content

**Example:** `/api/v1/banner/?page=1&limit=10&keyword=home`

**Response:**
```json
{
    "message": "Banner texts retrieved successfully",
    "status": true,
    "data": [
        {
            "_id": "...",
            "page_type": "home",
            "content": "Welcome to our application!",
            "createdAt": "2024-01-01T00:00:00.000Z",
            "updatedAt": "2024-01-01T00:00:00.000Z"
        }
    ],
    "meta_data": {
        "page": 1,
        "items": 1,
        "page_size": 10,
        "pages": 1
    }
}
```

### 4. Update Banner Text by ID
**PUT** `/api/v1/banner/:id`

Updates a specific banner text by its ID.

**Request Body:**
```json
{
    "page_type": "home",
    "content": "Updated welcome message!"
}
```

### 5. Delete Banner Text by ID
**DELETE** `/api/v1/banner/:id`

Deletes a specific banner text by its ID.

**Response:**
```json
{
    "message": "Banner text deleted successfully",
    "status": true,
    "data": null
}
```

## Usage Examples

### Frontend Integration
```javascript
// Get banner text for home page
const getBannerText = async (pageType) => {
    try {
        const response = await fetch(`/api/v1/banner/page/${pageType}`);
        const data = await response.json();
        return data.data?.content || '';
    } catch (error) {
        console.error('Error fetching banner text:', error);
        return '';
    }
};

// Create or update banner text
const saveBannerText = async (pageType, content) => {
    try {
        const response = await fetch('/api/v1/banner/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token'
            },
            body: JSON.stringify({ page_type: pageType, content })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving banner text:', error);
        throw error;
    }
};
```

## Authentication
- Create, Update, and Delete operations require authentication (Bearer token)
- Get operations are public and don't require authentication

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
- 200: Success
- 201: Created
- 400: Bad Request (missing required fields)
- 401: Unauthorized (missing or invalid token)
- 404: Not Found
- 500: Internal Server Error
