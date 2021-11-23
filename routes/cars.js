const router = require('express').Router()

const Car = require('../models/Car.model')

router.get('/', (req, res) => {
    res.render('cars')
})

router.get('/:id', (req, res) => {
    const car = Car.findById(req.params.id)
    res.render('carInfo', { car })
})

module.exports = router