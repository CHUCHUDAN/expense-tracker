const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/users')
const bcrypt = require('bcryptjs')

module.exports = app => {
  //初始化passport
  app.use(passport.initialize())
  app.use(passport.session())

  //設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        return done(null, false, req.flash('warning_msg', '登入失敗:信箱或密碼錯誤'))
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, req.flash('warning_msg', '登入失敗:信箱或密碼錯誤'))
      }
      return done(null, user, req.flash('success_msg', '登入成功'))
    } catch (error) {
      return done(err, false)
    }
  }))

  //設定FB登入策略
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name } = profile._json
        const userEmail = await User.findOne({email})
        if (userEmail) {
          return done(null, userEmail)
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(randomPassword, salt)
        const user = await User.create({name, email, password: hash})
        return done(null, user)
      }catch (error) {
        return done (error, false)
      }
    }
  ));

  //設定序列化及反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).lean()
      return done(null, user)
    } catch (error) {
      return done(err, null)
    }
  })
}
