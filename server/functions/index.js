const express = require('express')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  return next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./controller/index')(app)
app.get('/', (req,res)=>{
  return res.send('heyall')
})

exports.app = functions.https.onRequest(app)
