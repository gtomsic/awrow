const asyncHandler = require('express-async-handler');
const db = require('../models');
const Sequelize = require('sequelize');
const { v4: uuid } = require('uuid');
module.exports = {
  // GET ALL FOLLOWERS
  // PRIVATE ROUTES
  controllerFollowerGetAllYouFans: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });
    const followers = await db.follower.findAll({
      where: { user_id: user.id },
    });
    const followersIds = followers.map((id) => id.followed_id);
    const findAllYouFollowed = await db.user.findAll({
      where: { id: followersIds },
    });
    res.status(200).send(findAllYouFollowed);
  }),

  // GET ALL FOLLOWERS
  // PRIVATE ROUTES
  controllerFollowerGetAll: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });
    const followers = await db.follower.findAll({
      where: { followed_id: user.id },
    });
    const followersIds = followers.map((id) => id.user_id);
    const findAllFollowers = await db.user.findAll({
      where: { id: followersIds },
      order: [['name', 'ASC']],
    });
    res.status(200).send(findAllFollowers);
  }),
  // COUNT YOUR FANS
  // PRIVATE ROUTES
  controllerFollowerCountYourFans: asyncHandler(async (req, res) => {
    const yourFans = await db.follower.findAll({
      group: ['followed_id'],
      attributes: [
        'followed_id',
        [Sequelize.fn('COUNT', 'followed_id'), 'count'],
      ],
      raw: true,
      where: { followed_id: req.params.user_id },
    });
    if (yourFans) {
      res.status(200).send(yourFans);
      return;
    } else {
      res.status(200).send(false);
      return;
    }
  }),
  // COUNT YOU FAN OF
  // PRIVATE ROUTES
  controllerFollowerCountFansOf: asyncHandler(async (req, res) => {
    const fanOf = await db.follower.findAll({
      where: { user_id: req.params.user_id },
      group: ['user_id'],
      attributes: [
        'user_id',
        [Sequelize.fn('COUNT', `${req.params.user_id}`), 'count'],
      ],
      raw: true,
    });
    if (fanOf) {
      res.status(200).send(fanOf);
      return;
    } else {
      res.status(200).send(false);
      return;
    }
  }),
  // CHECK IF FAN OF
  // PRIVATE ROUTES
  controllerCheckIfFanOf: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.params.followed_id },
    });
    const fanOf = await db.follower.findOne({
      where: { followed_id: user.id, user_id: req.params.user_id },
    });
    if (fanOf) {
      res.status(200).send(fanOf);
      return;
    } else {
      res.status(200).send(false);
      return;
    }
  }),
  // FOLLOWED OR REMOVE USER
  // PRIVATE ROUTES
  controllerFollowOrRemove: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.body.followed_id },
    });
    const isFollowed = await db.follower.findOne({
      where: { followed_id: user.id, user_id: req.body.user_id },
    });
    if (isFollowed) {
      const remove = await db.follower.destroy({
        where: { id: isFollowed.id },
      });
      if (remove) {
        res.status(200).send(`${1}`);
        return;
      }
    } else {
      const follow = await db.follower.create({
        id: uuid(),
        followed_id: user.id,
        user_id: req.body.user_id,
      });
      if (follow) {
        res.status(201).send(follow);
        return;
      }
    }
  }),
};
