const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    text: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  {
    timestamps: { createdAt: 'publish_date' },
  }
);

module.exports = model('Comment', schema);
