const express = require('express')
const {
   get,
   getById,
   createTransaction,
   updateTransaction,
   deleteTransaction
} = require('../controllers/transactions')

const router = express.Router()

router.get('/', get)
router.get('/:id', getById)
router.post('/', createTransaction)
router.put('/:id', updateTransaction)
router.delete('/:id', deleteTransaction)


module.exports = router