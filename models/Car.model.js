const { Schema, model } = require('mongoose')

const carSchema = new Schema({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    releaseDate: { type: String, required: true },
    rarity: [{ type: String, required: true }],
    paintable: { type: Boolean, default: false },
    hitbox: { type: Schema.Types.ObjectId, ref: 'Hitbox' },
    variantsIds: [{ type: String }],
    description: { type: String, required: true },
    timesFavorited: { type: Number, default: 0}
})

const Car = model('Car', carSchema)

module.exports = Car