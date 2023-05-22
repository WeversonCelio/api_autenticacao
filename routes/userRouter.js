//imports
const route = require('express').Router()
const checkToken = require('../utils/checkToken')

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

module.exports = route