module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
  return post;
};
