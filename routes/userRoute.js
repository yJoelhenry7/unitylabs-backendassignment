const express = require('express')
const router = express.Router()
const user = require('../controllers/userController.js')

router.post('/', user.register)

module.exports = router
