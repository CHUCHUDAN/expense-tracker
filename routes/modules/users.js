const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

//login頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//login功能
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//register頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//register功能
router.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.render('register', { name, email, password, confirmpassword })
      }
      User.create({ name, email, password })
      .then(res.redirect('/'))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router