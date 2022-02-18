const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class loggedUser extends Model {
  checkPassword(loginPw) {
    return loginPw, this.password;
  }
}
loggedUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    // hooks: {
    //   // async beforeCreate(newUser) {
    //   //   newUser.password = await bcrypt.hash(newUser.password, 10);
    //   //   return newUser;
    //   // },

    //   async beforeUpdate(updatedUser) {
    //     updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
    //     return updatedUser;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "loggeduser",
  }
);

module.exports = loggedUser;
