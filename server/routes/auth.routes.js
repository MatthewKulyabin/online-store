const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const tokenService = require('../services/token.service');

const router = express.Router({ mergeParams: true });

router.post('/signUp', [
  check('email', 'Incorrect Email').isEmail(),
  check(
    'password',
    'Password should contain at least one capital letter, one digit, one !@#$%^&*'
  ).matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: { message: 'INVALID_DATA' },
          code: 400,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({
          error: {
            message: 'EMAIL_EXISTS',
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });

      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (error) {
      res.status(500).json({ message: 'Error occured on server. Try later' });
    }
  },
]);

router.post('/signInWithPassword', [
  check('email', 'Email is incorrect').normalizeEmail().isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: 'EMAIL_NOT_FOUND',
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: 'INVALID_PASSWORD',
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (error) {
      res.status(500).json({ message: 'Error occured on server. Try later' });
    }
  },
]);

const isTokenInvalid = (data, dbToken) =>
  !data || !dbToken || data._id !== dbToken?.user?.toString();

router.post('/token', async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = tokenService.validateRefresh(refreshToken);
    console.log(data);
    const dbToken = await tokenService.findToken(refreshToken);

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const tokens = await tokenService.generate({
      _id: data._id,
    });

    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (error) {
    res.status(500).json({ message: 'Error occured on server. Try later' });
  }
});

module.exports = router;
