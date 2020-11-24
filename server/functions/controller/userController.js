const express = require('express')
const router = express.Router()
const admin = require('./admin')
router.post('/createUser', async (req, res) => {
  const { email, pass, user } = req.body
  console.log(email, pass)
  admin.auth().createUser({
    email,
    emailVerified: false,
    password: pass,
    displayName: user,
    disabled:false
  }).then(userRecord=>{
      admin.firestore().collection('users').doc(userRecord.uid).set({
          userName:user,
          coin:0
      })
      return res.send({displayName:userRecord.displayName})
  }).catch(err=>{
      return res.status(400).send({message:`Error! ${err.message}`})
  })
})



module.exports = (app) => app.use('/user', router)
