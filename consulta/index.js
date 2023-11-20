require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const baseDeConsulta = {}

const funcoes = {
    TextoSubmetido: (pedido) => {
      baseDeConsulta[pedido.textid] = pedido
    },
    ExtractKeywords: (keywords) => {
        
    }
}

app.get("/aplicativo", (req, res) => {
    
});

app.post('/eventos', function (req, res){
    console.log(req.body)
    res.status(200).send({msg: 'ok'})
  })
  
  const PORT = process.env.PORT || 6000
  
  app.listen(PORT, () => console.log(`Consulta. ${PORT}`))

//Criar uma pasta chamada consulta -

//Criar a estrutura inicial de um microsserviço -

//Criar um endpoint que recebe eventos

//Criar uma base de dados (um objeto)

//Sempre que uma requisição for recebida pelo endpoint, adicionar esse evento recebido na base consolidada

//Estabelecer um segundo endpoint para que a base pode ser obtida

//Endpoint: GET/keywords