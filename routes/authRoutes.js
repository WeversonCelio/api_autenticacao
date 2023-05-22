// imports
const router = require('express').Router()
const bcrypt = require('bcrypt')

// models
const User = require('../model/User')


// register user
router.post('/register', async(req,res)=>{
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






module.exports = router