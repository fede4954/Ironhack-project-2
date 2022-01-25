const { Schema, model } = require('mongoose')

const carSchema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    defaultImage: { type: String, required: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }],
    releaseDate: { type: String, required: true },
    rarity: [{ type: String, required: true }],
    paintable: { type: Boolean, default: false },
    hitbox: { type: String, ref: 'Hitbox' },
    variants: [{ type: String }],
    description: { type: String, required: true },
    wikiLink: { type: String },
    likes: { type: Number, default: 0, min: 0 }
  }, { timestamps: true }
)

const Car = model('Car', carSchema)

module.exports = Car