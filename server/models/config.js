module.exports = (sequelize, DataTypes) => {
  const config = sequelize.define('config', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return config;
};
