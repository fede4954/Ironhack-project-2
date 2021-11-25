const router = require('express').Router()
const chalk = require('chalk')


//MODELS
const User = require('../models/User.model')
const Car = require('../models/Car.model')

//ROUTES
//Profile page
router.get('/profile', async (req, res) => {
    const userId = req.session.loggedUser._id
    try {
        const user = await User.findById(userId).populate('favoriteCars')
        res.render('profile', { user })
    }
    catch (err) {
        console.log(chalk.bgRed('Error loading user\'s profile:', err))
    }
})

module.exports = router