/* eslint-disable no-unused-vars */
const { User, Seller, Op, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const user = {}
const jwt = require('jsonwebtoken') // jsonwebtoken used to generate authorization token
const dotenv = require('dotenv')
dotenv.config()
const { v4: uuidv4 } = require('uuid') // uuid is used to generate random unique Id for catalog Id

// register a new user in user table
user.register = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.userType) {
    return res.status(400).send({
      success: false,
      message: 'Content can not be Empty!'
    })
  }
  // generating saltRounds using bycrypt
  const saltRounds = await bcrypt.genSalt(10)
  // generating password hash using bycrypt
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

  try {
    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      userType: req.body.userType
    }
    // if the newuser is a seller register user in seller table
    if (newUser.userType === 'seller') {
      const newSeller = {
        sellerName: req.body.username,
        catalogId: uuidv4()
      }
      await Seller.create(newSeller)
    }
    // adding new user to user table
    const newUserData = await User.create(newUser)
    return res.status(201).json({
      success: true,
      data: newUserData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    })
  }
}

// login for existing user
user.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({
      success: false,
      message: 'Content can not be Empty!'
    })
  }
  try {
    const userData = {
      username: req.body.username,
      password: req.body.password
    }
    const existingUserData = await User.findOne({
      where: {
        username: userData.username
      }
    })
    if (existingUserData) {
      const passwordValid = await bcrypt.compare(req.body.password, existingUserData.password)
      let tokenData = {
        username: existingUserData.username,
        userType: existingUserData.userType
      }
      if (existingUserData.userType === 'seller') {
        const sellerData = await Seller.findOne({
          where: {
            sellerName: existingUserData.username
          }
        })
        tokenData = {
          username: existingUserData.username,
          userType: existingUserData.userType,
          sellerId: sellerData.id
        }
      }
      const token = jwt.sign(tokenData, process.env.SECRET)

      // checking if the password is valid or not
      if (passwordValid) {
        return res.status(201).json({
          token
        })
      } else {
        res.status(400).json({ error: 'Password Incorrect' })
      }
    } else {
      res.status(404).json({ error: 'User does not exist' })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    })
  }
}

module.exports = user
