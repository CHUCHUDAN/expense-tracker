const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = app => {
  //初始化passport
  app.use(passport.initialize())
  app.use(passport.session())

  //設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({email})
      if (!user) {
        return done(null, false, { message: 'That email is not register!' })
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Email or password  incorrect' })
      }
      return done(null, user)
    }catch (error) {
      return done(err, false)
    }
  }))

  //設定序列化及反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    }catch (error) {
      return done(err, null)
    }
  })
}
