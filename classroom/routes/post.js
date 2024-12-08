const express = require("express");
const router = express.Router();

//  Index - posts
router.get("/",(req,res) => {
    res.send("Get for posts");
})

//  Show - posts
router.get("/:id",(req,res) => {
    res.send("Get for Post id");
})

//  post - posts
router.post("/",(req,res) => {
    res.send("Post for posts");
})

//  delete - posts
router.delete("/:id",(req,res) => {
    res.send("Delete for Post id");
})

module.exports = router;