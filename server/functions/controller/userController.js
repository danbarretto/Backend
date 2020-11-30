const express = require('express')
const router = express.Router()
const admin = require('./admin')
const verifyMiddleware = require('../middleware/verifyToken')
const axios = require('axios').default
const apikey = require('../config/apikey.json')

router.use(verifyMiddleware)

router.get('/', async (req, res) => {
  console.log('validating token')
  return res.send({ message: 'Your token is valid!' })
})

router.post('/addUserToDb', async (req, res) => {
  const { userName } = req.body
  const { uid } = req.user
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
  try {
    const userRef = await admin.firestore().collection('users').doc(uid).get()
    if (userRef.exists) {
      let oldCurrencies = userRef.get('currencies')

      if (oldCurrencies !== null && oldCurrencies !== undefined) {
        for (curr of oldCurrencies) {
          if (curr.Name === currency.toUpperCase()) {
            return res.send({ message: 'Você já possui esta moeda!' })
          }
        }
      } else {
        oldCurrencies = []
      }
      axios
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=${currency}&tsyms=BRL`,
          apikey
        )
        .then(async (result) => {
          if (result.data.Response !== 'Error') {
            oldCurrencies.push({
              Name: currency.toUpperCase(),
              Quantidade: qtd,
            })
            try {
              await userRef.ref.set({
                userName: userRef.get('userName'),
                currencies: oldCurrencies,
              })
              return res.sendStatus(200)
            } catch (err) {
              return res.send({
                message: 'Erro ao salvar moeda ' + err.message,
              })
            }
          } else return res.send({ message: 'Moeda não encontrada!' })
        })
        .catch((err) => {
          return res.send({
            message: 'Erro ao resgatar preços ' + err.message,
          })
        })
    } else return res.send({ message: 'Usuário não encontrado!' })
  } catch (err) {
    return res.send({ message: 'Erro ' + err.message })
  }
})

router.post('/editCurrency', async (req, res) => {
  const { currency, qtd } = req.body
  const { uid } = req.user
  console.log('ayyys')
  console.log(uid)
  const userRef = await admin.firestore().collection('users').doc(uid).get()
  if (userRef.exists) {
    const currencies = userRef.get('currencies').map((curr) => {
      if (curr.Name === currency.toUpperCase()) {
        curr.Quantidade = qtd
      }
      return curr
    })
    userRef.ref
      .update({ userName: userRef.get('userName'), currencies })
      .then(() => {
        return res.sendStatus(200)
      })
      .catch((err) => {
        console.log(err)
        return res.send({ message: 'Erro ao atualizar moeda' })
      })
  } else {
    return res.send({ message: 'Usuário não encontrado' })
  }
})

router.post('/deleteCurrency', async (req, res) => {
  const { currency } = req.body
  const { uid } = req.user
  console.log('ayyys')
  console.log(uid)
  const userRef = await admin.firestore().collection('users').doc(uid).get()
  if (userRef.exists) {
    const currencies = userRef
      .get('currencies')
      .filter((curr) => {
        return curr.Name !== currency.toUpperCase()
      })
      .map((curr) => curr)

    userRef.ref
      .update({ currencies })
      .then(() => {
        return res.sendStatus(200)
      })
      .catch((err) => {
        console.log(err)
        return res.send({ message: 'Erro ao atualizar moeda' })
      })
  } else {
    return res.send({ message: 'Usuário não encontrado' })
  }
})

router.get('/getCurrencies', async (req, res) => {
  const uid = req.user.uid
  const userRef = await admin.firestore().collection('users').doc(uid).get()
  if (
    userRef.get('currencies') !== null &&
    userRef.get('currencies') !== undefined
  ) {
    return res.send({
      currencies: userRef.get('currencies'),
      userName: userRef.get('userName'),
    })
  }
  return res.send({
    message: 'Você não possui nenhuma cripto moeda cadastrada!',
    userName: userRef.get('userName'),
  })
})

module.exports = (app) => app.use('/user', router)
