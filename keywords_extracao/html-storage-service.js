const express = require('express');
const Datastore = require('nedb');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const db = new Datastore({ filename: 'html-database.db', autoload: true });

app.post('/save', (req, res) => {
    const { htmlContent } = req.body;
    const page = { htmlContent, timestamp: Date.now() };

    db.insert(page, (err, newPage) => {
        if (err) {
            res.status(500).send('Erro ao salvar a página.');
        } else {
            res.json({ id: newPage._id });
        }
    });
});

app.get('/page/:id', (req, res) => {
    const pageId = req.params.id;

    db.findOne({ _id: pageId }, (err, page) => {
        if (err || !page) {
            res.status(404).send('Página não encontrada.');
        } else {
            res.send(page.htmlContent);
        }
    });
});

app.listen(port, () => {
    console.log(`Microsserviço de Armazenamento de HTML rodando em http://localhost:${port}`);
});