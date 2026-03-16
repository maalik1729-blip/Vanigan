const Business = require('../models/Business');
const { CATEGORIES } = require('../config/constants');

exports.getCategories = (req, res) => {
  res.json(CATEGORIES);
};

exports.getSubCategories = (req, res) => {
  const category = req.params.category;
  const categoryData = CATEGORIES.find(c => c.id === category);
  res.json(categoryData?.subCategories || []);
};

exports.getBusinesses = async (req, res) => {
  try {
    const { category, subCategory, district, assembly } = req.query;
    const filter = { verified: true };
    
    if (category) filter.category = category;
    if (subCategory) filter.subCategory = subCategory;
    if (district) filter.district = district;
    if (assembly) filter.assembly = assembly;

    const businesses = await Business.find(filter).limit(50);
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusinessDetails = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addBusiness = async (req, res) => {
  try {
    const business = new Business(req.body);
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
