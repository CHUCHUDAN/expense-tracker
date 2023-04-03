if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const CG = require('../category') // 載入 category model
const db = require('../../config/mongoose')

const category = [
  { id: 1, name: '家居物業' },
  { id: 2, name: '交通出行' },
  { id: 3, name: '休閒娛樂' },
  { id: 4, name: '餐飲食品' },
  { id: 5, name: '其他' },
]

db.once('open', () => {
  category.map(cate => {
    CG.create({id: cate.id, name: cate.name})
  })
    console.log('done')
})