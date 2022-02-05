const express = require('express');
const auth = require('../middleware/auth.middleware');

const router = express.Router({ mergeParams: true });

const Message = require('../models/Message');
const User = require('../models/User');

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const receivedMessages = await Message.find({ receiverId: req.user._id });
      const sendMessages = await Message.find({ senderId: req.user._id });

      res.status(200).json({ receivedMessages, sendMessages });
    } catch (error) {
      res.status(500).json({
        message: 'Error occured on server. Try latter',
      });
    }
  })
  .post(auth, async (req, res) => {
    try {
      const sender = await User.findById(req.user._id);
      let receiver = await User.find({ role: 'admin' });
      receiver = receiver[0];

      let receiverId = receiver._id;
      if (sender.role === 'admin') {
        receiverId = req.body.receiverId;
      }

      const newMessage = await Message.create({
        ...req.body,
        receiverId,
        senderId: sender._id,
      });
      res.status(201).send(newMessage);
    } catch (error) {
      res.status(500).json({
        message: 'Error occured on server. Try latter',
      });
    }
  });

router.delete('/:messageId', auth, async (req, res) => {
  try {
    const { messageId } = req.params;
    const removedMessage = await Message.findById(messageId);

    if (removedMessage.senderId.toString() === req.user._id) {
      await removedMessage.remove();
      return res.send(messageId);
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
