const Member = require('../models/Member');

exports.getMembers = async (req, res) => {
  try {
    const { district, assembly } = req.query;
    const filter = {};
    
    if (district) filter.district = district;
    if (assembly) filter.assembly = assembly;

    const members = await Member.find(filter);
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMemberDetails = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
