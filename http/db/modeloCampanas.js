var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Campana = sequelize.define('Campana', {
      //  id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        descripcion: Sequelize.STRING,
        //logo: Sequelize.BLOB('medium'),
        logo: {
            type: Sequelize.BLOB('medium'),
            get() {
                var imagenBin = this.getDataValue('logo');
                var Imagenes = new Buffer(imagenBin).toString('ascii');
                return Imagenes
            },
        },
        fecha: Sequelize.DATE,
    })

    return Campana;
};

module.exports = ex;
