const {
  controllerLikeOrRemovePost,
} = require('../controllers/controllerLikes');
const { auth } = require('../middlewares/middlewareAuth');

const router = require('express').Router();

router.post('/', auth, controllerLikeOrRemovePost);

module.exports = router;
