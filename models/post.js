module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "General"
      },
      word: {
          type: DataTypes.STRING,
          allowNull: false
      }
    });
    
    Post.associate = function (models) {
        Post.belongsTo(models.User);
      };
  
    return Post;
  };