const mongoose = require('mongoose')
const Schema = mongoose.Schema

const videoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        required: true
    },
    pdf: {
        type: String,
        required: false
    }
},{timestamps: true})

const Videos = mongoose.model('Videos',videoSchema)
module.exports = Videos