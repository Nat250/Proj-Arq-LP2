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
      await axios.post("http://aplicativo-clusterip-service:4000/eventos", evento)
    } catch(e){}
  
    //keywords_extracao
    try{
      await axios.post("http://keywords-extracao-clusterip-service:5000/eventos", evento)
    } catch(e){}
  
    //consulta
    try{
      await axios.post("http://consulta-clusterip-service:6000/eventos", evento)
    } catch(e){}
  
    res.status(200).send({msg: 'ok'})
  })
  
  app.get('/eventos', (req, res) => {
    res.send(eventos)
  })
  
  app.listen(
    PORT,
    () => console.log(`Barramento de eventos. ${PORT}.`)
  )
  