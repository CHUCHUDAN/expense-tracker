const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const cruds = require('./modules/cruds')


router.use('/cruds', cruds)
router.use('/', home)

module.exports = router