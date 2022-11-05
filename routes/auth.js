const express = require('express');
const { post, get } = require('../controllers/auth');

const router = express.Router();

router.post('/login', post);
// router.get('/me', get);

module.exports = router;
