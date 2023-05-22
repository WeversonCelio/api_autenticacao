// imports
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const app = express()




//configure json response
app.use(express.json())




//open route - public route
app.get('/', (req,res)=>{
    res.status(200).json({msg: 'Bem vindo a nossa API'})
})

// auth router
const authRoutes = require('./routes/authRoutes')
app.use('/auth', authRoutes)


// private router
const userRouter = require('./routes/userRouter')
app.use('/user', userRouter )


// credenciais
const dBUser = process.env.DB_USER
const dBPass = process.env.DB_PASS
const dBAddr = process.env.DB_ADDR




mongoose.connect(`mongodb://${dBUser}:${dBPass}@${dBAddr}`).then(()=>{
app.listen(3000)
console.log('conectou ao banco')
})
.catch((err) => console.log(err))






