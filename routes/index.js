const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const cruds = require('./modules/cruds')
const users = require('./modules/users')
const auth = require('./modules/auth')

router.use('/users', users)
router.use('/cruds', authenticator, cruds)
router.use('/auth', auth)
router.use('/', authenticator, home)

module.exports = router