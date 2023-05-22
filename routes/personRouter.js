// imports
const router = require('express').Router()



// models
const Person = require('../model/Person')

//create person
router.post('/', async (req, res) =>{
    const {name, salary, approved} = req.body

    if(!name){
        return res.status(422).json({msg: 'O nome é obrigatorio'})
    }
    if(!salary){
        return res.status(422).json({msg: 'o salario é obrigatorio'})
    }
})


module.exports = router
