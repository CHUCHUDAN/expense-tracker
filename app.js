const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')

//引入body-parser
const bodyParser = require('body-parser')

//引入express-session
const session = require('express-session')

//引入routes
const routes = require('./routes')

//引入passport
const UsePassport = require('./config/passport')

//引入methodOverride
const methodOverride = require('method-override')

//引入connect-flash
const flash = require('connect-flash')

//引入mongoose模組
require('./config/mongoose')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
// 用 app.use 規定每一筆請求都需要透過 express.static 進行前置處理
app.use(express.static('public'))

app.use(flash())

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

UsePassport(app)

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

//每筆request都會先經過routes處理
app.use(routes)



app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})