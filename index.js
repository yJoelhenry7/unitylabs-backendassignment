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

app.use('/api/auth/register', userRoute)

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})
