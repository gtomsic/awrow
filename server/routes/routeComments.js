const { auth } = require('../middlewares/middlewareAuth');

const {
  controllerPostComment,
  controllerPostEditComment,
  controllerPostDeleteComment,
  controllerCommentsTopTalk,
} = require('../controllers/controllerComments');

const router = require('express').Router();

router.get('/', controllerCommentsTopTalk);
router.delete('/:id', auth, controllerPostDeleteComment);
router.put('/', auth, controllerPostEditComment);
router.post('/', auth, controllerPostComment);

module.exports = router;
