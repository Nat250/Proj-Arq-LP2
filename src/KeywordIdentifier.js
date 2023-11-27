// KeywordIdentifier.js
import React, { useState } from 'react';

const KeywordIdentifier = () => {
  const [text, setText] = useState('');
  const [keywords, setKeywords] = useState('');
  const [result, setResult] = useState('');

  const identificarPalavrasChave = () => {
    fetch('http://localhost:7000/identify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
    })
    .then(response => response.json())
    .then(data => {
      setResult(data.keywords.join(', '));
    })
    .catch(error => {
      console.error('Erro ao identificar palavras-chave:', error);
    });
  };

  return (
    <div>
      <h2>Identificador de Palavras-Chave</h2>
      <label htmlFor="texto">Insira seu texto:</label>
      <textarea id="texto" rows="4" cols="50" value={text} onChange={e => setText(e.target.value)}></textarea>
      <br />
      <label htmlFor="palavrasChave">Palavras-Chave (separadas por vírgulas):</label>
      // <input type="text" id="palavrasChave" value={keywords} onChange={e => setKeywords(e.target.value)} />
      // <br />
      // <button onClick={identificarPalavrasChave}>Identificar Palavras-Chave</button>
      <p>Resultado: {result}</p>
    </div>
  );
};

export default KeywordIdentifier;
