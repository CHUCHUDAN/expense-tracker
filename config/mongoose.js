const mongoose = require('mongoose')

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//運用mongoose跟mongodb連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

//取得資料連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('Mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('Mongodb connected!')
})

module.exports = db