
module.exports = function (sequelize, Datatypes) {
  var Word = sequelize.define("Word", {
      id: {
          type: Datatypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      word: {
          type: Datatypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
              len: [1, 75],
              notContains: [
                  "fuck", "shit", "bitch", "ass", "phuk", "fuk", "sheit", "sheeeit", "shat", "schit", "shitt", "biiiiitch", "betch", "bich"
              ]
          }
      },
      definition: {
          type: Datatypes.TEXT,
          allowNull: false,
          validate: {
              len: [1]
          }
      },
      ImageURL: {
        type: Datatypes.TEXT,
        allowNull: true,
      }
  });

  return Word;
};