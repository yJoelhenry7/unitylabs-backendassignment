const express = require('express')
const router = express.Router()
const product = require('../controllers/productController')

router.post('/create-catalog', product.createCatalog)
router.get('/orders', product.orders)

module.exports = router
