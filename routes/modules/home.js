const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

//首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .lean()
    .then(record => {
      record.map((r) => {
        const newDate = r.date.toLocaleDateString()
        r.date = newDate
      })
      res.render('index', {record})
    })
    .catch(error => console.error(error))
})

module.exports = router