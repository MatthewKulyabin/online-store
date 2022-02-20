const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    text: { type: String, required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: { createdAt: 'publish_date' },
  }
);

module.exports = model('Message', schema);
