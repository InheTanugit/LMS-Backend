const { emailValidator } = require("../constants/validators");
const Users = require("../models/users")
var md5 = require('md5');//use to hash password

const userRegistration =async (req,res) => {
    try{
        if(!emailValidator(req.body.email)) {
            return res.json({
                status: 400,
                message: "Please put a valid email"
            })
        }

        const user =  await Users.findOne({email: req.body.email})
        if(user) {
            return res.json({
                status: 200,
                message: "Email already exist"
            })
        }

        req.body.password = md5(req.body.password)
        const newUser = new Users(req.body);
        newUser.save()
        .then(result => {
            return res.json({
                status: 201,
                message: "User created successfully"
            })
        })
        .catch(err => {
            return res.json({
                status: 400,
                message: "Bad request"
            })
        })
    }
    catch(err){
        return res.json({
            status: 500,
            message: "Server Error"
        })
    }
    
}

const userLogin = (req,res) => {
    let {email,password} = req.body;
    password = md5(password)
    Users.findOne({email,password})
    .then(user => {
        if(!user) {
            return res.json({
                status: 401,
                message: "Auth error"
            })
        }
          
        return res.json({
            status: 200,
            message: user
        })
    })
    .catch(err => {
        return res.json({
            status: 500,
            message: "Server Error"
        })
    })
}

const getUsers = (req,res) => {
    Users.find()
    .then(user => {
        return res.json({
            status: 200,
            message: user
        })
    })
    .catch(err => {
        return res.json({
            status: 500,
            message: "Server Error"
        })
    })
}

module.exports = {
    userRegistration,
    userLogin,
    getUsers
}