const express = require('express');

const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });

const Category = require('../models/Category');
const Product = require('../models/Product');
const User = require('../models/User');

router
  .route('/')
  .get(async (req, res) => {
    const category = await Category.find();
    try {
      const list = await Product.find();
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({
        message: 'Error occured on server. Try latter',
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const admin = await User.find({ role: 'admin' });
      if (admin[0]._id.toString() !== req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const newProduct = await Product.create({
        ...req.body,
      });
      res.status(201).send(newProduct);
    } catch (error) {
      res.status(500).json({
        message: 'Error occured on server. Try latter',
      });
    }
  });

router.delete('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    const admin = await User.find({ role: 'admin' });
    if (admin[0]._id.toString() !== req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const removedProduct = await Product.findById(productId);
    await removedProduct.remove();

    res.send(productId);
  } catch (error) {
    res.status(500).json({
      message: 'Error occured on server. Try latter',
    });
  }
});

module.exports = router;
