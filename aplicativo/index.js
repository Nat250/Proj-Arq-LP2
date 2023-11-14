require('dotenv').config();
const { default: axios } = require('axios')


const express = require('express');
// const keywordService = require('./keywords_extracao');
const app = express();
const port = 3000;
app.use(express.json());
app.post('/keywords', (req, res) => {
  const text = req.body.text;
  const keywords = keywordService.extractKeywords(text);
  res.json({ keywords });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Alterações do Marcel

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
