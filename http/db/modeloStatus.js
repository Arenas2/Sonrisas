var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Status = sequelize.define('Status', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        
    })

    return Status;
};

module.exports = ex;