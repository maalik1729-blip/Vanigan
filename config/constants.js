exports.STATES = {
  LANGUAGE_SELECT: 'LANGUAGE_SELECT',
  WELCOME: 'WELCOME',
  MAIN_MENU: 'MAIN_MENU',
  BUSINESS_CATEGORY: 'BUSINESS_CATEGORY',
  BUSINESS_SUBCATEGORY: 'BUSINESS_SUBCATEGORY',
  BUSINESS_LIST: 'BUSINESS_LIST',
  ORGANIZER_DISTRICT: 'ORGANIZER_DISTRICT',
  ORGANIZER_ASSEMBLY: 'ORGANIZER_ASSEMBLY',
  ORGANIZER_LIST: 'ORGANIZER_LIST',
  MEMBER_DISTRICT: 'MEMBER_DISTRICT',
  MEMBER_ASSEMBLY: 'MEMBER_ASSEMBLY',
  MEMBER_LIST: 'MEMBER_LIST',
  ADD_BUSINESS_NAME: 'ADD_BUSINESS_NAME',
  ADD_BUSINESS_OWNER: 'ADD_BUSINESS_OWNER',
  ADD_BUSINESS_PHONE: 'ADD_BUSINESS_PHONE',
  ADD_BUSINESS_CATEGORY: 'ADD_BUSINESS_CATEGORY',
  ADD_BUSINESS_ADDRESS: 'ADD_BUSINESS_ADDRESS',
  ADD_BUSINESS_PHOTOS: 'ADD_BUSINESS_PHOTOS',
  ADD_BUSINESS_LOCATION: 'ADD_BUSINESS_LOCATION',
  SUBSCRIPTION_MENU: 'SUBSCRIPTION_MENU',
  NEWS_DISTRICT: 'NEWS_DISTRICT',
  NEWS_ASSEMBLY: 'NEWS_ASSEMBLY',
  NEWS_LIST: 'NEWS_LIST'
};

exports.CATEGORIES = [
  { id: 'hotel', name: 'Hotel & Restaurant', subCategories: ['Restaurant', 'Fast Food', 'Bakery', 'Catering', 'Juice Shop'] },
  { id: 'grocery', name: 'Grocery', subCategories: ['Supermarket', 'Vegetables', 'Fruits', 'Provisions'] },
  { id: 'medical', name: 'Medical', subCategories: ['Pharmacy', 'Clinic', 'Hospital', 'Lab'] },
  { id: 'education', name: 'Education', subCategories: ['School', 'College', 'Tuition', 'Training'] },
  { id: 'construction', name: 'Construction', subCategories: ['Builder', 'Materials', 'Hardware', 'Plumbing'] },
  { id: 'electronics', name: 'Electronics', subCategories: ['Mobile', 'Computer', 'TV', 'Appliances'] },
  { id: 'beauty', name: 'Beauty & Salon', subCategories: ['Salon', 'Spa', 'Parlour', 'Cosmetics'] },
  { id: 'agriculture', name: 'Agriculture', subCategories: ['Seeds', 'Fertilizer', 'Equipment', 'Organic'] },
  { id: 'others', name: 'Others', subCategories: ['General'] }
];

exports.DISTRICTS = [
  { name: 'Chennai', assemblies: ['T Nagar', 'Saidapet', 'Velachery', 'Mylapore', 'Anna Nagar'] },
  { name: 'Kanchipuram', assemblies: ['Kanchipuram', 'Sriperumbudur', 'Cheyyur'] },
  { name: 'Tiruvallur', assemblies: ['Tiruvallur', 'Poonamallee', 'Avadi'] },
  { name: 'Coimbatore', assemblies: ['Coimbatore North', 'Coimbatore South', 'Singanallur'] },
  { name: 'Madurai', assemblies: ['Madurai Central', 'Madurai East', 'Madurai West'] }
];
