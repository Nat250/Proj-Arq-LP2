require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())

const baseConsulta = {}

app.get("/aplicativo", (req, res) => {

});

app.post('/eventos', function (req, res){
    console.log(req.body)
    res.status(200).send({msg: 'ok'})
  })
  
  const PORT = process.env.PORT || 6000
  
  app.listen(PORT, () => console.log(`Consulta. ${PORT}`))