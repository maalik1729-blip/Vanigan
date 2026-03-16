# Vanigan WhatsApp Bot

Complete backend system for Vanigan Business Network WhatsApp bot built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Multi-language Support**: English, Tamil (தமிழ்), Hindi (हिंदी)
- **Business Directory**: 9 categories with subcategories
- **Organizer Network**: District and assembly-wise listings
- **Member Directory**: Community member management
- **Business Registration**: Step-by-step registration with photo upload and location
- **Subscription Plans**: Monthly (₹199), Yearly (₹1999), Lifetime (₹4999)
- **Local News**: District and assembly-wise news feed
- **State Machine**: Intelligent conversation flow management

## 📋 Prerequisites

- Node.js v16 or higher
- MongoDB (local or MongoDB Atlas)
- WhatsApp Business API account
- ngrok (for local testing)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/maalik1729-blip/Vanigan.git
cd Vanigan
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/vanigan
WHATSAPP_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_ID=your_phone_number_id
VERIFY_TOKEN=your_webhook_verify_token
WHATSAPP_WEBHOOK_URL=https://your-domain.com/webhook
```

### 4. Setup MongoDB

**Option A: MongoDB Atlas (Cloud)**
- Create account at https://mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Update `MONGODB_URI` in `.env`

**Option B: Local MongoDB**
- Install MongoDB Community Server
- Start MongoDB service
- Use default URI: `mongodb://localhost:27017/vanigan`

### 5. Seed Sample Data (Optional)

```bash
npm run seed
```

### 6. Start the Server

```bash
npm start
```

Server will run on http://localhost:3000

## 🔧 WhatsApp Setup

### 1. Create WhatsApp Business App

1. Go to https://developers.facebook.com
2. Create a developer account
3. Create new app (Business type)
4. Add WhatsApp product

### 2. Get Credentials

- Phone Number ID
- Access Token (create permanent token)
- Create Verify Token (any random string)

### 3. Configure Webhook

For local testing, use ngrok:

```bash
# Install ngrok
npm install -g ngrok

# Authenticate (get token from ngrok.com)
ngrok config add-authtoken YOUR_TOKEN

# Start ngrok
ngrok http 3000
```

Copy the HTTPS URL and configure in Meta Developer Console:
- Webhook URL: `https://your-ngrok-url.ngrok.io/webhook`
- Verify Token: (same as in .env)
- Subscribe to: messages

## 📁 Project Structure

```
Vanigan/
├── config/              # Configuration files
├── controllers/         # Request handlers
├── middleware/          # Express middleware
├── models/             # MongoDB schemas
├── routes/             # API routes
├── scripts/            # Utility scripts
├── services/           # Business logic
├── utils/              # Helper functions
├── .env.example        # Environment template
├── package.json        # Dependencies
└── server.js           # Entry point
```

## 🔌 API Endpoints

### Business
- `GET /api/business/categories` - Get all categories
- `GET /api/business/list` - Get businesses
- `POST /api/business/add` - Add new business

### Organizer
- `GET /api/organizer/list` - Get organizers
- `POST /api/organizer/add` - Add organizer

### Member
- `GET /api/member/list` - Get members
- `POST /api/member/add` - Add member

### News
- `GET /api/news/list` - Get news
- `POST /api/news/add` - Add news

### Subscription
- `GET /api/subscription/plans` - Get plans
- `POST /api/subscription/create` - Create subscription

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

## 💬 Bot Conversation Flow

```
Entry → Language Selection → Welcome → Main Menu
  ↓
  ├─ Business List → Category → Subcategory → List → Details
  ├─ Organizer List → District → Assembly → List → Details
  ├─ Member List → District → Assembly → List → Details
  ├─ Add Business → Form Steps → Photos → Location → Confirmation
  ├─ Subscription → Plans → Payment
  └─ News → District → Assembly → List → Details
```

## 🧪 Testing

```bash
# Send test message to WhatsApp bot
# Bot should respond with language selection

# Test API endpoints
curl http://localhost:3000/api/business/categories
```

See [TESTING.md](TESTING.md) for detailed testing guide.

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment instructions.

Recommended platforms:
- Heroku
- Railway
- DigitalOcean
- AWS

## 📚 Documentation

- [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) - Detailed setup guide
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [TESTING.md](TESTING.md) - Testing strategies
- [FEATURES.md](FEATURES.md) - Feature list
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

## 🔒 Security

- Rate limiting enabled
- Helmet.js security headers
- CORS protection
- Input validation
- Environment variable management

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 👥 Author

**Maalik**
- Email: maalik1729@gmail.com
- GitHub: [@maalik1729-blip](https://github.com/maalik1729-blip)

## 🙏 Acknowledgments

- WhatsApp Cloud API
- MongoDB
- Express.js
- Node.js community

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check documentation files
- Review API documentation

## 🗺️ Roadmap

- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Business verification workflow
- [ ] Search functionality
- [ ] Reviews and ratings
- [ ] Analytics dashboard

---

Made with ❤️ for Vanigan Business Network
