import React, { useState } from 'react';

const HtmlStorageService = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [savedPageId, setSavedPageId] = useState('');

  const savePage = () => {
    fetch('http://localhost:7000/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `htmlContent=${encodeURIComponent(htmlContent)}`,
    })
    .then(response => response.json())
    .then(data => {
      console.log('Página salva com sucesso. ID:', data.id);
      setSavedPageId(data.id);
    })
    .catch(error => {
      console.error('Erro ao salvar a página:', error);
    });
  };

  const loadPage = (pageId) => {
    fetch(`http://localhost:7000/page/${pageId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar a página.');
      }
      return response.text();
    })
    .then(htmlContent => {
      // Atualizar o estado com o conteúdo da página carregada
      setHtmlContent(htmlContent);
      console.log('Página carregada com sucesso.');
    })
    .catch(error => {
      console.error('Erro ao carregar a página:', error);
    });
  };

  return (
    <div>
      <h2>Armazenamento de HTML</h2>
      <label htmlFor="htmlContent">Conteúdo HTML:</label>
      <textarea
        id="htmlContent"
        rows="4"
        cols="50"
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
      ></textarea>
      <br />
      <button onClick={savePage}>Salvar Página</button>
      <br />
      {savedPageId && (
        <div>
          <p>Página salva com sucesso. ID: {savedPageId}</p>
          <button onClick={() => loadPage(savedPageId)}>Carregar Página</button>
        </div>
      )}
    </div>
  );
};

export default HtmlStorageService;
