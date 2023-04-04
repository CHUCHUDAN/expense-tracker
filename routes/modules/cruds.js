const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/edit', (req, res) => {
  res.render('edit')
})

router.post('/', (req, res) => {
  const { name, date, category, price } = req.body
  console.log(req.body)
})

module.exports = router