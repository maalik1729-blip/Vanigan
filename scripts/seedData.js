require('dotenv').config();
const mongoose = require('mongoose');
const Business = require('../models/Business');
const Organizer = require('../models/Organizer');
const Member = require('../models/Member');
const News = require('../models/News');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function seedData() {
  try {
    // Sample Businesses
    const businesses = [
      {
        name: 'Sri Murugan Hotel',
        ownerName: 'Murugan',
        phone: '9876543210',
        category: 'hotel',
        subCategory: 'Restaurant',
        address: 'T Nagar, Chennai',
        district: 'Chennai',
        assembly: 'T Nagar',
        location: { latitude: 13.0418, longitude: 80.2341 },
        verified: true
      },
      {
        name: 'Amma Fast Food',
        ownerName: 'Kumar',
        phone: '9876543211',
        category: 'hotel',
        subCategory: 'Fast Food',
        address: 'Velachery, Chennai',
        district: 'Chennai',
        assembly: 'Velachery',
        verified: true
      },
      {
        name: 'Chennai Bakery',
        ownerName: 'Ravi',
        phone: '9876543212',
        category: 'hotel',
        subCategory: 'Bakery',
        address: 'Mylapore, Chennai',
        district: 'Chennai',
        assembly: 'Mylapore',
        verified: true
      }
    ];

    await Business.insertMany(businesses);
    console.log('Businesses seeded');

    // Sample Organizers
    const organizers = [
      {
        name: 'Rajesh',
        phone: '9876543220',
        district: 'Chennai',
        assembly: 'T Nagar',
        area: 'T Nagar Central'
      },
      {
        name: 'Karthik',
        phone: '9876543221',
        district: 'Chennai',
        assembly: 'Velachery',
        area: 'Velachery East'
      },
      {
        name: 'Senthil',
        phone: '9876543222',
        district: 'Chennai',
        assembly: 'Mylapore',
        area: 'Mylapore West'
      }
    ];

    await Organizer.insertMany(organizers);
    console.log('Organizers seeded');

    // Sample Members
    const members = [
      {
        name: 'Kumar',
        phone: '9876543230',
        businessName: 'Mobile Shop',
        district: 'Chennai',
        assembly: 'Velachery',
        location: 'Velachery Main Road'
      },
      {
        name: 'Vijay',
        phone: '9876543231',
        businessName: 'Electronics Store',
        district: 'Chennai',
        assembly: 'T Nagar',
        location: 'Ranganathan Street'
      }
    ];

    await Member.insertMany(members);
    console.log('Members seeded');

    // Sample News
    const news = [
      {
        title: 'Market Opening Event',
        description: 'New wholesale market opening in T Nagar on March 20, 2026.',
        district: 'Chennai',
        assembly: 'T Nagar',
        date: new Date('2026-03-20')
      },
      {
        title: 'Business Meet Announcement',
        description: 'Monthly business networking meet scheduled for March 25, 2026.',
        district: 'Chennai',
        assembly: 'Velachery',
        date: new Date('2026-03-25')
      },
      {
        title: 'Government Scheme for Traders',
        description: 'New subsidy scheme announced for small business owners.',
        district: 'Chennai',
        assembly: 'Mylapore',
        date: new Date('2026-03-18')
      }
    ];

    await News.insertMany(news);
    console.log('News seeded');

    console.log('All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seedData();
