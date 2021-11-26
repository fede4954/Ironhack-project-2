const router = require('express').Router()
const chalk = require('chalk')
const mongoose = require('mongoose')


//MODELS
const Car = require('../models/Car.model')
const User = require('../models/User.model')
const Hitbox = require('../models/Hitbox.model')


//ROUTES
//Specific car page
router.get('/:id', async (req, res) => {
    let userId
    if (req.session.loggedUser) userId = req.session.loggedUser._id
    const carId = req.params.id
    let favorited = false //Variable to check whether the car has been favorited by the current user or not
    try {
        if (req.session.loggedUser) {
            const user = await User.findById(userId)
            const favoriteCars = user.favoriteCars

            for (let car of favoriteCars) {
                if (car.toString() === carId) favorited = true
            }
        }

        const car = await Car.findById(carId).populate('hitbox')
        res.render('carInfo', { car, favorited })
    }
    catch (err) {
        console.log(chalk.bgRed('Error loading car\'s page:', err))
    }
})

//Add a car to favorites
router.post('/:id/favorite', async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const carToFavorite = await Car.findByIdAndUpdate(req.params.id, { $inc: { timesFavorited: 1 } })

        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { favoriteCars: carToFavorite._id } })
        res.render('carInfo', { car: carToFavorite, favorited: true })
    }
    catch (err) {
        console.log(chalk.bgRed('Error adding car to favorites:', err))
    }
})

//Remove car from favorites
router.post('/:id/unfavorite', async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const carToUnfavorite = await Car.findByIdAndUpdate(req.params.id, { $inc: { timesFavorited: -1 } })
        const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { favoriteCars: carToUnfavorite._id } })
        res.render('carInfo', { car: carToUnfavorite, favorited: false })
    }
    catch (err) {
        console.log(chalk.bgRed('Error removing car from favorites:', err))
    }
})

module.exports = router