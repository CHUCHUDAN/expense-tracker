const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')


//引入mongoose模組
require('./config/mongoose')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})