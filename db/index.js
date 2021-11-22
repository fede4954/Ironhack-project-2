const mongoose = require('mongoose')
const chalk = require('chalk')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/project-2"

const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useFindAndModify: false
        })
        console.log(chalk.bgBlue('Connected to Mongo'))
    }
    catch (err) {
        console.log(chalk.bgRed('Error:', err))
    }
}

connectToMongo()