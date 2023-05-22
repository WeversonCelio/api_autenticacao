// imports
const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

// login user
router.post('/login', async (req, res)=>{
    const {email, password} = req.body

      //validation
     if(!email){
        return res.status(422).json({msg: ' O email é obrigatorio' })
     }
     if(!password){
        return res.status(422).json({msg: 'a senha é obrigatoria' })
     }

       //check if user exists
       const user = await User.findOne({email: email})
       if(!user){
          return res.status(404).json({msg: 'Usuario nao encontrado!'})
       }

       //check if password match
       const checkPassword = await bcrypt.compare(password, user.password)

       if(!checkPassword){
        return res.status(422).json({msg: 'senha invalida'})
       }

       try {
        const secret = process.env.SECRET
        
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        )

        res.status(200).json({msg: 'autenticacao realizada com sucesso', token})
        
       } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!'})
     }
})


module.exports = router