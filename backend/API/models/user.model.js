module.exports = function(sequelize, Sequelize) {
    let User = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
        nome: { type: Sequelize.STRING, allowNull: false },
        numero: { type: Sequelize.STRING, allowNull: false },
        email: { type: Sequelize.STRING, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
        last_login: { type: Sequelize.DATE },
        status: { type: Sequelize.ENUM('active', 'inactive'), defaultValue: 'active' }
    });
    return User;
}
