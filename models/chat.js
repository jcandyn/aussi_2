
module.exports = function (sequelize, Datatypes) {
    var Chat = sequelize.define("Chat", {
        username_chat: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true
        },
        message: {
            type: Datatypes.TEXT,
            allowNull: false,
            validate: {
                len: [1, 75]
            }
        }
    });
  
    return Chat;
  };