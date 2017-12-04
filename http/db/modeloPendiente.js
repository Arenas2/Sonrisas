var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Pendiente = sequelize.define('Pendiente', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        objetivos: Sequelize.STRING,
        tareas: Sequelize.STRING,
    })

    return Pendiente;
};

module.exports = ex;
