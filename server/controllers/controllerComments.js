const asyncHandler = require('express-async-handler');
const db = require('../models');
const { v4: uuid } = require('uuid');
const Sequelize = require('sequelize');

module.exports = {
  // TOP TALKS
  // PRIVATE ROUTES
  controllerCommentsTopTalk: asyncHandler(async (req, res) => {
    const yourFans = await db.comment.findAll({
      group: ['post_id'],
      attributes: ['post_id', [Sequelize.fn('COUNT', 'post_id'), 'count']],
      order: [[Sequelize.literal('count'), 'DESC']],
      raw: true,
      limit: 10,
    });
    console.log(yourFans);
    if (yourFans) {
      res.status(200).send(yourFans);
      return;
    } else {
      res.status(200).send(false);
      return;
    }
  }),
  // DELETE POST COMMENT
  // PRIVATE ROUTES
  controllerPostDeleteComment: asyncHandler(async (req, res) => {
    const deleted = await db.comment.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).send(`${1}`);
    }
  }),
  // EDIT POST COMMENT
  // PRIVATE ROUTES
  controllerPostEditComment: asyncHandler(async (req, res) => {
    await db.comment.update(
      { ...req.body },
      { where: { id: req.body.id }, returning: true, raw: true, plain: true }
    );
    const updated = await db.comment.findOne({ where: { id: req.body.id } });
    res.send(updated);
  }),
  // POST COMMENT
  // PRIVATE ROUTES
  controllerPostComment: asyncHandler(async (req, res) => {
    const commented = await db.comment.create({ id: uuid(), ...req.body });
    res.status(200).send(commented);
  }),
};
