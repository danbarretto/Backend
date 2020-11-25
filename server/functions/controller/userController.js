const express = require('express')
const router = express.Router()
const admin = require('./admin')
const verifyMiddleware = require('../middleware/verifyToken')
router.use(verifyMiddleware)
router.post('/addUserToDb', async(req, res)=>{
  const {uid, userName} = req.body
  console.log(req.body)
  admin.firestore().collection('users').doc(uid).set({
    userName
  }).then(()=>{
    return res.send({message:'Usuário criado com sucesso!'})
  }).catch(err=>{
    return res.status(400).send({message:`Erro ao criar usuário! ${err.message}`})
  })
})



module.exports = (app) => app.use('/user', router)
