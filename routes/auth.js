const router = require('express').Router()
const bcrypt = require('bcrypt')


//MIDDLEWARE
// const { isLoggedIn } = require('../middleware/route-guard')


//MODELS
const User = require('../models/User.model')


//ROUTES
//Signup
router.get('/signup', (req, res) => {
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body

    //Check if all fields are filled
    if (!username || !password) {
        res.render('signup', { errorMsg: 'All fields must be filled' })
    }

    //Check if username already exists
    const unqUserCheck = await User.find({ username: username })
    if (unqUserCheck) {
        res.render('signup', { errorMsg: 'User already exists' })
    }

    //If everything is OK, try to register the user
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const createdUser = await User.create({ username, password: hashedPassword })
        res.render('home')
    }
    catch (err) {
        console.log('Error signing user up:', err)
    }

})

//Login
// router.get('/login', /*isLoggedIn,*/ (req, res) => { //Also prevent from logging in
//     res.render('login')
// })


// router.post('/login', async (req, res) => {
//     const { username, password } = req.body

//     if (!username || !password) {
//         res.render('login', { errorMsg: 'You need to fill all fields' })
//     }

//     //Check if the input user exists
//     const userFromDB = await User.findOne({ username })
//     if (!userFromDB) {
//         res.render('login', { errorMsg: 'User does not exist' })
//     }
//     else {
//         const passwordCheck = await bcrypt.compare(password, userFromDB.password) //Input goes first
//         if (!passwordCheck) {
//             res.render('login', { errorMsg: 'Incorrect password' })
//         }
//         else {

//             req.session.loggedUser = userFromDB
//             // console.log('SESSION ======> ', req.session)
//             res.redirect('/')
//         }
//     }
// })

// router.post('/logout', async (req, res, next) => {
//     //Clear cookie
//     res.clearCookie('connect.sid', { path: '/', })

//     //Destroy session
//     try {
//         await req.session.destroy()
//         res.redirect('/')
//     }
//     catch (err) {
//         next(err)
//     }
// })

module.exports = router