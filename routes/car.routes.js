const router = require('express').Router()


//MODELS
const Car = require('../models/Car.model')


//ROUTES
//All cars page
router.get('/', (req, res) => {
    res.render('cars')
})

//Specific car page
router.get('/:id', (req, res) => {
    const car = Car.findById(req.params.id)
    res.render('carInfo', { car })
})

module.exports = router