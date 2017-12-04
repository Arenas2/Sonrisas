var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Anecdotas = sequelize.define('Anecdotas', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        contenido: Sequelize.TEXT,
    })

    return Anecdotas;
};

module.exports = ex;
