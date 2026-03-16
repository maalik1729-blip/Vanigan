const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/list', newsController.getNews);
router.get('/:id', newsController.getNewsDetails);
router.post('/add', newsController.addNews);

module.exports = router;
