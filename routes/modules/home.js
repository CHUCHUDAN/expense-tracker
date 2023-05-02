const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const CG = require('../../models/category')

//首頁&處理icon&處理totalAmount
router.get('/', async (req, res) => {
  try {
    const selectId = req.query.categoryId
    const userId = req.user._id
    const qureyobj = selectId ? { userId, categoryId: selectId } : { userId }
    const record = await Record.find(qureyobj).lean()
    const category = await CG.find().lean()
    const selectedData = await CG.find({ _id: selectId }).lean()
    let totalAmount = 0
    record.map((r) => {
      totalAmount += r.amount
      const newDate = r.date.toLocaleDateString()
      r.date = newDate
    })
    return res.render('index', { record, totalAmount, category, selectedData })
  } catch (error) {
    console.error(error)
  }
})

module.exports = router