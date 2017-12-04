var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Avatar = sequelize.define('avatar', {
        fb_avatar: Sequelize.STRING
    })

    return Avatar;
};

module.exports = ex;
