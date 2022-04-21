const asyncHandler = require('express-async-handler');
const Op = require('sequelize').Op;
const fs = require('fs');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

const db = require('../models');

const { makeToken } = require('../middlewares/middlewareJWT');
const { decrypt } = require('../middlewares/middlewareBcrypt');
const { sendEmail } = require('../utils/nodemailer');
const { htmlRegister } = require('../html/register');
const imageResize = require('../middlewares/middlewareSharp');
const deleteImages = require('../utils/deleteImages');

module.exports = {
  // SEARCH USERS
  // PRIVATE ROUTES
  controllerSearchUsers: asyncHandler(async (req, res) => {
    const users = await db.user.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: `${req.params.term}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${req.params.term}%`,
            },
          },
        ],
      },
      limit: 20,
    });
    res.status(200).send(users);
  }),

  // USER GET SINGLE USER
  // PRIVATE ROUTES
  controllerGetSingleUser: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });
    res.status(200).send(user);
  }),

  // USER UPDATE PROFILE INFO
  // PRIVATE ROUTES
  controllerUpdateProfileInfo: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { id: req.user.id },
    });
    if (!user) {
      throw new Error('Sorry user not found!');
    }
    await db.user.update(
      {
        ...req.body,
      },
      { where: { id: req.user.id } }
    );
    const updatedUser = await db.user.findOne({
      where: { id: req.user.id },
    });
    res.status(200).send(updatedUser);
  }),

  // USER UPDATE PROFILE WALLPAPER
  // PRIVATE ROUTES
  controllerUpdateProfileWallpaper: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { id: req.user.id },
    });
    const fileName = uuid();
    const album = 'wallpaper';
    const path = req.file.path;
    const location = `./users/${user.username}/${album}/${fileName}.jpg`;

    await imageResize({
      path,
      width: 1200,
      height: 500,
      quality: 100,
      album,
      location,
      username: user.username,
    });

    deleteImages(path);

    await db.user.update(
      {
        wallpaper: `images/${user.username}/${album}/${fileName}.jpg`,
      },
      { where: { id: req.user.id } }
    );
    const updateUser = await db.user.findOne({
      where: { id: req.user.id },
    });
    res.status(200).send(updateUser);
  }),

  // USER UPDATE PROFILE AVATAR
  // PRIVATE ROUTES
  controllerUpdateProfileAvatar: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: { id: req.user.id },
    });
    const fileName = uuid();
    const album = 'avatar';
    const path = req.file.path;
    const location = `./users/${user.username}/${album}/${fileName}.jpg`;

    await imageResize({
      path,
      width: 250,
      height: 250,
      quality: 100,
      album,
      location,
      username: user.username,
    });

    deleteImages(path);

    await db.user.update(
      {
        avatar: `images/${user.username}/${album}/${fileName}.jpg`,
      },
      { where: { id: req.user.id } }
    );
    const updateUser = await db.user.findOne({
      where: { id: req.user.id },
    });
    res.status(200).json(updateUser);
  }),

  // USER CHECK USEREMAIL
  // PUBLIC ROUTES
  controllerCheckEmail: asyncHandler(async (req, res) => {
    const checkUser = await db.user.findOne({
      where: { email: req.params.email },
    });
    if (checkUser && checkUser.email === req.params.email) {
      res.json({ email: 'Already exist' });
      return;
    } else {
      res.json({ email: 'Available' });
      return;
    }
  }),
  // USER CHECK USERNAME
  // PUBLIC ROUTES
  controllerCheckUsername: asyncHandler(async (req, res) => {
    const checkUser = await db.user.findOne({
      where: { username: req.params.username },
    });
    if (checkUser && checkUser.username === req.params.username) {
      res.json({ username: 'Already exist' });
      return;
    } else {
      res.json({ username: 'Available' });
      return;
    }
  }),
  // USER VERIFICATION
  // PUBLIC ROUTES
  controllerVerification: asyncHandler(async (req, res) => {
    const checkUser = await db.user.findOne({
      where: { id: req.body.id, email: req.body.email },
    });
    if (!checkUser.is_activated) {
      await db.user.update(
        { is_activated: Boolean(req.body.is_activated) },
        {
          where: { id: req.body.id, email: req.body.email },
        }
      );
    }
    const verified = await db.user.findOne({
      where: { id: checkUser.id },
    });
    const toLogin = {
      token: makeToken(verified.id),
      id: verified.id,
      name: verified.name,
      email: verified.email,
      username: verified.username,
      civil: verified.civil,
      sex: verified.sex,
      city: verified.city,
      state: verified.state,
      country: verified.country,
      about: verified.about,
      hobbies: verified.hobbies,
      is_activated: verified.is_activated,
      createAt: verified.createAt,
      updatedAt: verified.updatedAt,
      avatar: verified.avatar,
      wallpaper: verified.wallpaper,
    };
    res.status(200).json(toLogin);
  }),
  // USER LOGIN
  // PUBLIC ROUTES
  controllerLoginUser: asyncHandler(async (req, res) => {
    const user = await db.user.findOne({
      where: {
        [Op.or]: [
          { email: req.body.username },
          { username: req.body.username },
        ],
      },
    });
    if (user) {
      if (!user.is_activated) {
        throw new Error(`Please activate your email registration to login.`);
      }
      const passwordHash = await db.config.findOne({
        where: { user_id: `${user.id}` },
      });
      const decoded = await decrypt(req.body.password, passwordHash.password);
      if (decoded) {
        const loginUser = {
          token: makeToken(user.id),
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username,
          civil: user.civil,
          sex: user.sex,
          city: user.city,
          state: user.state,
          country: user.country,
          about: user.about,
          hobbies: user.hobbies,
          is_activated: user.is_activated,
          createAt: user.createAt,
          updatedAt: user.updatedAt,
          avatar: user.avatar,
          wallpaper: user.wallpaper,
        };
        res.status(200).send(loginUser);
      } else {
        throw new Error(`Password or email don't' match`);
      }
    } else {
      throw new Error(`Password or email don't' match`);
    }
  }),

  // USER REGISTRATION
  // PUBLIC ROUTES
  controllerRegisterUser: asyncHandler(async (req, res) => {
    let { name, email, username } = req.body;
    name.trim(' ');
    if (!name) {
      throw new Error('Name is required!!');
    }
    if (name.length < 5) {
      throw new Error('Full name at least 5 characters');
    }
    if (!email) {
      throw new Error('Email is required!!');
    }
    if (name.split('').includes('@')) {
      throw new Error('Please include a valid email for verification');
    }
    if (!username) {
      throw new Error('Username is required!!');
    }
    if (name.length < 5) {
      throw new Error('Email at least 5 characters');
    }
    const checkEmail = await db.user.findOne({
      where: { email: req.body.email },
    });
    if (checkEmail) {
      res.status(302); // Status 302 is found one
      throw new Error('Email already exist');
    }
    const checkUsername = await db.user.findOne({
      where: { username: req.body.username },
    });

    if (checkUsername) {
      res.status(302);
      throw new Error('Username already exist');
    }
    const user = await db.user.create({ ...req.body, id: uuid() });
    // Create a user folder
    // Link to users_id
    let dir = `./users/${user.username}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const createdUser = {
      token: makeToken(user.id),
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      civil: user.civil,
      sex: user.sex,
      city: user.city,
      state: user.state,
      country: user.country,
      about: user.about,
      hobbies: user.hobbies,
      is_activated: user.is_activated,
      createAt: user.createAt,
      updatedAt: user.updatedAt,
      avatar: user.avatar,
      wallpaper: user.wallpaper,
    };
    if (user) {
      const saveConfig = await db.config.create({
        id: uuid(),
        user_id: user.id,
        password: req.body.password,
        avatar: process.env.SERVER_HOST + `/images/1defaults/profile.jpg`,
        wallpaper: process.env.SERVER_HOST + `/images/1defaults/wallpaper.jpg`,
        is_admin: false,
        ip: req.headers.host,
      });

      // Sending verfication email
      sendEmail(
        user.email,
        'Urcups Email Verification',
        htmlRegister({
          name: user.name,
          header: 'Urcups email verification!',
          link: `${process.env.WEBSITE_HOST}/verify/${user.id}/true/${user.email}`,
          message: `Please verify your email to login!`,
        })
      );

      saveConfig && res.status(201).json(createdUser);
    } else {
      res.status(500);
      throw new Error('Server problem try again later.');
    }
  }),
};
