const express = require('express')
const MongoConnection = require('./connection')
const cors = require('cors')
const router = require('./routes/routes')
var session = require('express-session')
var passport = require('passport')
const { initializePassport } = require('./passportConfig ')

require('dotenv').config()
const app = express()
MongoConnection(process.env.URI)
initializePassport(passport)
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'keyboard cat',//unique secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/',(req,res) => {
    console.log("hello")
    req.session.count? req.session.count++ : req.session.count = 1
    res.send(`hello world ${req.session.count}`)
})


app.use(router)

app.listen(process.env.PORT)

