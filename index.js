const express = require('express')
const mongoose = require('mongoose')
const req = require('express/lib/request')
const res = require('express/lib/response')
const app = express()

// ler Json
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

//rota //endpoint

app.get('/', (req, res) => {
  res.json({ message: 'Escutando 2' })
})

// mongodb+srv://portespaiva:q1w2e3r4@apicluster0.ilwle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//conection banco

const DB_USER = 'portespaiva'
const DB_PASSWORD = 'q1w2e3r4'

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster0.ilwle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )

  .then(() => {
    console.log('conectado com sucesso ao banco')
    app.listen(3000)
  })
  .catch(err => console.log(err))

//porta
// app.listen(3000)

//rotas API

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)
