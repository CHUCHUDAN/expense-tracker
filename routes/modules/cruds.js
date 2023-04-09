const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//新增帳務頁面
router.get('/new', (req, res) => {
  res.render('new')
})

//新增帳務功能
router.post('/new', (req, res) => {
  const userId = req.user._id
  console.log(req.body)
  const { name, date, category, amount } = req.body
  return Record.create({name, date, category, amount, userId})
    .then(() => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

router.post('/', (req, res) => {
  const { name, date, category, price } = req.body
  console.log(req.body)
})

module.exports = router