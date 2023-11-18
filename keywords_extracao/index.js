// Alterações do Marcel

const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/identify', (req, res) => {
    const { text, keywords } = req.body;
    const identifiedKeywords = identifyKeywords(text, keywords);
    res.json({ keywords: identifiedKeywords });
});

function identifyKeywords(text, keywords) {
    const textLowerCase = text.toLowerCase();
    const keywordsLowerCase = keywords.map(keyword => keyword.toLowerCase().trim());
    return keywordsLowerCase.filter(keyword => textLowerCase.includes(keyword));
}

app.listen(port, () => {
    console.log(`Microsserviço de Palavras-Chave rodando em http://localhost:${port}`);
});

// // Microsserviço de extração de keywords
// require('dotenv').config()
// const { default: axios } = require('axios')
// const express = require('express')
// const app = express()
// app.use(express.json())

// const natural = require('natural');
// natural.PorterStemmer.attach();

// // Extraindo keywords
// function extractKeywords(text) {
//   const tokenizer = new natural.WordTokenizer();
//   const words = tokenizer.tokenize(text);
//   const stopwords = natural.stopwords;
//   const filteredWords = words.filter((word) => !stopwords.includes(word.toLowerCase()));
//   const stemmedWords = filteredWords.map((word) => word.stem());
//   const wordFrequency = {};
//   stemmedWords.forEach((word) => {
//     wordFrequency[word] = (wordFrequency[word] || 0) + 1;
//   });
//  const sortedKeywords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
//   return sortedKeywords.slice(0, 5);
// }

// module.exports = { extractKeywords };

