const express = require('express');
const keywordService = require('./keywords_extracao');
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
