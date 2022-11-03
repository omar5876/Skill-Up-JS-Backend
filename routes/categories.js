const { Router } = require('express')
const { post } = require('../controllers/categories')

const router = Router()

router.post('/', post)

module.exports = router
