/* eslint-disable no-unused-vars */
const { User, Seller, Op, Sequelize } = require('../models')
const buyer = {}

// gives list of the sellers
buyer.listOfSellers = async (req, res) => {
  let listOfSellers = await Seller.findAll()
  listOfSellers = listOfSellers.map((value) => {
    return { id: value.id, sellername: value.sellerName }
  })
  res.status(200).json({
    listOfSellers
  })
}

buyer.sellerCatalog = async (req, res) => {
  res.status(200).json({
    success: true
  })
}
buyer.createOrder = async (req, res) => {
  res.status(200).json({
    success: true
  })
}
module.exports = buyer
