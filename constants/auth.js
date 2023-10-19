const  checkAuth = (req,res,next)=>{
    if(!req.session.isAuthorized) {
        return res.status(403).json({
            status: 403,
            message: "User is not authorized. Please login first."
        })
    }
    next()
}

module.exports = {
    checkAuth
}