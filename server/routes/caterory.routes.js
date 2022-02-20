const express = require('express');

const router = express.Router({ mergeParams: true });

const Category = require('../models/Category');

router.get('/', async (req, res) => {
  try {
    const list = await Category.find();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({
      message: 'Error occured on server. Try latter',
    });
  }
});

module.exports = router;
