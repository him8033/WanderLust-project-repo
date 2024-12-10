module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.flash("error","You must be logged in to create and edit listing!");
        res.redirect("/login");
    }
    next();
}