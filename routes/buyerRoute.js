const express = require('express')
const router = express.Router()
const buyer = require('../controllers/buyerController')

router.get('/list-of-sellers', buyer.listOfSellers)
router.get('/seller-catalog/:seller_id', buyer.sellerCatalog)
router.post('/create-order/:seller_id', buyer.createOrder)

module.exports = router
