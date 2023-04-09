const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const CG = require('../../models/category')

//首頁&處理icon
router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const record = await Record.find({ userId }).lean()
    const category = await CG.find().lean()
    let totalAmount = 0
    record.map((r) => {
      totalAmount += r.amount
      const newDate = r.date.toLocaleDateString()
      r.date = newDate
      const categoryId = r.categoryId
      const result = category.filter(c => c._id.toString() === categoryId.toString())
      r.icon = result[0].icon
    })
    res.render('index', { record ,totalAmount})
  } catch (error) {
    console.error(error)
  }
})

module.exports = router