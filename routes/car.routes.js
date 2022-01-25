const router = require('express').Router()
const mongoose = require('mongoose')


//MODELS
const Car = require('../models/Car.model')
const User = require('../models/User.model')


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

        const car = await Car.findById(carId)

        const variantCars = []
        if (car.variants) {
            for (let i = 0; i < car.variants.length; i++) {
                variantCars.unshift(await Car.findOne({ name: car.variants[i] }))
            }
        }
        res.render('carInfo', { car, favorited, variantCars })
    }
    catch (err) {
        next(err)
    }
})

//Add a car to favorites
router.post('/:id/favorite', async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const carToFavorite = await Car.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } })

        const variantCars = []
        if (carToFavorite.variants) {
            for (let i = 0; i < carToFavorite.variants.length; i++) {
                variantCars.unshift(await Car.findOne({ name: carToFavorite.variants[i] }))
            }
        }

        await User.findByIdAndUpdate(userId, { $push: { favoriteCars: carToFavorite._id } })
        res.render('carInfo', { car: carToFavorite, favorited: true, variantCars })
    }
    catch (err) {
        next(err)
    }
})

//Remove car from favorites
router.post('/:id/unfavorite', async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const carToUnfavorite = await Car.findByIdAndUpdate(req.params.id, { $inc: { likes: -1 } })

        const variantCars = []
        if (carToUnfavorite.variants) {
            for (let i = 0; i < carToUnfavorite.variants.length; i++) {
                variantCars.unshift(await Car.findOne({ name: carToUnfavorite.variants[i] }))
            }
        }

        await User.findByIdAndUpdate(userId, { $pull: { favoriteCars: carToUnfavorite._id } })
        res.render('carInfo', { car: carToUnfavorite, favorited: false, variantCars })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router