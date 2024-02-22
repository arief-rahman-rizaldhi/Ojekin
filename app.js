const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')

app.use(express.static("assets"))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))

app.use(require('./Routers'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})