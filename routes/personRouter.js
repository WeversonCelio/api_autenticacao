// imports
const router = require('express').Router()
const checkToken = require('../utils/checkToken')

// models
const Person = require('../model/Person')
const { route } = require('./userRouter')

//create person
router.post('/', checkToken, async (req, res) => {
    const { name, salary, approved } = req.body

    //validation
    if (!name) {
        return res.status(422).json({ msg: 'O nome é obrigatorio' })
    }
    if (!salary) {
        return res.status(422).json({ msg: 'o salario é obrigatorio' })
    } if (approved === undefined || approved === null) {
        return res.status(422).json({ msg: 'O status aprovado é obrigatorio' })
    }

    // save to database
    const person = new Person({
        name,
        salary,
        approved
    })
    try {
        await person.save(person)
        res.status(201).json({ msg: 'Pessoa inserida com sucesso!' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
    }
})

// read
// all people
router.get('/', checkToken, async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json({ people })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
    }
})

// person by id
router.get('/:id', checkToken, async (req, res) => {
    try {
        const id = req.params.id
        const person = await Person.findById(id)

        //check if the person exist
        if (!person) {
            return res.status(404).json({ msg: 'pessoa nao foi localizada!' })
        }

        res.status(200).json({ person })

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
    }
})

// update 
router.patch('/:id', checkToken, async (req, res) => {

    const id = req.params.id
    const { name, salary, approved } = req.body

    const person = {
        name,
        salary,
        approved
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person)
        res.status(200).json({ msg: 'a pessoa foi atualizada com sucesso!', person })

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({ msg: 'usuario nao foi encontrado' })

        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
    }
})

//delete
router.delete('/:id', checkToken, async (req, res) => {
    const id = req.params.id
    const person = Person.findById(id)

    //check if the person exist
    if (!person) {
        return res.status(404).json({ msg: 'pessoa nao foi localizada!' })
    }

    try {
        await Person.deleteOne({_id:id})
        res.status(200).json({msg: 'Pessoa removida com sucesso!'})

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Aconteceu um erro no servidor, tente novamente mais tarde!' })
    }

})








module.exports = router
