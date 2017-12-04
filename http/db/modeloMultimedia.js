var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Multimedia = sequelize.define('multimedia', {
        filkr: Sequelize.STRING,
        vimeo: Sequelize.INTEGER,
    })

    return Multimedia;
};

module.exports = ex;
