const router = require('express').Router()


//ROUTES
//Home page
router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router