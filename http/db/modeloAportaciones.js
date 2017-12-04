var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Aportaciones = sequelize.define('Aportaciones', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        contribucion: Sequelize.INTEGER,
    })

    return Aportaciones;
};

module.exports = ex;
