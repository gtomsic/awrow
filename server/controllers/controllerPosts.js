const asyncHandler = require('express-async-handler');
const Op = require('sequelize').Op;
const fs = require('fs');
const { v4: uuid } = require('uuid');
const Sequelize = require('sequelize');
const imageResize = require('../middlewares/middlewareSharp');

const db = require('../models');
const deleteImages = require('../utils/deleteImages');

module.exports = {
  // FIND ALL POST OF YOU FAN OF
  // PRIVATE ROUTES
  controllerFindAllPostOfYouFan: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });
    const allIds = await db.follower.findAll({
      where: { user_id: user.id },
      offset: 0,
      limit: 100,
    });

    const arrayOfIds = allIds.map((id) => id.followed_id);

    const findAllTheirPost = await db.post.findAll({
      where: { user_id: arrayOfIds },
      include: [db.photo, db.like, db.user, db.comment],
      order: [['createdAt', 'DESC']],
      offset: 0,
      limit: 100,
    });
    res.status(200).send(findAllTheirPost);
  }),

  // COUNT YOU FAN OF
  // PRIVATE ROUTES
  controllerPostCountAll: asyncHandler(async (req, res) => {
    const postCount = await db.post.findAll({
      where: { user_id: req.user.id },
      group: ['user_id'],
      attributes: [
        'user_id',
        [Sequelize.fn('COUNT', `${req.user.id}`), 'count'],
      ],
      raw: true,
    });
    if (postCount) {
      res.status(200).send(postCount);
      return;
    } else {
      res.status(200).send(0);
      return;
    }
  }),
  // POST UPDATE BODY
  // PRIVATE ROUTES
  controllerPostEditBody: asyncHandler(async (req, res) => {
    const updateBody = await db.post.update(
      { body: req.body.body },
      {
        where: { id: req.body.id },
        include: [db.photo, db.like, db.user, db.comment],
        returning: true,
        raw: true,
        plain: true,
        order: [[{ model: db.comment }, 'updatedAt', 'DESC']],
      }
    );
    res.status(200).send(updateBody);
  }),

  // DELETE SINGLE PHOTO
  // PRIVATE ROUTES
  controllerDeletePhoto: asyncHandler(async (req, res) => {
    const path = req.body.images.replace('images', './users');
    await deleteImages(path);
    await db.photo.destroy({
      where: { id: req.body.id },
    });
    res.status(200).send('Photo Deleted');
  }),

  // GET SINGLE POST
  // PRIVATE ROUTES
  controllerGetSinglePost: asyncHandler(async (req, res) => {
    const getSinglePost = await db.post.findOne({
      where: { id: req.params.post_id },
      include: [db.photo, db.like, db.user, db.comment],
      order: [[{ model: db.comment }, 'updatedAt', 'DESC']],
    });
    res.status(200).json(getSinglePost);
  }),

  // POST DELETE POST AND PHOTOS
  // PRIVATE ROUTES
  controllerDeletePostAndPhotos: asyncHandler(async (req, res) => {
    const postTobeDeleted = await db.post.findOne({
      where: { id: req.params.post_id, user_id: req.user.id },
      include: [db.photo],
      order: [['createdAt', 'DESC']],
    });

    const data = await postTobeDeleted.photos.map((photo) => {
      return { ...photo, images: photo.images.replace('images', './users') };
    });

    await data.forEach((item) => deleteImages(item.images));
    const deletePost = await db.post.destroy({
      where: { id: req.params.post_id },
    });

    if (deletePost) {
      res.status(200).send('Deleted');
    }
  }),

  // GET ALL POSTS
  // PRIVATE ROUTES
  controllerGetAllPosts: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });
    const getAllPostsData = await db.post.findAll({
      where: {
        user_id: user.id,
      },
      include: [db.photo, db.comment, db.like, db.user],
      order: [['createdAt', 'DESC']],
    });
    if (getAllPostsData) {
      res.status(200).send(getAllPostsData);
    } else {
      res.status(200).send(`${[]}`);
    }
  }),

  // POST CREATE POST ITEM
  // PRIVATE ROUTES
  controllerCreatePostItem: asyncHandler(async (req, res) => {
    const { body, photos } = req.body;
    const post = await db.post.create({
      body,
      user_id: req.user.id,
      id: uuid(),
    });
    const getSinglePost = await db.post.findOne({
      where: { id: post.id },
      include: [db.photo, db.like, db.user, db.comment],
      order: [[{ model: db.comment }, 'updatedAt', 'DESC']],
    });
    const newData = [];

    if (photos.length > 0) {
      photos.map((photo) => {
        return newData.push({
          ...photo,
          post_id: post.id,
          body: post.body,
          id: uuid(),
        });
      });
      await db.photo.bulkCreate(newData);

      const getPostData = await db.post.findOne({
        where: { id: post.id },
        include: [db.photo, db.like, db.user, db.comment],
        order: [[{ model: db.comment }, 'updatedAt', 'DESC']],
      });
      res.status(201).send(getPostData);
      return;
    } else {
      res.status(201).send(getSinglePost);
    }
  }),
  // POST CANCEL PHOTOS
  // PRIVATE ROUTES
  controllerCancelPhotos: asyncHandler(async (req, res) => {
    const data = await req.body.map((photo) => {
      return { ...photo, images: photo.images.replace('images', './users') };
    });
    await data.forEach((item) => deleteImages(item.images));
    res.status(200).send([]);
  }),
  // POST PREPARE PHOTOS
  // PRIVATE ROUTES
  controllerPreparePhotos: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { id: req.user.id },
    });
    const forPost = [];
    const album = 'posts';
    for (let i = 0; i < req.files.length; i++) {
      const fileName = uuid();
      const location = `./users/${user.username}/${album}/${fileName}.jpg`;
      const path = req.files[i].path;
      await imageResize({
        path,
        width: null,
        height: 900,
        quality: 100,
        album,
        location,
        username: user.username,
      });

      forPost.push({
        images: `images/${user.username}/${album}/${fileName}.jpg`,
        album,
        user_id: req.user.id,
      });

      deleteImages(path);
    }

    res.status(200).send(forPost);
  }),
};
