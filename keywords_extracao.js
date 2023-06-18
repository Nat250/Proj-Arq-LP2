// Microsserviço de extração de keywords
const natural = require('natural');
natural.PorterStemmer.attach();

// Extraindo keywords
function extractKeywords(text) {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text);
  const stopwords = natural.stopwords;
  const filteredWords = words.filter((word) => !stopwords.includes(word.toLowerCase()));
  const stemmedWords = filteredWords.map((word) => word.stem());
  const wordFrequency = {};
  stemmedWords.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });
  const sortedKeywords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
  return sortedKeywords.slice(0, 5);
}

module.exports = { extractKeywords };

