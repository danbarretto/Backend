const express = require('express')
const router = express.Router()
const admin = require('./admin')
const verifyMiddleware = require('../middleware/verifyToken')
const { user } = require('firebase-functions/lib/providers/auth')

router.use(verifyMiddleware)

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
  const { currencies } = req.body
  const { uid } = req.user
  const userRef = admin.firestore().collection('users').doc(uid)
  const getDoc = await userRef.get()
  try {
    if (getDoc.exists) {
      if (getDoc.get('currencies') === null) {
        await userRef.set({ currencies })
      } else {
        let oldCurrencies = getDoc.get('currencies')
        currencies.forEach((currency) => {
          const { currencyName, qtd } = currency
          oldCurrencies[currencyName] = qtd
        })
        await userRef.set({ currencies: oldCurrencies })
      }
      return res.sendStatus(200)
    }
  } catch (err) {
    return res
      .status(400)
      .send({ message: 'Erro ao atualizar cripto moedas! ' + err.message })
  }
})

router.get('/getCurrencies',async (req,res)=>{
  const uid = req.user.uid
  const userRef = await admin.firestore().collection('users').doc(uid).get()
  if(userRef.exists){
    return res.send({currencies:userRef.get('currencies')})
  }
  return res.status(404).send({message:'Você não possui nenhuma cripto moeda cadastrada!'})
})

module.exports = (app) => app.use('/user', router)
