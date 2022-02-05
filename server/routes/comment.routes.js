const express = require('express');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

const Comment = require('../models/Comment');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const list = await Comment.find();
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({
        message: 'Error occured on server. Try latter',
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      console.log(req.body, req.user);
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      res.status(201).send(newComment);
    } catch (error) {
      res.status(500).json({
        message: 'Error occured on server. Try latter',
      });
    }
  });

router.delete('/:commentId', auth, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedComment = await Comment.findById(commentId);

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove();
      return res.send(commentId);
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error occured on server. Try latter',
    });
  }
});

module.exports = router;
