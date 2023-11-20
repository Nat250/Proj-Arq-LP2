// O barramento de eventos está assim porque estou tentando entendê-lo
// Com certeza não vai estar desse jeito assim que eu implementá-lo corretamente
// Não tenho conseguido entender o exemplo do professor Bossini
// Então implementei o código do github dele para tentar ver como tudo se encaixa

require('dotenv').config()
const { default: axios } = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
const eventos = []
const PORT = process.env.PORT || 10000

app.post('/eventos', async (req, res) => {
    const evento = req.body
    eventos.push(evento)
    console.log(evento)
    //aplicativo
    try{
      await axios.post('http://localhost:4000/eventos', evento)
    }
    catch(e){}
  
    //keywords_extracao
    try{
      await axios.post('http://localhost:5000/eventos', evento)
    }
    catch(e){}
  
    //consulta
    try{
      await axios.post('http://localhost:6000/eventos', evento)
    } catch(e){}
  
    res.status(200).send({msg: 'ok'})
  })
  
  app.get('/eventos', (req, res) => {
    res.json(eventos)
  })
  
  app.listen(
    PORT,
    () => console.log(`Barramento de eventos. ${PORT}.`)
  )
  