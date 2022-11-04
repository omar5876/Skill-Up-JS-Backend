const { Router } = require('express');
const { post, get, deleteCategory, updateCategory } = require('../controllers/categories');

const router = Router();

router.post('/', post);
router.get('/', get);
router.delete('/:id', deleteCategory)
router.put('/:id', updateCategory)



module.exports = router;