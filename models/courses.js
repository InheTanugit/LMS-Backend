const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teacher_id: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discounted_price: {
        type: Number,
        required: false
    },
},{timestamps: true})

const Courses = mongoose.model('Courses',courseSchema)
module.exports = Courses


