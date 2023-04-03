const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema ({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'CG',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Record', recordSchema)