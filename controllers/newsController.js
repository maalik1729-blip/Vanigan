const News = require('../models/News');

exports.getNews = async (req, res) => {
  try {
    const { district, assembly } = req.query;
    const filter = {};
    
    if (district) filter.district = district;
    if (assembly) filter.assembly = assembly;

    const news = await News.find(filter).sort({ date: -1 }).limit(20);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNewsDetails = async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addNews = async (req, res) => {
  try {
    const newsItem = new News(req.body);
    await newsItem.save();
    res.status(201).json(newsItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
