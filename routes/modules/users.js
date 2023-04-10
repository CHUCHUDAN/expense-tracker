const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const passport = require('passport')
const bcrypt = require('bcryptjs')
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
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body
    const errors = []
    if (!email || !password || !confirmpassword) {
      errors.push({ message: '帳號及密碼都是必填!' })
    }
    if (password !== confirmpassword) {
      errors.push({ message: '密碼及確認密碼不相符!' })
    }
    if (errors.length) {
      return res.render('register', { name, email, password, confirmpassword, errors })
    }
    const userEmail = await User.findOne({email})
    if (userEmail) {
      errors.push({ message: '此信箱已註冊過' })
      return res.render('register', { name, email, password, confirmpassword, errors })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({name, email, password: hash})
    req.flash('success_msg', '註冊成功')
    res.redirect('/users/login')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router