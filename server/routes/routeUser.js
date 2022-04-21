const router = require('express').Router();
const {
  controllerRegisterUser,
  controllerLoginUser,
  controllerVerification,
  controllerCheckUsername,
  controllerCheckEmail,
  controllerUpdateProfileAvatar,
  controllerUpdateProfileWallpaper,
  controllerUpdateProfileInfo,
  controllerGetSingleUser,
  controllerSearchUsers,
} = require('../controllers/controllerUsers');
const { auth } = require('../middlewares/middlewareAuth');
const { encrypt } = require('../middlewares/middlewareBcrypt');
const { upload } = require('../middlewares/middlewareMulter');

router.get('/search/:term', controllerSearchUsers);
router.get('/:username', auth, controllerGetSingleUser);
router.post('/register', encrypt, controllerRegisterUser);
router.post('/login', controllerLoginUser);
router.put('/verify', controllerVerification);
router.get('/username/:username', controllerCheckUsername);
router.get('/email/:email', controllerCheckEmail);
router.put('/info', auth, controllerUpdateProfileInfo);
router.post(
  '/avatar',
  auth,
  upload.single('image'),
  controllerUpdateProfileAvatar
);
router.post(
  '/wallpaper',
  auth,
  upload.single('image'),
  controllerUpdateProfileWallpaper
);

module.exports = router;
