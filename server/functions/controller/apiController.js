const axios = require('axios').default
const express = require('express')
const router = express.Router()
const verifyMiddleware = require('../middleware/verifyToken')
const apikey = require('../config/apikey.json')

//router.use(verifyMiddleware)

router.get('/topList', (req, res) => {
  const { number } = req.query
  axios
    .get(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?&tsym=BRL&limit=${parseInt(
        number
      )}`,
      apikey
    )
    .then((result) => {
      const topList = result.data.Data.map((currency) => {
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
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinName}&tsyms=BRL`,
      apikey
    )
    .then((currency) => {
      console.log(currency.data)
      if (currency.data.Response === 'Error')
        res.status(404).send({ message: 'Moeda não encontrada' })
      else {
        res.send({ currency: currency.data })
      }
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
  axios
    .get(url, apikey)
    .then((result) => {
      //const prices = Object.keys(result.data).map(val=>({name:val, price:result.data[val].BRL}))
      return res.send(result.data)
    })
    .catch((err) => {
      return res.status(500).send({ message: 'Erro ao resgatar preços' })
    })
})

router.get('/historicalData', (req, res) => {
  const { coinName, time } = req.query
  axios
    .get(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinName}&tsym=BRL&limit=${time}`,
      apikey
    )
    .then((result) => {
      const data = result.data.Data.Data.map((day) => {
        
        const timeStamp = day.time

        const date = new Date(timeStamp * 1000)
        const dayString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        const temp = {
          time: dayString,
          price: day.close,
        }
        return temp
      })
      return res.send({ historic: data })
    })
    .catch((err) => {
      return res.send(err)
    })
})

module.exports = (app) => app.use('/api', router)
