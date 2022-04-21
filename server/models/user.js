module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    civil: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'single',
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'male',
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hobbies: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_activated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    wallpaper: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return user;
};
