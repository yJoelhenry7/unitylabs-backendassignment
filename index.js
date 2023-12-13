const express = require('express')
const app = express()
const PORT = process.env.PORT | 8080

// ---------------------MiddleWares----------------------------------------------------
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// -----------------------Routes---------------------------------------------------------
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const buyerRoute = require('./routes/buyerRoute')

app.use('/api/auth/', userRoute)
app.use('/api/seller/', productRoute)
app.use('/api/buyer/', buyerRoute)

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})
