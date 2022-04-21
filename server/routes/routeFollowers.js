const { auth } = require('../middlewares/middlewareAuth');
const {
  controllerFollowOrRemove,
  controllerCheckIfFanOf,
  controllerFollowerCountFansOf,
  controllerFollowerCountYourFans,
  controllerFollowerGetAll,
  controllerFollowerGetAllYouFans,
} = require('../controllers/controllerFollowers');

const router = require('express').Router();

router.post('/', auth, controllerFollowOrRemove);
router.get(
  '/get_all_you_fan_of/:username',
  auth,
  controllerFollowerGetAllYouFans
);
router.get('/get_all/:username', auth, controllerFollowerGetAll);
router.get('/fans_of/:user_id', auth, controllerFollowerCountFansOf);
router.get('/your_fans/:user_id', auth, controllerFollowerCountYourFans);
router.get('/:followed_id/:user_id', auth, controllerCheckIfFanOf);

module.exports = router;
