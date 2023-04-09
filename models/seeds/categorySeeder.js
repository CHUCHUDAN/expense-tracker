
const CG = require('../category') // 載入 category model
const db = require('../../config/mongoose')

const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}

db.once('open', async () => {
  try {
    for (let cate in CATEGORY) {
      await CG.create({ name: cate, icon: CATEGORY[cate] })
    }
    console.log('done')
    process.exit()
  }catch (error) {
    console.error(error)
  }
})