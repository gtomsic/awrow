const router = require('express').Router();

const { auth } = require('../middlewares/middlewareAuth');

const {
  controllerPreparePhotos,
  controllerCancelPhotos,
  controllerCreatePostItem,
  controllerGetAllPosts,
  controllerDeletePostAndPhotos,
  controllerGetSinglePost,
  controllerDeletePhoto,
  controllerPostEditBody,
  controllerPostCountAll,
  controllerFindAllPostOfYouFan,
} = require('../controllers/controllerPosts');
const { upload } = require('../middlewares/middlewareMulter');

router.put('/', auth, controllerPostEditBody);
router.put('/photo', auth, controllerDeletePhoto);
router.get('/count', auth, controllerPostCountAll);
router.get('/allposts/:username', auth, controllerFindAllPostOfYouFan);
router.get('/single/:post_id', auth, controllerGetSinglePost);
router.post('/images/cancel', auth, controllerCancelPhotos);
router.delete('/:post_id', auth, controllerDeletePostAndPhotos);
router.get('/:username', auth, controllerGetAllPosts);
router.post('/', auth, controllerCreatePostItem);
router.post(
  '/images',
  auth,
  upload.array('images', 20),
  controllerPreparePhotos
);

module.exports = router;
