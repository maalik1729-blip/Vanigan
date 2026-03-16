# API Documentation

Base URL: `http://localhost:3000` (development)

## Webhook Endpoints

### Verify Webhook
```
GET /webhook
```
Query Parameters:
- `hub.mode`: subscribe
- `hub.verify_token`: Your verify token
- `hub.challenge`: Challenge string

Response: Returns challenge string

### Receive Messages
```
POST /webhook
```
Receives WhatsApp messages from Meta API.

## Business Endpoints

### Get Categories
```
GET /api/business/categories
```
Returns list of business categories with subcategories.

### Get Subcategories
```
GET /api/business/subcategories/:category
```
Parameters:
- `category`: Category ID

### Get Businesses
```
GET /api/business/list
```
Query Parameters:
- `category`: Filter by category
- `subCategory`: Filter by subcategory
- `district`: Filter by district
- `assembly`: Filter by assembly

### Get Business Details
```
GET /api/business/:id
```
Parameters:
- `id`: Business ID

### Add Business
```
POST /api/business/add
```
Body:
```json
{
  "name": "Business Name",
  "ownerName": "Owner Name",
  "phone": "9876543210",
  "category": "hotel",
  "subCategory": "Restaurant",
  "address": "Full Address",
  "district": "Chennai",
  "assembly": "T Nagar",
  "location": {
    "latitude": 13.0418,
    "longitude": 80.2341
  },
  "photos": ["url1", "url2"]
}
```

## Organizer Endpoints

### Get Organizers
```
GET /api/organizer/list
```
Query Parameters:
- `district`: Filter by district
- `assembly`: Filter by assembly

### Get Organizer Details
```
GET /api/organizer/:id
```

### Add Organizer
```
POST /api/organizer/add
```
Body:
```json
{
  "name": "Organizer Name",
  "phone": "9876543210",
  "district": "Chennai",
  "assembly": "T Nagar",
  "area": "Area Name"
}
```

## Member Endpoints

### Get Members
```
GET /api/member/list
```
Query Parameters:
- `district`: Filter by district
- `assembly`: Filter by assembly

### Get Member Details
```
GET /api/member/:id
```

### Add Member
```
POST /api/member/add
```
Body:
```json
{
  "name": "Member Name",
  "phone": "9876543210",
  "businessName": "Business Name",
  "district": "Chennai",
  "assembly": "T Nagar",
  "location": "Location"
}
```

## News Endpoints

### Get News
```
GET /api/news/list
```
Query Parameters:
- `district`: Filter by district
- `assembly`: Filter by assembly

### Get News Details
```
GET /api/news/:id
```

### Add News
```
POST /api/news/add
```
Body:
```json
{
  "title": "News Title",
  "description": "News Description",
  "district": "Chennai",
  "assembly": "T Nagar",
  "date": "2026-03-16"
}
```

## Subscription Endpoints

### Get Plans
```
GET /api/subscription/plans
```
Returns available subscription plans.

### Create Subscription
```
POST /api/subscription/create
```
Body:
```json
{
  "phoneNumber": "919876543210",
  "plan": "monthly"
}
```

### Get Subscription
```
GET /api/subscription/:phoneNumber
```
Returns active subscription for phone number.

### Update Subscription Status
```
PUT /api/subscription/:id/status
```
Body:
```json
{
  "status": "active",
  "paymentId": "payment_123"
}
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message"
}
```

Status Codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error
