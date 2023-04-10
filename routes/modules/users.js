const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')

//login頁面
router.get('/login', (req, res) => {
  res.render('login')
})

//login功能
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
}))

//logout功能
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '成功登出')
  res.redirect('/users/login')
})

//register頁面
router.get('/register', (req, res) => {
  res.render('register')
})

//register功能
router.post('/register', (req, res) => {
  const { name, email, password, confirmpassword } = req.body
  const errors = []
  if (!email || !password || !confirmpassword) {
    errors.push({message: '帳號及密碼都是必填!'})
  } 
  if (password !== confirmpassword) {
    errors.push({ message: '密碼及確認密碼不相符!' })
  } 
  if (errors.length) {
    return res.render('register', { name, email, password, confirmpassword, errors })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({message: '此信箱已註冊過'})
        return res.render('register', { name, email, password, confirmpassword, errors })
      }
      User.create({ name, email, password })
      .then(res.redirect('/'))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router