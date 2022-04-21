require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const colors = require('colors');
const path = require('path');

const db = require('./models');
const {
  notFound,
  errorHandler,
} = require('./middlewares/middlewareErrorHandler');

const app = express();

// Using middleware here
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Urcups server is running...');
});
app.use('/images', express.static(path.join(__dirname, 'users')));

const routeUsers = require('./routes/routeUser');
const routePosts = require('./routes/routePosts');
const routeComments = require('./routes/routeComments');
const routeLikes = require('./routes/routeLikes');
const routePhotos = require('./routes/routePhotos');
const routeFollowers = require('./routes/routeFollowers');

// User routes
app.use('/api/users', routeUsers);
app.use('/api/posts', routePosts);
app.use('/api/comments', routeComments);
app.use('/api/likes', routeLikes);
app.use('/api/photos', routePhotos);
app.use('/api/followers', routeFollowers);

// Using middle url not found || 404
// Server error handler
app.use(errorHandler);
app.use(notFound);

db.user.hasOne(db.config, { foreignKey: 'user_id', onDelete: 'cascade' });
db.user.hasMany(db.post, { foreignKey: 'user_id', onDelete: 'cascade' });
db.user.hasMany(db.photo, { foreignKey: 'user_id', onDelete: 'cascade' });
db.user.hasMany(db.follower, { foreignKey: 'user_id', onDelete: 'cascade' });
db.user.hasMany(db.comment, { foreignKey: 'user_id', onDelete: 'cascade' });
db.user.hasMany(db.like, { foreignKey: 'user_id', onDelete: 'cascade' });

db.post.hasMany(db.comment, { foreignKey: 'post_id', onDelete: 'cascade' });
db.post.hasMany(db.like, { foreignKey: 'post_id', onDelete: 'cascade' });
db.post.hasMany(db.photo, { foreignKey: 'post_id', onDelete: 'cascade' });
db.photo.hasMany(db.like, { foreignKey: 'post_id', onDelete: 'cascade' });
db.photo.hasMany(db.comment, { foreignKey: 'post_id', onDelete: 'cascade' });

db.config.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' });
db.comment.belongsTo(db.post, { foreignKey: 'post_id', onDelete: 'cascade' });
db.like.belongsTo(db.comment, {
  foreignKey: 'comment_id',
  onDelete: 'cascade',
});
db.like.belongsTo(db.post, { foreignKey: 'post_id', onDelete: 'cascade' });
db.like.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' });
db.post.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' });
db.photo.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' });
db.follower.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' });
db.comment.belongsTo(db.user, { foreignKey: 'user_id', onDelete: 'cascade' });

const PORT = process.env.PORT || 8000;

// Create a http server manually
const server = http.createServer(app);

db.sequelize
  .sync()
  .then(() => server.listen(PORT, console.log(`awrow server running ${PORT}`)));
