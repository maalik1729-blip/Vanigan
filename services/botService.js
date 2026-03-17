const User = require('../models/User');
const Business = require('../models/Business');
const Organizer = require('../models/Organizer');
const Member = require('../models/Member');
const News = require('../models/News');
const whatsappService = require('./whatsappService');
const { STATES, CATEGORIES, DISTRICTS } = require('../config/constants');
const mongoose = require('mongoose');

// Check if database is connected
const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

exports.processMessage = async (phoneNumber, message, location, rawMessage) => {
  try {
    // Check database connection
    if (!isDatabaseConnected()) {
      console.log('Database not connected, sending fallback message');
      await whatsappService.sendMessage(
        phoneNumber, 
        'Sorry, the service is currently unavailable. Please try again later.'
      );
      return;
    }

    let user = await User.findOne({ phoneNumber });
    
    if (!user) {
      user = new User({ phoneNumber, currentState: STATES.LANGUAGE_SELECT });
      await user.save();
    }

    // Global commands
    if (message.toUpperCase() === 'MENU') {
      user.currentState = STATES.MAIN_MENU;
      user.stateData = {};
      await user.save();
      return await sendMainMenu(phoneNumber, user.language);
    }

    if (message.toUpperCase() === 'BACK') {
      return await handleBack(user);
    }

    // State machine
    switch (user.currentState) {
      case STATES.LANGUAGE_SELECT:
        await handleLanguageSelect(user, message);
        break;
      case STATES.WELCOME:
        await handleWelcome(user, message);
        break;
      case STATES.MAIN_MENU:
        await handleMainMenu(user, message);
        break;
      case STATES.BUSINESS_CATEGORY:
        await handleBusinessCategory(user, message);
        break;
      case STATES.BUSINESS_SUBCATEGORY:
        await handleBusinessSubCategory(user, message);
        break;
      case STATES.BUSINESS_LIST:
        await handleBusinessList(user, message);
        break;
      case STATES.ORGANIZER_DISTRICT:
        await handleOrganizerDistrict(user, message);
        break;
      case STATES.ORGANIZER_ASSEMBLY:
        await handleOrganizerAssembly(user, message);
        break;
      case STATES.ORGANIZER_LIST:
        await handleOrganizerList(user, message);
        break;
      case STATES.MEMBER_DISTRICT:
        await handleMemberDistrict(user, message);
        break;
      case STATES.MEMBER_ASSEMBLY:
        await handleMemberAssembly(user, message);
        break;
      case STATES.MEMBER_LIST:
        await handleMemberList(user, message);
        break;
      case STATES.ADD_BUSINESS_NAME:
        await handleAddBusinessName(user, message);
        break;
      case STATES.ADD_BUSINESS_OWNER:
        await handleAddBusinessOwner(user, message);
        break;
      case STATES.ADD_BUSINESS_PHONE:
        await handleAddBusinessPhone(user, message);
        break;
      case STATES.ADD_BUSINESS_CATEGORY:
        await handleAddBusinessCategory(user, message);
        break;
      case STATES.ADD_BUSINESS_ADDRESS:
        await handleAddBusinessAddress(user, message);
        break;
      case STATES.ADD_BUSINESS_PHOTOS:
        await handleAddBusinessPhotos(user, message, rawMessage);
        break;
      case STATES.ADD_BUSINESS_LOCATION:
        await handleAddBusinessLocation(user, message, location);
        break;
      case STATES.SUBSCRIPTION_MENU:
        await handleSubscriptionMenu(user, message);
        break;
      case STATES.NEWS_DISTRICT:
        await handleNewsDistrict(user, message);
        break;
      case STATES.NEWS_ASSEMBLY:
        await handleNewsAssembly(user, message);
        break;
      case STATES.NEWS_LIST:
        await handleNewsList(user, message);
        break;
      default:
        await sendMainMenu(phoneNumber, user.language);
    }
  } catch (error) {
    console.error('Bot service error:', error);
    await whatsappService.sendMessage(phoneNumber, 'An error occurred. Type MENU to restart.');
  }
};

// Language Selection
async function handleLanguageSelect(user, message) {
  const languages = { 
    '1': 'english', 
    '2': 'tamil', 
    '3': 'hindi',
    'en': 'english',
    'ta': 'tamil',
    'hi': 'hindi',
    'english': 'english',
    'tamil': 'tamil',
    'hindi': 'hindi'
  };
  const selectedLang = languages[message.toLowerCase()];
  
  if (selectedLang) {
    user.language = selectedLang;
    user.currentState = STATES.WELCOME;
    await user.save();
    await sendWelcomeMessage(user.phoneNumber, selectedLang);
  } else {
    const buttons = [
      { id: 'en', title: '🇬🇧 English' },
      { id: 'ta', title: '🇮🇳 தமிழ்' },
      { id: 'hi', title: '🇮🇳 हिंदी' }
    ];
    await whatsappService.sendButtons(
      user.phoneNumber,
      '🌐 *Choose Your Language*\n\nPlease select your preferred language:',
      buttons
    );
  }
}

// Welcome Message
async function sendWelcomeMessage(phoneNumber, language) {
  const msg = `Welcome to Vanigan App\n\nVanigan helps you:\n✔ Find Businesses\n✔ Connect with Organizers\n✔ View Members\n✔ Add Your Business\n✔ View Local News\n\nPlease choose an option`;
  await whatsappService.sendMessage(phoneNumber, msg);
  await sendMainMenu(phoneNumber, language);
}

async function handleWelcome(user, message) {
  await sendMainMenu(user.phoneNumber, user.language);
}

// Main Menu
async function sendMainMenu(phoneNumber, language) {
  const buttons = [
    { id: 'business', title: '🏢 Business List' },
    { id: 'organizer', title: '👥 Organizer List' },
    { id: 'members', title: '👤 Members List' }
  ];
  
  await whatsappService.sendButtons(
    phoneNumber,
    '📱 *Vanigan Main Menu*\n\nChoose an option:',
    buttons
  );
  
  // Send additional options as a second message
  const moreButtons = [
    { id: 'add_business', title: '➕ Add Business' },
    { id: 'subscription', title: '💳 Subscription' },
    { id: 'news', title: '📰 News' }
  ];
  
  await whatsappService.sendButtons(
    phoneNumber,
    'More options:',
    moreButtons
  );
}

async function handleMainMenu(user, message) {
  const options = {
    '1': STATES.BUSINESS_CATEGORY,
    '2': STATES.ORGANIZER_DISTRICT,
    '3': STATES.MEMBER_DISTRICT,
    '4': STATES.ADD_BUSINESS_NAME,
    '5': STATES.SUBSCRIPTION_MENU,
    '6': STATES.NEWS_DISTRICT,
    'business': STATES.BUSINESS_CATEGORY,
    'organizer': STATES.ORGANIZER_DISTRICT,
    'members': STATES.MEMBER_DISTRICT,
    'add_business': STATES.ADD_BUSINESS_NAME,
    'subscription': STATES.SUBSCRIPTION_MENU,
    'news': STATES.NEWS_DISTRICT
  };

  const nextState = options[message.toLowerCase()];
  if (nextState) {
    user.currentState = nextState;
    user.stateData = {};
    await user.save();

    switch (nextState) {
      case STATES.BUSINESS_CATEGORY:
        await sendBusinessCategories(user.phoneNumber);
        break;
      case STATES.ORGANIZER_DISTRICT:
        await sendDistricts(user.phoneNumber, 'organizer');
        break;
      case STATES.MEMBER_DISTRICT:
        await sendDistricts(user.phoneNumber, 'member');
        break;
      case STATES.ADD_BUSINESS_NAME:
        await whatsappService.sendMessage(user.phoneNumber, 'Add Your Business\n\nStep 1/5\nEnter Business Name:');
        break;
      case STATES.SUBSCRIPTION_MENU:
        await sendSubscriptionMenu(user.phoneNumber);
        break;
      case STATES.NEWS_DISTRICT:
        await sendDistricts(user.phoneNumber, 'news');
        break;
    }
  } else {
    await sendMainMenu(user.phoneNumber, user.language);
  }
}

// Business Flow
async function sendBusinessCategories(phoneNumber) {
  let msg = 'Business Directory\nPlease select category\n\n';
  CATEGORIES.forEach((cat, idx) => {
    msg += `${idx + 1}️⃣ ${cat.name}\n`;
  });
  msg += '0️⃣ Back';
  await whatsappService.sendMessage(phoneNumber, msg);
}

async function handleBusinessCategory(user, message) {
  if (message === '0') {
    user.currentState = STATES.MAIN_MENU;
    await user.save();
    return await sendMainMenu(user.phoneNumber, user.language);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < CATEGORIES.length) {
    user.stateData.category = CATEGORIES[idx].id;
    user.currentState = STATES.BUSINESS_SUBCATEGORY;
    await user.save();
    await sendBusinessSubCategories(user.phoneNumber, CATEGORIES[idx]);
  } else {
    await sendBusinessCategories(user.phoneNumber);
  }
}

async function sendBusinessSubCategories(phoneNumber, category) {
  let msg = `Select Sub Category\n\n`;
  category.subCategories.forEach((sub, idx) => {
    msg += `${idx + 1}️⃣ ${sub}\n`;
  });
  msg += '0️⃣ Back';
  await whatsappService.sendMessage(phoneNumber, msg);
}

async function handleBusinessSubCategory(user, message) {
  if (message === '0') {
    user.currentState = STATES.BUSINESS_CATEGORY;
    await user.save();
    return await sendBusinessCategories(user.phoneNumber);
  }

  const category = CATEGORIES.find(c => c.id === user.stateData.category);
  const idx = parseInt(message) - 1;
  
  if (idx >= 0 && idx < category.subCategories.length) {
    user.stateData.subCategory = category.subCategories[idx];
    user.currentState = STATES.BUSINESS_LIST;
    await user.save();
    await sendBusinessList(user);
  } else {
    await sendBusinessSubCategories(user.phoneNumber, category);
  }
}

async function sendBusinessList(user) {
  const businesses = await Business.find({
    category: user.stateData.category,
    subCategory: user.stateData.subCategory,
    verified: true
  }).limit(10);

  if (businesses.length === 0) {
    await whatsappService.sendMessage(user.phoneNumber, 'No businesses found.\n\n0️⃣ Back to categories');
    return;
  }

  let msg = 'Businesses Found\n\n';
  businesses.forEach((biz, idx) => {
    msg += `${idx + 1}️⃣ ${biz.name}\n`;
  });
  msg += '\nReply with number to view details\n0️⃣ Back';
  
  user.stateData.businesses = businesses.map(b => b._id.toString());
  await user.save();
  await whatsappService.sendMessage(user.phoneNumber, msg);
}

async function handleBusinessList(user, message) {
  if (message === '0') {
    user.currentState = STATES.BUSINESS_SUBCATEGORY;
    await user.save();
    const category = CATEGORIES.find(c => c.id === user.stateData.category);
    return await sendBusinessSubCategories(user.phoneNumber, category);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < user.stateData.businesses.length) {
    const business = await Business.findById(user.stateData.businesses[idx]);
    await sendBusinessDetails(user.phoneNumber, business);
  }
}

async function sendBusinessDetails(phoneNumber, business) {
  const mapUrl = business.location?.latitude 
    ? `https://maps.google.com/?q=${business.location.latitude},${business.location.longitude}`
    : 'Not available';

  const msg = `Business Details\n\nName: ${business.name}\nOwner: ${business.ownerName}\nPhone: ${business.phone}\nAddress: ${business.address}\nGoogle Map: ${mapUrl}\n\nOptions:\n1️⃣ Call Business\n2️⃣ View Another Business\n0️⃣ Back`;
  
  await whatsappService.sendMessage(phoneNumber, msg);
}

// Organizer Flow
async function sendDistricts(phoneNumber, type) {
  let msg = 'Select District\n\n';
  DISTRICTS.forEach((dist, idx) => {
    msg += `${idx + 1}️⃣ ${dist.name}\n`;
  });
  msg += '0️⃣ Back';
  await whatsappService.sendMessage(phoneNumber, msg);
}

async function handleOrganizerDistrict(user, message) {
  if (message === '0') {
    user.currentState = STATES.MAIN_MENU;
    await user.save();
    return await sendMainMenu(user.phoneNumber, user.language);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < DISTRICTS.length) {
    user.stateData.district = DISTRICTS[idx].name;
    user.currentState = STATES.ORGANIZER_ASSEMBLY;
    await user.save();
    await sendAssemblies(user.phoneNumber, DISTRICTS[idx]);
  }
}

async function sendAssemblies(phoneNumber, district) {
  let msg = 'Select Assembly\n\n';
  district.assemblies.forEach((asm, idx) => {
    msg += `${idx + 1}️⃣ ${asm}\n`;
  });
  msg += '0️⃣ Back';
  await whatsappService.sendMessage(phoneNumber, msg);
}

async function handleOrganizerAssembly(user, message) {
  if (message === '0') {
    user.currentState = STATES.ORGANIZER_DISTRICT;
    await user.save();
    return await sendDistricts(user.phoneNumber, 'organizer');
  }

  const district = DISTRICTS.find(d => d.name === user.stateData.district);
  const idx = parseInt(message) - 1;
  
  if (idx >= 0 && idx < district.assemblies.length) {
    user.stateData.assembly = district.assemblies[idx];
    user.currentState = STATES.ORGANIZER_LIST;
    await user.save();
    await sendOrganizerList(user);
  }
}

async function sendOrganizerList(user) {
  const organizers = await Organizer.find({
    district: user.stateData.district,
    assembly: user.stateData.assembly
  });

  if (organizers.length === 0) {
    await whatsappService.sendMessage(user.phoneNumber, 'No organizers found.\n\n0️⃣ Back');
    return;
  }

  let msg = `Organizers in ${user.stateData.assembly}\n\n`;
  organizers.forEach((org, idx) => {
    msg += `${idx + 1}️⃣ ${org.name}\n`;
  });
  msg += '\nReply number to view contact\n0️⃣ Back';
  
  user.stateData.organizers = organizers.map(o => o._id.toString());
  await user.save();
  await whatsappService.sendMessage(user.phoneNumber, msg);
}

async function handleOrganizerList(user, message) {
  if (message === '0') {
    user.currentState = STATES.ORGANIZER_ASSEMBLY;
    await user.save();
    const district = DISTRICTS.find(d => d.name === user.stateData.district);
    return await sendAssemblies(user.phoneNumber, district);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < user.stateData.organizers.length) {
    const organizer = await Organizer.findById(user.stateData.organizers[idx]);
    const msg = `Organizer Details\n\nName: ${organizer.name}\nPhone: ${organizer.phone}\nArea: ${organizer.area || organizer.assembly}\n\nOptions:\n1️⃣ Call Organizer\n0️⃣ Back`;
    await whatsappService.sendMessage(user.phoneNumber, msg);
  }
}

// Member Flow (similar to organizer)
async function handleMemberDistrict(user, message) {
  if (message === '0') {
    user.currentState = STATES.MAIN_MENU;
    await user.save();
    return await sendMainMenu(user.phoneNumber, user.language);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < DISTRICTS.length) {
    user.stateData.district = DISTRICTS[idx].name;
    user.currentState = STATES.MEMBER_ASSEMBLY;
    await user.save();
    await sendAssemblies(user.phoneNumber, DISTRICTS[idx]);
  }
}

async function handleMemberAssembly(user, message) {
  if (message === '0') {
    user.currentState = STATES.MEMBER_DISTRICT;
    await user.save();
    return await sendDistricts(user.phoneNumber, 'member');
  }

  const district = DISTRICTS.find(d => d.name === user.stateData.district);
  const idx = parseInt(message) - 1;
  
  if (idx >= 0 && idx < district.assemblies.length) {
    user.stateData.assembly = district.assemblies[idx];
    user.currentState = STATES.MEMBER_LIST;
    await user.save();
    await sendMemberList(user);
  }
}

async function sendMemberList(user) {
  const members = await Member.find({
    district: user.stateData.district,
    assembly: user.stateData.assembly
  });

  if (members.length === 0) {
    await whatsappService.sendMessage(user.phoneNumber, 'No members found.\n\n0️⃣ Back');
    return;
  }

  let msg = `Members in ${user.stateData.assembly}\n\n`;
  members.forEach((mem, idx) => {
    msg += `${idx + 1}️⃣ ${mem.name}\n`;
  });
  msg += '\nReply number to view details\n0️⃣ Back';
  
  user.stateData.members = members.map(m => m._id.toString());
  await user.save();
  await whatsappService.sendMessage(user.phoneNumber, msg);
}

async function handleMemberList(user, message) {
  if (message === '0') {
    user.currentState = STATES.MEMBER_ASSEMBLY;
    await user.save();
    const district = DISTRICTS.find(d => d.name === user.stateData.district);
    return await sendAssemblies(user.phoneNumber, district);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < user.stateData.members.length) {
    const member = await Member.findById(user.stateData.members[idx]);
    const msg = `Member Details\n\nName: ${member.name}\nBusiness: ${member.businessName || 'N/A'}\nPhone: ${member.phone}\nLocation: ${member.location || member.assembly}\n\n0️⃣ Back`;
    await whatsappService.sendMessage(user.phoneNumber, msg);
  }
}

// Add Business Flow
async function handleAddBusinessName(user, message) {
  user.stateData.businessName = message;
  user.currentState = STATES.ADD_BUSINESS_OWNER;
  await user.save();
  await whatsappService.sendMessage(user.phoneNumber, 'Step 2/5\nEnter Owner Name:');
}

async function handleAddBusinessOwner(user, message) {
  user.stateData.ownerName = message;
  user.currentState = STATES.ADD_BUSINESS_PHONE;
  await user.save();
  await whatsappService.sendMessage(user.phoneNumber, 'Step 3/5\nEnter Mobile Number:');
}

async function handleAddBusinessPhone(user, message) {
  user.stateData.phone = message;
  user.currentState = STATES.ADD_BUSINESS_CATEGORY;
  await user.save();
  
  let msg = 'Step 4/5\nSelect Category\n\n';
  CATEGORIES.forEach((cat, idx) => {
    msg += `${idx + 1}️⃣ ${cat.name}\n`;
  });
  await whatsappService.sendMessage(user.phoneNumber, msg);
}

async function handleAddBusinessCategory(user, message) {
  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < CATEGORIES.length) {
    user.stateData.category = CATEGORIES[idx].id;
    user.currentState = STATES.ADD_BUSINESS_ADDRESS;
    await user.save();
    await whatsappService.sendMessage(user.phoneNumber, 'Step 5/5\nEnter Business Address:');
  }
}

async function handleAddBusinessAddress(user, message) {
  user.stateData.address = message;
  user.currentState = STATES.ADD_BUSINESS_PHOTOS;
  await user.save();
  await whatsappService.sendMessage(user.phoneNumber, 
    'Upload up to 5 business photos.\nSend images one by one.\nWhen finished type DONE');
}

async function handleAddBusinessPhotos(user, message, rawMessage) {
  if (!user.stateData.photos) user.stateData.photos = [];

  if (message.toUpperCase() === 'DONE') {
    user.currentState = STATES.ADD_BUSINESS_LOCATION;
    await user.save();
    await whatsappService.sendMessage(user.phoneNumber, 
      'Please share your location using WhatsApp location button');
    return;
  }

  if (rawMessage.type === 'image' && user.stateData.photos.length < 5) {
    user.stateData.photos.push(rawMessage.image.id);
    await user.save();
    await whatsappService.sendMessage(user.phoneNumber, 
      `Photo ${user.stateData.photos.length} uploaded. Send more or type DONE`);
  }
}

async function handleAddBusinessLocation(user, message, location) {
  if (location) {
    const business = new Business({
      name: user.stateData.businessName,
      ownerName: user.stateData.ownerName,
      phone: user.stateData.phone,
      category: user.stateData.category,
      address: user.stateData.address,
      location: {
        latitude: location.latitude,
        longitude: location.longitude
      },
      photos: user.stateData.photos || [],
      createdBy: user.phoneNumber,
      verified: false
    });

    await business.save();
    
    user.currentState = STATES.MAIN_MENU;
    user.stateData = {};
    await user.save();

    await whatsappService.sendMessage(user.phoneNumber, 
      'Your business details submitted successfully!\n\nOur team will verify and publish it soon.\n\nThank you for joining Vanigan.');
    await sendMainMenu(user.phoneNumber, user.language);
  }
}

// Subscription Flow
async function sendSubscriptionMenu(phoneNumber) {
  const buttons = [
    { id: 'monthly', title: '📅 Monthly ₹199' },
    { id: 'yearly', title: '📆 Yearly ₹1999' },
    { id: 'lifetime', title: '♾️ Lifetime ₹4999' }
  ];
  
  await whatsappService.sendButtons(
    phoneNumber,
    '💳 *Vanigan Subscription Plans*\n\n✨ Get premium features:\n✔ Business Listing\n✔ Priority Visibility\n✔ Customer Leads\n\nChoose your plan:',
    buttons
  );
}

async function handleSubscriptionMenu(user, message) {
  const plans = {
    '1': { name: 'Monthly', price: 199, id: 'monthly' },
    '2': { name: 'Yearly', price: 1999, id: 'yearly' },
    '3': { name: 'Lifetime', price: 4999, id: 'lifetime' },
    'monthly': { name: 'Monthly', price: 199, id: 'monthly' },
    'yearly': { name: 'Yearly', price: 1999, id: 'yearly' },
    'lifetime': { name: 'Lifetime', price: 4999, id: 'lifetime' }
  };

  if (message === '0' || message.toLowerCase() === 'back') {
    user.currentState = STATES.MAIN_MENU;
    await user.save();
    return await sendMainMenu(user.phoneNumber, user.language);
  }

  const plan = plans[message.toLowerCase()];
  if (plan) {
    const msg = `💎 *${plan.name} Plan*\n\n💰 Price: ₹${plan.price}\n\n✨ Benefits:\n✔ Business Listing\n✔ Priority Visibility\n✔ Customer Leads\n✔ Analytics Dashboard\n✔ 24/7 Support\n\n📱 Payment link: [Payment Gateway URL]\n\nType MENU to return to main menu`;
    await whatsappService.sendMessage(user.phoneNumber, msg);
  }
}

// News Flow
async function handleNewsDistrict(user, message) {
  if (message === '0') {
    user.currentState = STATES.MAIN_MENU;
    await user.save();
    return await sendMainMenu(user.phoneNumber, user.language);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < DISTRICTS.length) {
    user.stateData.district = DISTRICTS[idx].name;
    user.currentState = STATES.NEWS_ASSEMBLY;
    await user.save();
    await sendAssemblies(user.phoneNumber, DISTRICTS[idx]);
  }
}

async function handleNewsAssembly(user, message) {
  if (message === '0') {
    user.currentState = STATES.NEWS_DISTRICT;
    await user.save();
    return await sendDistricts(user.phoneNumber, 'news');
  }

  const district = DISTRICTS.find(d => d.name === user.stateData.district);
  const idx = parseInt(message) - 1;
  
  if (idx >= 0 && idx < district.assemblies.length) {
    user.stateData.assembly = district.assemblies[idx];
    user.currentState = STATES.NEWS_LIST;
    await user.save();
    await sendNewsList(user);
  }
}

async function sendNewsList(user) {
  const news = await News.find({
    district: user.stateData.district,
    assembly: user.stateData.assembly
  }).sort({ date: -1 }).limit(10);

  if (news.length === 0) {
    await whatsappService.sendMessage(user.phoneNumber, 'No news found.\n\n0️⃣ Back');
    return;
  }

  let msg = 'Latest News\n\n';
  news.forEach((item, idx) => {
    msg += `${idx + 1}️⃣ ${item.title}\n`;
  });
  msg += '\nReply number to read\n0️⃣ Back';
  
  user.stateData.news = news.map(n => n._id.toString());
  await user.save();
  await whatsappService.sendMessage(user.phoneNumber, msg);
}

async function handleNewsList(user, message) {
  if (message === '0') {
    user.currentState = STATES.NEWS_ASSEMBLY;
    await user.save();
    const district = DISTRICTS.find(d => d.name === user.stateData.district);
    return await sendAssemblies(user.phoneNumber, district);
  }

  const idx = parseInt(message) - 1;
  if (idx >= 0 && idx < user.stateData.news.length) {
    const newsItem = await News.findById(user.stateData.news[idx]);
    const msg = `News Details\n\nTitle: ${newsItem.title}\n\nDescription: ${newsItem.description}\n\nDate: ${newsItem.date.toLocaleDateString()}\n\n0️⃣ Back`;
    await whatsappService.sendMessage(user.phoneNumber, msg);
  }
}

// Back handler
async function handleBack(user) {
  const stateFlow = {
    [STATES.BUSINESS_SUBCATEGORY]: STATES.BUSINESS_CATEGORY,
    [STATES.BUSINESS_LIST]: STATES.BUSINESS_SUBCATEGORY,
    [STATES.ORGANIZER_ASSEMBLY]: STATES.ORGANIZER_DISTRICT,
    [STATES.ORGANIZER_LIST]: STATES.ORGANIZER_ASSEMBLY
  };

  const prevState = stateFlow[user.currentState] || STATES.MAIN_MENU;
  user.currentState = prevState;
  await user.save();
}
