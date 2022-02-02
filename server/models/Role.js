const { Schema, model } = require('mongoose');

const shema = new Schema(
  {
    role: { type: String, required: true },
  },
  {
    timestamps: { createdAt: 'publish_date' },
  }
);

module.exports = model('Role', shema);
