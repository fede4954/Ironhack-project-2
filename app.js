require('dotenv').config()

require('./db')

const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const app = express()


//MIDDLEWARE
//View Engine
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

//Public folder
app.use(express.static('public'))

//Body parser
app.use(express.json())


//SERVER
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server listening on port ${PORT}`))
})
