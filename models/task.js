const db = require('./database')

const Task = db.sequelize.define('tarefas',{
    nome:{
        type: db.Sequelize.STRING
    },
    data:{
        type: db.Sequelize.DATE
    },
    concluida:{
        type: db.Sequelize.BOOLEAN
    },
    conteudo:{
        type: db.Sequelize.TEXT
    }
})

// Task.sync({force: true})

module.exports = Task;