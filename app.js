// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//configure json response
app.use(express.json())


// models
const User = require('./model/User')

//open route - public route
app.get('/', (req,res)=>{
    res.status(200).json({msg: 'Bem vindo a nossa API'})
})

// register user
app.post('/auth/register', async(req,res)=>{
    const {name, email, password, confirmpassowrd} = req.body

     //validation
     if(!name){
        return res.status(422).json({msg: 'O nome é obrigatorio' })
     } 
     if(!email){
        return res.status(422).json({msg: ' O email é obrigatorio' })
     }
     if(!password){
        return res.status(422).json({msg: 'a senha é obrigatoria' })
     }
     if(password!==confirmpassowrd){
        return res.status(422).json({msg: 'a senha está divergente' })
     }

     //check if user exists
     const userExists = await User.findOne({email: email})
     if(userExists){
        return res.status(422).json({msg: 'esse usuario já existe. Por favor, use outro email'})
     }

     //create password
     const salt = await bcrypt.genSalt(12)
     const passwordHast = await bcrypt.hash(password, salt)

     //create user
     const user = new User({
        name,
        email,
        password: passwordHast
     })

     try {
        await user.save()
        res.status(201).json({msg: 'Usuario criado com sucesso!'})
        
     } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})
     }


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






