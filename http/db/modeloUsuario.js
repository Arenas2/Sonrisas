var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Usuario = sequelize.define('usuario', {
        nombre: Sequelize.STRING,
        correo: Sequelize.STRING,
        fb_id: Sequelize.STRING,
		fb_token: Sequelize.INTEGER,
        password: Sequelize.STRING,
        tipo: Sequelize.STRING,
        apellidos: Sequelize.STRING,
        edad: Sequelize.INTEGER,
        foto: Sequelize.STRING
    })

    return Usuario;
};

module.exports = ex;
