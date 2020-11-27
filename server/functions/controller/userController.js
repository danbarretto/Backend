const express = require('express')
const router = express.Router()
const admin = require('./admin')
const verifyMiddleware = require('../middleware/verifyToken')
const axios = require('axios').default
const apikey = require('../config/apikey.json')

router.use(verifyMiddleware)

router.get('/', async(req, res)=>{
  console.log('validating token')
  return res.send({message:'Your token is valid!'})
})

router.post('/addUserToDb', async (req, res) => {
  const { userName } = req.body
  const { uid } = req.user
  console.log(req.body)
  admin
    .firestore()
    .collection('users')
    .doc(uid)
    .set({
      userName,
    })
    .then(() => {
      return res.send({ message: 'Usuário criado com sucesso!' })
    })
    .catch((err) => {
      return res
        .status(400)
        .send({ message: `Erro ao criar usuário! ${err.message}` })
    })
})

router.post('/addCryptoCurrency', async (req, res) => {
  const { currency, qtd } = req.body
  const { uid } = req.user
  const userRef = await admin.firestore().collection('users').doc(uid).get()
  let oldCurrencies = userRef.get('currencies')
  if (userRef.exists) {
    for (curr of oldCurrencies) {
      if (curr.Name === currency.toUpperCase()) {
        return res.send({ message: 'Você já possui esta moeda!' })
      }
    }

    axios
      .get(
        `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=BRL`,
        apikey
      )
      .then((result) => {
        if (result.data.Response !== 'Error') {
          oldCurrencies.push({ Name: currency.toUpperCase(), Quantidade: qtd })
          userRef.ref
            .set({ currencies: oldCurrencies })
            .then(() => {
              return res.sendStatus(200)
            })
            .catch((err) => {
              return res.send({ message: 'Erro ao salvar moeda' })
            })
        } else return res.send({ message: 'Moeda não encontrada!' })
      })
  }
})

router.get('/getCurrencies', async (req, res) => {
  const uid = req.user.uid
  const userRef = await admin.firestore().collection('users').doc(uid).get()
  if (userRef.exists) {
    return res.send({ currencies: userRef.get('currencies') })
  }
  return res
    .status(404)
    .send({ message: 'Você não possui nenhuma cripto moeda cadastrada!' })
})

module.exports = (app) => app.use('/user', router)
