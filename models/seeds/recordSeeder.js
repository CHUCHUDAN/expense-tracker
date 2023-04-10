const { bookeepings } = require('../../data')
const CG = require('../category')
const User = require('../users')
const Record = require('../record')
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

db.once('open', async () => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(SEED_USER.password, salt)
    const user = await User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    })
    const category = await CG.find({}).lean()
    bookeepings.filter(book => {
      category.map(cate => {
        if (cate.icon === book.icon) {
          book.categoryId = cate._id
        }
      })
    })
    const userId = user._id
    bookeepings.filter(book => book.userId = userId)
    await Record.create(bookeepings)
    console.log('done')
    process.exit()
  } catch (error) {
    console.error(error)
  }
})