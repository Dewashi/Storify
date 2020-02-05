const express = require('express');
const controller = require('../controller.js');

const router = express.Router();

// home page
router.get('/', controller.welcome);

module.exports = router;
