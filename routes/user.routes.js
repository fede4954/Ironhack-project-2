const router = require('express').Router()
const chalk = require('chalk')


//MIDDLEWARE
const { isLoggedOut } = require('../middleware/route-guard')


//MODELS
const User = require('../models/User.model')
const Car = require('../models/Car.model')


//ROUTES
//Profile page
router.get('/profile', isLoggedOut, async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const user = await User.findById(userId).populate('favoriteCars')
        res.render('profile', { user })
    }
    catch (err) {
        next(err)
    }
})

module.exports = router