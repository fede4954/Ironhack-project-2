const router = require('express').Router()
const chalk = require('chalk')

//MODELS
const Car = require('../models/Car.model')


//ROUTES
//All cars page
router.get('/', async (req, res) => {
    try{
        const cars = await Car.find({})
        res.render('cars', { cars })
    }
    catch(err){
        console.log(chalk.bgRed('Error loading all cars:', err))
    }
})

//Specific car page
// router.get('/:id', (req, res) => {
//     try{
//         const car = Car.findById(req.params.id)
//         res.render('carInfo', { car })
//     }
//     catch(err){
//         console.log(chalk.bgRed(`Error loading car (${car.name}):`, err))
//     }
    
// })

module.exports = router