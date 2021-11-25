const router = require('express').Router()
const chalk = require('chalk')
const mongoose = require('mongoose')


//MODELS
const Car = require('../models/Car.model')
const User = require('../models/User.model')


//ROUTES
//Specific car page
router.get('/:id', async (req, res) => {
    // const userId = req.session.loggedUser._id
    // const carId = mongoose.Types.ObjectId(req.params.id)
    // console.log(carId)
    // const favorited = false //Variable to check whether the car has been favorited by the current user or not
    try {
        // const favoriteCheck = await User.findById(userId, { favoriteCars: carId})
        // console.log(favoriteCheck)
        const car = await Car.findById(req.params.id)
        res.render('carInfo', { car })
    }
    catch (err) {
        console.log(chalk.bgRed('Error loading car\'s page:', err))
    }
})

//Add a car to favorites
router.post('/:id/favorite', async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const carToFavorite = await Car.findById(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { favoriteCars: carToFavorite._id } })
        res.render('home')
    }
    catch (err) {
        console.log(chalk.bgRed('Error adding car to favorites:', err))
    }
})

//Remove car from favorites
router.post('/:id/unfavorite', async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const carToFavorite = await Car.findById(req.params.id)
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { favoriteCars: carToFavorite._id } })
        res.render('home')
    }
    catch (err) {
        console.log(chalk.bgRed('Error removing car from favorites:', err))
    }
})

module.exports = router