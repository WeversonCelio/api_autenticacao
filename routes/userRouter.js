//imports
const route = require('express').Router()
const jwt = require('jsonwebtoken')

//model
const User = require('../model/User')

route.get("/:id", checkToken, async(req, res)=>{
    const id = req.params.id

    // check if user exists
    const user = await User.findById(id, '-password' ) // -password: filtro para excluir a senha do retorno

    if(!user){
        return res.status(404).json({msg: 'usuario nao encontrado'})
    }


    res.status(200).json({user})


})

function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg: 'Acesso negado'})
    }

    try {
        const secret = process.env.SECRET
        
        jwt.verify(token, secret)
        
        next()
        
    } catch (error) {
        return res.status(400).json({msg: 'Token invalido'})
        
    }
}






module.exports = route