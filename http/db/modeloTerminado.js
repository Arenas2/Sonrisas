var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Terminado = sequelize.define('Terminado', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        resultados: Sequelize.STRING,
        duracion: Sequelize.STRING
    })

    return Terminado;
};

module.exports = ex;
