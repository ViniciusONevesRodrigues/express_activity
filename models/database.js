const Sequelize = require('sequelize')

const sequelize = new Sequelize('tarefas', 'root', '1012', {
    host: "localhost",
    port: "3306",
    dialect: "mysql"
}) 

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}