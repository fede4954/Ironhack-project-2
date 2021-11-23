const { Schema, model } = require('mongoose')

const carSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    rarity: [{ type: String, required: true }],
    paintable: { type: Boolean, required: true, default: false },
    unobtainablePaints: { type: String },
    hitbox: { type: Schema.Types.ObjectId, ref: 'Hitbox' },
    variantsIds: [{ type: String }],
    description: { type: String, required: true },
    availability: { type: String, required: true },
    timesFavorited: { type: Number, required: true, default: 0}
})

const Car = model('Car', carSchema)

module.exports = Car