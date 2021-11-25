require('dotenv').config()

require('./db')

const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const { urlencoded } = require('express')
const app = express()
const cookieParser = require('cookie-parser')


//MIDDLEWARE
//View Engine
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

//Public folder
app.use(express.static('public'))

//Body parser
app.use(express.json())
app.use(urlencoded({ extended: false }))

//Cookie parser
app.use(cookieParser())

//Session
require('./config/session.config')(app)


//ROUTES
app.use('/', require('./routes/index.routes'))

app.use('/', require('./routes/user.routes'))

app.use('/', require('./routes/auth'))

app.use('/car', require('./routes/car.routes'))

app.use('/cars', require('./routes/cars.routes'))


//SERVER
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(chalk.bgGreen(`Server listening on port ${PORT}`))
})
