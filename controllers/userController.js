/* eslint-disable no-unused-vars */
const { User, Op, Sequelize } = require('../models')
const bcrypt = require('bcrypt')
const user = {}
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// register a new user in user table
user.register = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.userType) {
    return res.status(400).send({
      success: false,
      message: 'Content can not be Empty!'
    })
  }
  // generating password hash using bycrypt
  const saltRounds = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

  try {
    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      userType: req.body.userType
    }
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
      const token = jwt.sign({
        username: existingUserData.username,
        userType: existingUserData.userType
      }, process.env.SECRET)
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
