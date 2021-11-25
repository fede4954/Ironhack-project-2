const router = require('express').Router()
const chalk = require('chalk')


//MODELS
const Car = require('../models/Car.model')

//ROUTES
//All cars page
router.get('/', async (req, res) => {
    try {
        const cars = await Car.find({})
        res.render('cars', { cars })
    }
    catch (err) {
        console.log(chalk.bgRed('Error loading all cars:', err))
    }
})

module.exports = router