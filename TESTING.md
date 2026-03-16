# Testing Guide

## Manual Testing with WhatsApp

### Setup
1. Start the server locally
2. Use ngrok to expose local server:
```bash
ngrok http 3000
```
3. Configure webhook in Meta Developer Console with ngrok URL
4. Send test messages from WhatsApp

### Test Scenarios

#### 1. Language Selection
- Send "Hi" to bot
- Bot should respond with language options
- Reply with "1" for English
- Verify welcome message appears

#### 2. Business List Flow
- Select option 1 (Business List)
- Select category (e.g., 1 for Hotel)
- Select subcategory (e.g., 1 for Restaurant)
- Verify business list appears
- Select a business to view details

#### 3. Organizer List Flow
- Select option 2 (Organizer List)
- Select district
- Select assembly
- Verify organizer list appears
- Select organizer to view details

#### 4. Add Business Flow
- Select option 4 (Add Business)
- Enter business name
- Enter owner name
- Enter phone number
- Select category
- Enter address
- Upload photos (optional)
- Share location
- Verify confirmation message

#### 5. Subscription Flow
- Select option 5 (Subscription)
- View plan details
- Verify pricing information

#### 6. News Flow
- Select option 6 (News)
- Select district
- Select assembly
- View news list
- Select news item to read

#### 7. Global Commands
- Type "MENU" at any point
- Verify return to main menu
- Type "BACK" during navigation
- Verify return to previous state

## API Testing with Postman

### Import Collection
Create Postman collection with all API endpoints.

### Test Cases

#### Get Categories
```
GET http://localhost:3000/api/business/categories
```
Expected: Array of categories with subcategories

#### Get Businesses
```
GET http://localhost:3000/api/business/list?category=hotel&subCategory=Restaurant
```
Expected: Array of businesses

#### Add Business
```
POST http://localhost:3000/api/business/add
Content-Type: application/json

{
  "name": "Test Restaurant",
  "ownerName": "Test Owner",
  "phone": "9876543210",
  "category": "hotel",
  "subCategory": "Restaurant",
  "address": "Test Address, Chennai"
}
```
Expected: 201 Created with business object

## Database Testing

### Seed Test Data
```bash
npm run seed
```

### Verify Data
```bash
mongosh
use vanigan
db.businesses.find()
db.organizers.find()
db.members.find()
db.news.find()
```

## Load Testing

Use tools like Apache Bench or Artillery:

```bash
ab -n 1000 -c 10 http://localhost:3000/api/business/categories
```

## Error Testing

### Invalid Input
- Send invalid phone numbers
- Send invalid category IDs
- Send malformed JSON

### Edge Cases
- Empty database queries
- Missing required fields
- Very long text inputs
- Special characters in inputs

## Webhook Testing

### Verify Webhook
```bash
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.verify_token=your_token&hub.challenge=test123"
```
Expected: Returns "test123"

### Send Test Message
```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "value": {
          "messages": [{
            "from": "919876543210",
            "type": "text",
            "text": { "body": "Hi" }
          }]
        }
      }]
    }]
  }'
```

## Monitoring

### Check Logs
```bash
tail -f logs/app.log
```

### Monitor Database
```bash
mongosh
use vanigan
db.users.find().count()
db.businesses.find({ verified: false }).count()
```

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- Supertest for API tests
- Mocha/Chai for integration tests
