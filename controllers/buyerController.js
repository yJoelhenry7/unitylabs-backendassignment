/* eslint-disable no-unused-vars */
const { Seller, Product, Op, Sequelize } = require('../models')
const buyer = {}

// gives list of the sellers
buyer.listOfSellers = async (req, res) => {
  const listOfSellers = await Seller.findAll({ attributes: ['id', 'sellerName'] })
  res.status(200).json({
    listOfSellers
  })
}

// gives sellercatalog based on seller id
buyer.sellerCatalog = async (req, res) => {
  const sellerId = req.params.seller_id // get the seller_id from params
  let catalogId = await Seller.findOne({ where: { id: sellerId }, attributes: ['catalogId'] })
  catalogId = catalogId.catalogId
  await Product.findAll({
    where: {
      catalogId
    }
  }).then((catalog) => {
    res.status(200).json({
      success: true,
      catalog
    })
  })
}
buyer.createOrder = async (req, res) => {
  res.status(200).json({
    success: true
  })
}
module.exports = buyer
