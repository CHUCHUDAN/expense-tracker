const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const CG = require('../../models/category')

//新增帳務頁面
router.get('/new', async (req, res) => {
  try {
    const category = await CG.find().lean()
    res.render('new', { category })
  } catch (error) {
    console.error(error)
  }
})

//新增帳務功能
router.post('/new', async (req, res) => {
  try {
    const userId = req.user._id
    const { name, date, amount, categoryId } = req.body
    const c = await CG.find().lean()
    if (!name || !date || !amount || !categoryId) {
      req.flash('warning_msg', '所有欄位都是必填')
      return res.render('new', { name, date, amount, categoryId, category: c })
    }
    let icon = ''
    const category = await CG.find({ _id: categoryId }).lean()
    const [cate] = category
    await Record.create({ name, date, amount, icon: cate.icon, categoryId, userId, })
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

//編輯頁面
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId }).lean()
    const category = await CG.find().lean()
    const date = new Date(record.date).toISOString().substring(0, 10);
    record.date = date
    const categoryId = record.categoryId.toString()
    const selectedData = category.filter(cate => cate._id.toString() === categoryId)
    const remindData = category.filter(cate => cate._id.toString() !== categoryId)
    res.render('edit', { selectedData, remindData, record })
  } catch (error) {
    console.error(error)
  }
})

//編輯功能
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const rec = req.body
    rec._id = _id
    const { name, date, categoryId, amount } = req.body
    const category = await CG.find().lean()
    const selectedData = category.filter(cate => cate._id.toString() === categoryId)
    const remindData = category.filter(cate => cate._id.toString() !== categoryId)
    if (!name || !date || !amount || !categoryId) {
      req.flash('warning_msg', '所有欄位都是必填')
      return res.render('edit', { selectedData, remindData, record: rec })
    }else {
      const category = await CG.find({ _id: categoryId }).lean()
      const [cate] = category
      const record = await Record.findOne({ _id, userId })
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      record.icon = cate.icon
      await record.save()
      res.redirect('/')
    }
  } catch (error) {
    console.error(error)
  }
})

//刪除功能
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ _id, userId })
    record.remove()
    res.redirect('/')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router