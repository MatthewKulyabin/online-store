const jwt = require('jsonwebtoken');
const config = require('config');
const Token = require('../models/Token');

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: '1h',
    });

    const refreshToken = jwt.sign(payload, config.get('refreshSecret'), {
      expiresIn: '1h',
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }

  async save(userId, refreshToken) {
    try {
      const data = await Token.findOne({ user: userId });
      if (data) {
        data.refreshToken = refreshToken;
        return data.save();
      }

      const token = await Token.create({ user: userId, refreshToken });
      return token.save();
    } catch (error) {
      console.log(error);
    }
  }

  validateRefresh(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecret'));
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  validateAccess(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecret'));
    } catch (error) {
      return null;
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken });
    } catch (error) {
      return null;
    }
  }
}

module.exports = new TokenService();
