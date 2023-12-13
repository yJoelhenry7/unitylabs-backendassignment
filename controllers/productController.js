/* eslint-disable no-unused-vars */
const { User, Seller, Product, Op, Sequelize } = require('../models')
const product = {}
const jwt = require('jsonwebtoken') // jsonwebtoken used to generate authorization token
const dotenv = require('dotenv')
dotenv.config()

product.createCatalog = async (req, res) => {
  await res.send('product added')
}
product.orders = async (req, res) => {
  await res.send('products data')
}
module.exports = product
