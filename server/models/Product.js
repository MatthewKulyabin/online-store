const { Schema, model } = require('mongoose');

const shema = new Schema(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    photo: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: { createdAt: 'publish_date' },
  }
);

module.exports = model('Product', shema);
