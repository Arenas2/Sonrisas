var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Donativo = sequelize.define('Donativo', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        tipo: Sequelize.STRING,
        monto: Sequelize.FLOAT,
    })

    return Donativo;
};

module.exports = ex;