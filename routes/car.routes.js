const router = require('express').Router()
const chalk = require('chalk')

//MODELS
const Car = require('../models/Car.model')
const User = require('../models/User.model')

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

//Specific car page
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id)
        res.render('carInfo', { car })
    }
    catch (err) {
        console.log(chalk.bgRed('Error loading car\'s page:', err))
    }
})

//Add a car to favorite
router.post('/:id/favorite', async (req, res) => {
    try {
        const carToFavorite = await Car.findById(req.params.id)
        const userToUpdateId = req.session.loggedUser._id

        const updatedUser = await User.findByIdAndUpdate(userToUpdateId, { $push: { favoriteCars: carToFavorite._id } }, { new: true })
        res.render('home')
    }
    catch (err) {
        console.log(chalk.bgRed('Error adding car to favorites:', err))
    }
})

module.exports = router