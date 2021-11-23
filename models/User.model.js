const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    favoriteCars: [{ type: Schema.Types.ObjectId, ref: 'Car' }]
  }, { timestamps: true }
)

const User = model('User', userSchema)

module.exports = User