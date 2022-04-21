const asyncHandler = require('express-async-handler');
const db = require('../models');
const { v4: uuid } = require('uuid');

module.exports = {
  // LIKE POST
  // PRIVATE ROUTES
  controllerLikeOrRemovePost: asyncHandler(async (req, res) => {
    const isLiked = await db.like.findOne({
      where: { user_id: req.body.user_id, post_id: req.body.post_id },
    });
    if (!isLiked) {
      const like = await db.like.create({
        id: uuid(),
        user_id: req.body.user_id,
        post_id: req.body.post_id,
      });
      res.status(201).send(like);
      return;
    } else {
      const remove = await db.like.destroy({
        where: {
          id: isLiked.id,
        },
      });
      res.send(`${remove}`);
      console.log(remove);
      return;
    }
  }),
};
