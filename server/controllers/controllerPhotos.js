const asyncHandler = require('express-async-handler');
const db = require('../models');
const { v4: uuid } = require('uuid');
const Sequelize = require('sequelize');
const deleteImages = require('../utils/deleteImages');
const imageResize = require('../middlewares/middlewareSharp');

module.exports = {
  // PHOTOS DELETE ALBUM
  // PRIVATE ROUTES
  controllerPhotosDeleteAlbum: asyncHandler(async (req, res) => {
    const ids = await req.body.map((photo) => {
      return photo.id;
    });
    const user = await db.user.findOne({ where: { id: req.user.id } });
    await deleteImages(`./users/${user.username}/${req.body[0].album}`);
    await db.photo.destroy({ where: { id: ids } });
    res.status(200).send([]);
  }),
  // PHOTOS POST CREATE ALBUM
  // PRIVATE ROUTES
  controllerPhotosCreateAlbum: asyncHandler(async (req, res) => {
    console.log({ album: req.headers.album, files: req.files });
    const user = await db.user.findOne({
      where: { id: req.user.id },
    });
    const forPost = [];
    const album = req.headers.album || Date.now();
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
        post_id: null,
        id: uuid(),
      });

      deleteImages(path);
    }

    const createdAlbum = await db.photo.bulkCreate(forPost);

    res.status(200).send(createdAlbum);
  }),
  // GET PHOTOS BY ALBUM
  // PRIVATE ROUTES
  controllerGetPhotosByAlbum: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });

    const photosAlbums = await db.photo.findAll({
      group: ['album'],
      attributes: ['album', [Sequelize.fn('COUNT', 'album'), 'count']],
      raw: true,
      where: { user_id: user.id },
      returning: true,
      order: [['album', 'ASC']],
    });

    const allPhotos = await db.photo.findAll({
      where: { user_id: user.id },
      offset: 0,
      limit: 100,
      order: [['createdAt', 'DESC']],
    });

    if (photosAlbums) {
      res.status(200).json({ albums: photosAlbums, photos: allPhotos });
    }
  }),
};
