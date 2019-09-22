var bcrypt = require("bcryptjs");

module.exports = function (sequelize, Datatypes) {
    var User = sequelize.define("User", {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
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
        name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_bio: {
            type: Datatypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                len: [1]
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 16],
                notContains: [
                    "fuck", "shit", "bitch", "ass", "phuk", "fuk", "sheit", "sheeeit", "shat", "schit", "shitt", "biiiiitch", "betch", "bich"
                ],
            }
        },
        user_identifier: {
            type: Datatypes.BIGINT,
            allowNull: false,
            validate: {
                isInt: true,
                len: [8, 12]
            }
        }
    });


    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    //       // Hooks are automatic methods that run during various phases of the User Model lifecycle
    //       // In this case, before a User is created, we will automatically hash their password

    //   User.hook("beforeCreate", function(user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    //   });
    User.beforeCreate(user => {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    // User.associate = function (models) {
    //     User.hasMany(models.Event, {
    //         onDelete: "cascade",
    //     })
    // };
// 
    return User;
};