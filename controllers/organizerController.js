const Organizer = require('../models/Organizer');

exports.getOrganizers = async (req, res) => {
  try {
    const { district, assembly } = req.query;
    const filter = {};
    
    if (district) filter.district = district;
    if (assembly) filter.assembly = assembly;

    const organizers = await Organizer.find(filter);
    res.json(organizers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrganizerDetails = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id);
    if (!organizer) {
      return res.status(404).json({ error: 'Organizer not found' });
    }
    res.json(organizer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addOrganizer = async (req, res) => {
  try {
    const organizer = new Organizer(req.body);
    await organizer.save();
    res.status(201).json(organizer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
