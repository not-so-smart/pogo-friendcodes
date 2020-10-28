import { Sequelize } from 'sequelize';

export default new Sequelize('database', 'user', 'password', {
    dialect: 'sqlite',
    storage: '../database.sqlite',
    define: {
        freezeTableName: true
    }
});