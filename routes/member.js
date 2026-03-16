const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/list', memberController.getMembers);
router.get('/:id', memberController.getMemberDetails);
router.post('/add', memberController.addMember);

module.exports = router;
