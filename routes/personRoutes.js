const router = require('express').Router()
const req = require('express/lib/request')
const res = require('express/lib/response')
const Person = require('../models/Person')

// Create

router.post('/', async (req, res) => {
  //req.body
  const { name, age, email, salary, approved } = req.body

  const person = {
    name,
    age,
    email,
    salary,
    approved
  }

  // create mongoose
  try {
    await Person.create(person)

    res.status(201).json({ message: 'Pessoa inserida com sucesso.' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// leitura

router.get('/', async (req, res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {
  //extrair o dado
  const id = req.params.id

  try {
    const person = await Person.findOne({ _id: id })

    if (!person) {
      res.status(422).json({ message: 'Usuario não encontrado' })
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

// atualização de dados

router.patch('/:id', async (req, res) => {
  const id = req.params.id

  const { name, age, email, salary, approved } = req.body

  const person = {
    name,
    age,
    email,
    salary,
    approved
  }

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person)

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//delete

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({ _id: id })

  if (!person) {
    res.status(422).json({ message: 'Usuario não encontrado' })
  }

  try {
    await Person.deleteOne({ _id: id })
    res.status(200).json({ message: 'Usuario removido' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router
