const Orders = require('../models/orders')
const mongoose = require('mongoose')

const createOrder = (req,res) => {
    console.log('In create order',req.body)
    if(req.user.type !== 'student') {
        return res.json({
            status: 403,
            message: "You are not authorized to create a course."
        })
    }
    req.body.user_id = req.user.id
    req.body.course = new mongoose.Types.ObjectId(req.body.course)
    const order = new Orders(req.body);
    order.save()
        .then(result => {
            return res.json({
                status: 201,
                message: "Order created successfully"
            })
        })
        .catch(err => {
            return res.json({
                status: 500,
                message: "Bad request"
            })
        })
}

const getOrders = (req,res) => {
    console.log(req.body)
    if(req.user.type !== 'student') {
        return res.json({
            status: 403,
            message: "You are not authorized to create a course."
        })
    }
    const user_id = req.params.user_id
    Orders.find({user_id})
    .populate({path: 'course', modal: 'Courses'})
    .select('course')
    .exec()
    .then(result => {
        return res.status(200).json({
            status: 200,
            message: "Orders fetched successfully",
            data: result
        })
    })
    .catch(err => {
        return res.status(500).json({
            status: 500,
            message: "Bad request"
        })
    })
}

module.exports = {
    createOrder,
    getOrders
}