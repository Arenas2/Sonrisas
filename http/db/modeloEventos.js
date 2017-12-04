var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Eventos = sequelize.define('Eventos', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        descripcion: Sequelize.STRING,
        fecha: Sequelize.DATE,
		status: Sequelize.INTEGER

    })

    return Eventos;
};

module.exports = ex;
