// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//open route - public route
app.get('/', (req,res)=>{
    res.status(200).json({msg: 'Bem vindo a nossa API'})
})


// credenciais
const dBUser = process.env.DB_USER
const dBPass = process.env.DB_PASS
const dBAddr = process.env.DB_ADDR




mongoose.connect(`mongodb://${dBUser}:${dBPass}@${dBAddr}`).then(()=>{
app.listen(3000)
console.log('conectou ao banco')
})
.catch((err) => console.log(err))






//        `mongodb://${DB_USER}:${DB_PASS}@192.168.3.10:27017`,)
