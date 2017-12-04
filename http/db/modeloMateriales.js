var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Materiales = sequelize.define('materiales', {
        nombre: Sequelize.STRING,
        cantidad: Sequelize.INTEGER,
        tipo: Sequelize.STRING,
    })

    return Materiales;
};

module.exports = ex;
