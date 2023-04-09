const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const CG = require('../../models/category')

//首頁&處理icon&處理totalAmount
router.get('/', async (req, res) => {
  try {
    const selectId = req.query.categoryId
    const userId = req.user._id
    let record = await Record.find({ userId }).lean()
    const category = await CG.find().lean()
    let selectedData = false
    let totalAmount = 0
    if (selectId !== undefined) {
      record = record.filter(r => r.categoryId.toString() === selectId.toString())
      selectedData = category.filter(cate => cate._id.toString() === selectId.toString())
      }
      record.map((r) => {
        totalAmount += r.amount
        const newDate = r.date.toLocaleDateString()
        r.date = newDate
        const categoryId = r.categoryId
        const result = category.filter(c => c._id.toString() === categoryId.toString())
        r.icon = result[0].icon
      })
    return res.render('index', { record, totalAmount, category, selectedData })

  } catch (error) {
    console.error(error)
  }
})

module.exports = router