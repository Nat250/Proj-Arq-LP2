import React from 'react';
import HtmlStorageService from './HtmlStorageService';
import KeywordIdentifier from './KeywordIdentifier';

function App() {
  return (
    <div>
      <HtmlStorageService />
      <hr /> {/* Adiciona uma linha horizontal para separar os dois componentes */}
      <KeywordIdentifier />
    </div>
  );
}

export default App;
