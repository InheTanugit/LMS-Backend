const Videos = require("../models/videos");

const createVideo = (req,res) => {
    if(req.user.type !== 'teacher') {
        return res.json({
            status: 403,
            message: "You are not authorized to create a course."
        })
    }
    req.body.teacher_id = req.user.id
    const video = new Videos(req.body);
        video.save()
        .then(result => {
            return res.json({
                status: 201,
                message: "Video added successfully"
            })
        })
        .catch(err => {
            return res.json({
                status: 500,
                message: "Bad request"
            })
        })
}

const getVideos = (req,res) => {
    console.log(req.session.user)
    const course_id = req.params.course_id
    Videos.find({course_id})
    .then(result => {
        return res.status(200).json({
            status: 200,
            message: "Course videos fetched successfully",
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

const updateCourse = (req,res) => {
    console.log('Reached')
    console.log(req.params.course_id)
    console.log(req.body)
    const course_id = req.params.course_id
    if(req.user.type !== 'teacher') {
        return res.status(403).json({
            status: 403,
            message: "You are not authorized to create a course."
        })
    }
    Courses.findOneAndUpdate({_id: course_id}, req.body)
    .then(result => {
        return res.status(200).json({
            status: 200,
            message: "Course updated successfully"
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
    createVideo,
    getVideos,
    updateCourse
}