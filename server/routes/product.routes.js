const express = require('express');
const fs = require('fs');
const path = require('path');

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
      const url = req.protocol + '://' + req.get('host');

      const body = JSON.parse(req.files.content.data.toString());

      const admin = await User.find({ role: 'admin' });
      if (admin[0]._id.toString() !== req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      fs.writeFileSync(
        path.join(__dirname, `../public/${req.files.photo.name}`),
        req.files.photo.data,
        async (err) => {
          if (err) {
            console.log('err', err);
            return;
          }
        }
      );

      const newProduct = await Product.create({
        ...body,
        photo: `${url}/public/${req.files.photo.name}`,
      });
      await newProduct.save();

      res.status(201).send(newProduct);
    } catch (error) {
      res.status(500).json({
        message: 'Error occured on server. Try latter',
      });
    }
  });

router
  .route('/:productId')
  .delete(auth, async (req, res) => {
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
  })
  .patch(auth, async (req, res) => {
    const { productId } = req.params;
    const url = req.protocol + '://' + req.get('host');

    const body = JSON.parse(req.files.content.data.toString());
    const bought = Object.keys(body).length === 1 && !!body.count;

    const admin = await User.find({ role: 'admin' });
    if (bought) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          count: body.count,
        },
        {
          new: true,
        }
      );

      return res.send(updatedProduct);
    }
    if (admin[0]._id.toString() !== req.user._id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newPhoto = req.files?.photo?.name;

    if (newPhoto) {
      fs.writeFileSync(
        path.join(__dirname, `../public/${req.files.photo.name}`),
        req.files.photo.data,
        async (err) => {
          if (err) {
            console.log('err', err);
            return;
          }
        }
      );
    }

    const updatedBody = newPhoto
      ? {
          ...body,
          photo: `${url}/public/${req.files.photo.name}`,
        }
      : { ...body };

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedBody,
      {
        new: true,
      }
    );

    res.send(updatedProduct);
  });

module.exports = router;
