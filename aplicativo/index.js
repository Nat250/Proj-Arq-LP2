require('dotenv').config();
const { default: axios } = require('axios')


const express = require('express');
// const keywordService = require('./keywords_extracao');
const app = express();
const port = 4000;
app.use(express.json());

let textid = 100
const pedido = {}
app.post('/aplicativo', (req, res) => {
  textid = textid + 1
  const text = req.body.text;
  pedido[textid] = {textid, text}
  // const keywords = keywordService.extractKeywords(text);
  axios.post("http://barramento-de-eventos-service:10000/eventos",{
      tipo: 'TextoSubmetido',
      dados: {textid, text}
    }
  )
  // res.json({ keywords });
  res.status(201).json(pedido[textid])
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/aplicativo', (req, res) => {
  res.send(pedido)
})

app.post('/eventos', (req, res) => {
  console.log(req.body)
  res.status(200).json({msg: 'ok'})
})

// Alterações do Marcel
// O código funciona, mas ele fez tudo em html ao invés de Javascript
// E sinceramente não sei como implementar isso no barramento de eventos quando nem sei como tal funciona direito

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Identificador de Palavras-Chave</title>
// </head>
// <body>
//
//     <h2>Identificador de Palavras-Chave</h2>
//     
//     <label for="texto">Insira seu texto:</label>
//     <textarea id="texto" rows="4" cols="50"></textarea>
//    
//     <br>
//    
//     <label for="palavrasChave">Palavras-Chave (separadas por vírgulas):</label>
//     <input type="text" id="palavrasChave">
//     
//     <br>
//     
//     <button onclick="emitirEvento()">Identificar</button>
//     
//     <p id="resultado"></p>
// 
//     <script>
//         // Criar um objeto EventEmitter
//         const eventEmitter = new EventEmitter();
//
//         // Função para identificar palavras-chave e emitir um evento
//         function emitirEvento() {
//             // Obter o texto inserido pelo usuário
//             var texto = document.getElementById("texto").value.toLowerCase();
//            
//             // Obter as palavras-chave e dividi-las em um array
//             var palavrasChave = document.getElementById("palavrasChave").value.toLowerCase().split(",");
//             
//             // Inicializar um array para armazenar palavras-chave encontradas
//             var palavrasChaveEncontradas = [];
//             
//             // Iterar sobre cada palavra-chave e verificar se está presente no texto
//             for (var i = 0; i < palavrasChave.length; i++) {
//                 var palavra = palavrasChave[i].trim(); // Remover espaços em branco extras
//                 if (texto.includes(palavra)) {
//                     palavrasChaveEncontradas.push(palavra);
//                 }
//             }
//             
//             // Emitir um evento com as palavras-chave encontradas
//             eventEmitter.emit('palavrasChaveEncontradas', palavrasChaveEncontradas);
//         }
//
//         // Função para lidar com o evento e exibir o resultado
//         eventEmitter.on('palavrasChaveEncontradas', function(palavrasChaveEncontradas) {
//             var resultado = document.getElementById("resultado");
//             if (palavrasChaveEncontradas.length > 0) {
//                 resultado.textContent = "Palavras-Chave encontradas: " + palavrasChaveEncontradas.join(", ");
//             } else {
//                 resultado.textContent = "Nenhuma Palavra-Chave encontrada.";
//             }
//         });
//     </script>
//
//     <!-- Incluir o script do EventEmitter -->
//     <script src="https://unpkg.com/eventemitter3@4.0.7/dist/umd/eventemitter3.min.js"></script>
// 
// </body>
// </html>
