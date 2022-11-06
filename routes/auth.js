const express = require('express');
const { post, get } = require('../controllers/auth');
const { isAuthenticated } = require('../middlewares/authJwt');

const router = express.Router();

router.post('/login', post);
router.get('/me', isAuthenticated, get);

module.exports = router;
