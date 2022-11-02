const express = require('express');
const { get, post, put, getById, del } = require('../controllers/users');

const router = express.Router();

router.get('/', get);
router.get('/:id', getById);
router.post('/', post);
router.put('/:id', put);
router.delete('/:id', del);

module.exports = router;
