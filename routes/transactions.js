const express = require('express');
const {
    get,
    getById,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getByUserId,
} = require('../controllers/transactions');
const { isAuthenticated, hasOwnershipRol } = require('../middlewares/authJwt');

const router = express.Router();

router.get('/', isAuthenticated, hasOwnershipRol, get);
router.get('/:id', isAuthenticated, hasOwnershipRol, getById);
router.get('/user/:id', isAuthenticated, hasOwnershipRol, getByUserId);
router.post('/', isAuthenticated, hasOwnershipRol, createTransaction);
router.put('/:id', isAuthenticated, hasOwnershipRol, updateTransaction);
router.delete('/:id', isAuthenticated, hasOwnershipRol, deleteTransaction);

module.exports = router;
