const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('cars')
})

router.get('/:id', (req, res) => {
    res.render('carInfo')
})

module.exports = router