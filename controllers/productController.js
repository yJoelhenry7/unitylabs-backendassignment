/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
const { User, Seller, Product, Op, Sequelize } = require('../models')
const product = {}
const jwt = require('jsonwebtoken') // jsonwebtoken used to generate authorization token
const dotenv = require('dotenv')
dotenv.config()

product.createCatalog = async (req, res) => {
  if (!req.body.token || !req.body.productList) {
    return res.status(400).send({
      success: false,
      message: 'Content can not be Empty!'
    })
  }
  const verifyToken = jwt.verify(req.body.token, process.env.SECRET) // getting payload data using jwt token
  const sellerId = verifyToken.sellerId // getting sellerId from payload
  const productList = req.body.productList
  // getting sellerData using sellerId
  const sellerData = await Seller.findOne({
    where: {
      id: sellerId
    }
  })
  const catalogId = sellerData.catalogId
  productList.forEach(async (product) => {
    const productData = {
      productName: product['productName'],
      productPrize: product['price'],
      catalogId
    }
    await Product.create(productData)
  })
  if (verifyToken.userType === 'seller') {
    await res.status(201).json({
      catalogId,
      productList
    })
  }
}
product.orders = async (req, res) => {
  await res.send('products data')
}
module.exports = product
