const express = require('express');
const Category = require('../models/Category');

const router = express.Router({ mergeParams: true });

const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const category = await Category.find();
  try {
    const list = await Product.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({
      message: 'Error occured on server. Try latter',
    });
  }
});

module.exports = router;
