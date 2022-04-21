const {
  controllerGetPhotosByAlbum,
  controllerPhotosCreateAlbum,
} = require('../controllers/controllerPhotos');
const { auth } = require('../middlewares/middlewareAuth');
const { upload } = require('../middlewares/middlewareMulter');

const router = require('express').Router();

router.post('/', auth, upload.array('images', 60), controllerPhotosCreateAlbum);
router.get('/:username', auth, controllerGetPhotosByAlbum);

module.exports = router;
