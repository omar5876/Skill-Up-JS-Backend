const { Router } = require('express');
const { post, get, deleteCategory } = require('../controllers/categories');

const router = Router();

router.post('/', post);
router.get('/', get);
router.delete('/:id', deleteCategory)


module.exports = router;