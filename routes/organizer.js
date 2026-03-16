const express = require('express');
const router = express.Router();
const organizerController = require('../controllers/organizerController');

router.get('/list', organizerController.getOrganizers);
router.get('/:id', organizerController.getOrganizerDetails);
router.post('/add', organizerController.addOrganizer);

module.exports = router;
