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

//Filtered all cars page
router.post('/', async (req, res) => {
    try {
        const filter = req.body.sort
        const order = (filter === 'ZA' || filter === "favDesc") ?  -1 : 1
        let cars = {}
        if(filter === 'ZA' || filter === "AZ" ) 
             cars = await Car.find({}, null, { sort: { name: order } })
        else
            cars = await Car.find({}, null, { sort: { likes: order } })
        res.render('cars', {cars})
    }
    catch (err) {
        console.log(chalk.bgRed('Error loading all cars:', err))
    }
})

module.exports = router