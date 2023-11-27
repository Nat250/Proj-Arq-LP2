// gateway.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

let fetch;
try {
  // Tenta importar usando import
  import('node-fetch')
    .then((module) => {
      fetch = module.default;
      startServer();
    })
    .catch((error) => {
      console.error('Erro ao importar node-fetch:', error);
    });
} catch (err) {
  console.error('Erro ao importar node-fetch:', err);
}

function startServer() {
  const app = express();
  const port = 7000;

  app.use(cors());
  app.use(bodyParser.json());

// Rota para identificar palavras-chave
app.post('/identify', async (req, res) => {
  try {
    const respKeywords = await fetch(
      'http://localhost:10000/eventos',{
        tipo: 'TextoSubmetido',
        dados: {textid, text}
      })
    const response = await fetch('http://localhost:7001/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.respKeywords.dados.text),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao identificar palavras-chave:', error);
    res.status(500).send('Erro ao identificar palavras-chave');
  }
});

// Rota para salvar página
app.post('/save', async (req, res) => {
  try {
    const response = await fetch('http://localhost:7002/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `htmlContent=${encodeURIComponent(req.body.htmlContent)}`,
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Erro ao salvar a página:', error);
    res.status(500).send('Erro ao salvar a página');
  }
});

// Rota para carregar página
app.get('/page/:id', async (req, res) => {
  const pageId = req.params.id;

  try {
    const response = await fetch(`http://localhost:7002/page/${pageId}`);
    if (!response.ok) {
      throw new Error('Erro ao carregar a página.');
    }
    const htmlContent = await response.text();
    res.send(htmlContent);
  } catch (error) {
    console.error('Erro ao carregar a página:', error);
    res.status(500).send('Erro ao carregar a página');
  }
});

app.listen(port, () => {
  console.log(`Barramento rodando em http://localhost:${port}`);
});
}
