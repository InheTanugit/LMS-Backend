const express = require('express')
const mongoConnection = require('./connection')
const cors = require('cors')
const router = require('./routes/routes')
var session = require('express-session')
var passport = require('passport')
const { initializePassport } = require('./passportConfig')

require('dotenv').config()
const app = express()
mongoConnection(process.env.URI)
initializePassport(passport)


var corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
}


app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
    },
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/files', express.static('uploads'))


app.get('/',(req,res)=>{
    console.log("hello")
    req.session.count? req.session.count++ : req.session.count = 1
    res.send(`Hello world ${req.session.count}`)
})

app.use(router)

app.listen(process.env.PORT)