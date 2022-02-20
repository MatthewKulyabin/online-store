const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = express.Router({ mergeParams: true });
const path = require('path');
const fs = require('fs');

router.patch('/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const url = req.protocol + '://' + req.get('host');

    const body = JSON.parse(req.files.content.data.toString());

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
    console.log(req.files.photo.name);

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { ...body, image: `${url}/public/${req.files.photo.name}` },
        {
          new: true,
        }
      );

      res.send(updatedUser);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error occured on server. Try later',
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: 'Error occured on server. Try later',
    });
  }
});

module.exports = router;
