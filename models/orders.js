const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Courses'
    }

},{timestamps: true})

const Orders = mongoose.model('Orders',orderSchema)
module.exports = Orders