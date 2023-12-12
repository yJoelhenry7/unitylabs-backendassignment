/* eslint-disable no-unused-vars */
const { User, Op, Sequelize } = require('../models')
const user = {}

// register a new user in user table
user.register = async (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.userType) {
    return res.status(400).send({
      success: false,
      message: 'Content can not be Empty!'
    })
  }
  try {
    const newUser = {
      username: req.body.username,
      password: req.body.password,
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
    const existingUserData = await User.findAll({
      where: {
        username: userData.username,
        password: userData.password
      }
    })
    return res.status(201).json({
      success: true,
      data: existingUserData
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error
    })
  }
}

module.exports = user
