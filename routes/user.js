const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", wrapAsync(async (req, res) => {
    console.log(req.body);
    console.log(req.body.password);
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listing");
    }catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
    
}))

module.exports = router;