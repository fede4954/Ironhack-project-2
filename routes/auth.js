const router = require('express').Router()
const bcrypt = require('bcrypt')


//MIDDLEWARE
const { isLoggedIn } = require('../middleware/route-guard')


//MODELS
const User = require('../models/User.model')


//ROUTES
//Signup
router.get('/signup', isLoggedIn, (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body

    //Check if all fields are filled
    if (!username || !password) {
        res.render('signup', { errorMsg: 'All fields must be filled' })
        return
    }

    //Check if username already exists
    const unqUserCheck = await User.findOne({ username: username })
    if (unqUserCheck) {
        res.render('signup', { errorMsg: 'User already exists' })
        return
    }

    //If everything is OK, try to register the user
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await User.create({ username, password: hashedPassword })
        res.render('login', { msg: 'Signed up succesfully, please re enter your credentials to log in' })
    }
    catch (err) {
        console.log('Error signing user up:', err)
    }

})

//Login
router.get('/login', isLoggedIn, (req, res) => {
    res.render('login')
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.render('login', { errorMsg: 'All fields must be filled' })
    }

    //Check if username exists
    const userFromDB = await User.findOne({ username })
    if (!userFromDB) {
        res.render('login', { errorMsg: 'User not found' })
    }

    const passwordCheck = await bcrypt.compare(password, userFromDB.password)
    if (!passwordCheck) {
        res.render('login', { errorMsg: 'Incorrect password' })
    }
    else {
        //Add a property (an user) to the created session
        req.session.loggedUser = userFromDB
        // console.log('SESSION ======> ', req.session)
        res.redirect('profile')
    }

})

//Logout
router.post('/logout', async (req, res, next) => {
    res.clearCookie('connect.sid', { path: '/', })

    try {
        await req.session.destroy()
        res.redirect('/')
    }
    catch (err) {
        next(err)
    }
})

module.exports = router