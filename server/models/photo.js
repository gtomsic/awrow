module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    images: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
  return photo;
};
