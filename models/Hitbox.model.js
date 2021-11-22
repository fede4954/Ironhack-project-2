const { Schema, model } = require('mongoose')

const hitboxSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }]
})

const Hitbox = model('Hitbox', hitboxSchema)

module.exports = Hitbox