const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

router.get('/categories', businessController.getCategories);
router.get('/subcategories/:category', businessController.getSubCategories);
router.get('/list', businessController.getBusinesses);
router.get('/:id', businessController.getBusinessDetails);
router.post('/add', businessController.addBusiness);

module.exports = router;
