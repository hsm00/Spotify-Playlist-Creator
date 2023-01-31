const path = require('path');
const express = require('express');

const apiToken = require('../../controllers/apiToken/apiTokenController');
const router = express.Router();


router.post('/login', apiToken.getAccessToken);
router.post('/refresh', apiToken.getRefreshToken);

module.exports = router;