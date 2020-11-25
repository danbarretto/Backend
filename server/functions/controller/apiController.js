const axios = require('axios').default
const express = require('express')
const router = express.Router()
const verifyMiddleware = require('../middleware/verifyToken')
const apiKey = require('../config/apikey.json')
const config = {
  headers: {
    authorization: apiKey.key,
  },
}
//router.use(verifyMiddleware)

router.get('/topList', (req, res) => {
  axios
    .get(
      'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=BRL',
      config
    )
    .then((result) => {
      const topList = result.data.Data.map((currency) => {
        //console.log(currency)
        return {
          name: currency.CoinInfo.Name,
          fullName: currency.CoinInfo.FullName,
          price: currency.DISPLAY.BRL.PRICE,
        }
      })
      return res.send({ topList })
    })
})

router.get('/searchCurrency', (req, res) => {
  const { coinName } = req.query
  axios
    .get(
      `https://min-api.cryptocompare.com/data/price?fsym=${coinName}&tsyms=BRL`,
      config
    )
    .then((price) => {
      if (price.data.Response === 'Error')
        res.status(404).send({ message: 'Moeda não encontrada' })
      else res.send({ price: price.data.BRL })
    })
    .catch((err) => {
      res.status(400).send({ message: 'Erro ao pesquisar moeda!', err })
    })
})

router.post('/getPrices', (req, res) => {
  const { names } = req.body
  let namesUrl = ''
  names.forEach((name) => {
    namesUrl += name + ','
  })
  console.log(namesUrl)
  const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${namesUrl}&tsyms=BRL`
  axios.get(url, config).then(result=>{
    //const prices = Object.keys(result.data).map(val=>({name:val, price:result.data[val].BRL}))
    return res.send(result.data)
  }).catch(err=>{
    return res.status(500).send({message:'Erro ao resgatar preços'})
  })
})

router.get('/historicalData', (req, res) => {
  const { coinName, time } = req.query
  axios
    .get(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinName}&tsym=BRL&limit=${time}`,
      config
    )
    .then((result) => {
      res.send(result.data.Data)
    })
    .catch((err) => {
      res.send(err)
    })
})

module.exports = (app) => app.use('/api', router)
