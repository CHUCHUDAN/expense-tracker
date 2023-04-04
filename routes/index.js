const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const cruds = require('./modules/cruds')
const users = require('./modules/users')

router.use('/users', users)
router.use('/cruds', cruds)
router.use('/', home)

module.exports = router