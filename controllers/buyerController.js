/* eslint-disable no-unused-vars */
const { User, Seller, Op, Sequelize } = require('../models')
const buyer = {}

// gives list of the sellers
buyer.listOfSellers = async (req, res) => {
  res.status(200).json({
    success: true
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
