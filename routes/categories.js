const { Router } = require('express');
const { post, get } = require('../controllers/categories');

const router = Router();

router.post('/', post);
router.get('/', get);

module.exports = router;
