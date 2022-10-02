const express = require('express');
const router = express.Router();
const latestController = require('../controllers/latestController');

router.get('/', latestController);

module.exports = router;