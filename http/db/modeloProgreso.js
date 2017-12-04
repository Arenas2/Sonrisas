var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Progreso = sequelize.define('Progreso', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        reportes_avance: Sequelize.STRING,
        fechas_avance: Sequelize.DATE,
    })

    return Progreso;
};

module.exports = ex;