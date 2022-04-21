const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Op = require('sequelize').Op;
const db = require('../models');

module.exports = {
  encrypt: (req, res, next) => {
    if (req.body.password !== req.body.confirm_password) {
      res.status(500);
      throw new Error(`Password don't match`);
    } else {
      if (!req.body.password) {
        throw new Error('Password is empty');
      } else {
        req.body = {
          ...req.body,
          password: bcrypt.hashSync(req.body.password, 10),
        };
        next();
      }
    }
  },
  decrypt: async (password, hashPassword) => {
    return await bcrypt.compareSync(password, hashPassword);
  },
};
