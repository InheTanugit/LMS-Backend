const mongoose = require('mongoose')


const MongoConnection = (dbURI) => {
    mongoose.connect(dbURI)
    .then((res) => {
        console.log('Connected to DB')
    })
    .catch(err => console.log(err))
}

module.exports = MongoConnection