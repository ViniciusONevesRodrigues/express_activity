const express = require('express');
const moment = require('moment');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Task = require('./models/task');

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        formatDateEn: (date) => {
            return moment.utc(date).format('YYYY-MM-DD');
        },
        formatDateBr: (date) => {
            return moment.utc(date).format('DD/MM/YYYY');
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));
app.use('/js', express.static('public/js'));


app.get('/', (req, res) => {
    Task.findAll().then((tasks) => {
        tasks = tasks.map((task) => { return task.toJSON(); });
        res.render('home', { tasks: tasks });
    });
});


app.get('/tarefa', (req, res) => {
    res.render('tarefa');
})

app.post('/add', (req, res) => {

    const concluida = req.body.concluida === 'on' ? true : false;

    Task.create({
        nome: req.body.nome,
        data: req.body.data,
        concluida: concluida,
        conteudo: req.body.conteudo
    }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.send('Erro ao cadastrar a tarefa: ' + err);
    });
});

app.get('/deletar/:id', (req, res) => {
    Task.destroy({
        where: { 'id': req.params.id }
    }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        res.send('Erro ao deletar a tarefa: ' + err);
    });
})
app.get('/alterar/:id', (req, res) => {
    Task.findAll({ where: { 'id': req.params.id } }).then(function (tasks) {
        tasks = tasks.map((task) => { return task.toJSON() })
        res.render('alterar', { tasks: tasks })
    })
})

app.post('/update', (req, res) => {

    const concluida = req.body.concluida === 'on' ? true : false;

    Task.update({
        nome: req.body.nome,
        data: req.body.data,
        concluida: concluida,
        conteudo: req.body.conteudo
    }, {
        where: { 'id': req.body.id }
    }).then(function () {
        res.redirect('/')
    }).catch(function (err) {
        res.send('Erro ao alterar a tarefa: ' + err)
    })
})


app.listen(8080, () => {
    console.log('Servidor rodando na url http://localhost:8080');
});