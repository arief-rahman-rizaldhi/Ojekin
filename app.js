const express = require('express')
const app = express()
const port = 3000

app.use(express.static("assets"))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(require('./Routers'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})