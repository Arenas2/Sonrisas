var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Proyectos = sequelize.define('Proyectos', {
        //id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        descripcion: Sequelize.STRING,
        status_actual: Sequelize.INTEGER,
        campana_actual: Sequelize.INTEGER,
        area_actual: Sequelize.INTEGER

    })

    return Proyectos;
};

module.exports = ex;
