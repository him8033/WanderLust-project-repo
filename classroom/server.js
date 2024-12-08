const express = require("express");
const app = express();

app.get("/",(req,res) => {
    res.send("This is Route");
})

//  Index - Users
app.get("/users",(req,res) => {
    res.send("Get for Users");
})

//  Show - Users
app.get("/users/:id",(req,res) => {
    res.send("Get for User id");
})

//  post - Users
app.post("/users",(req,res) => {
    res.send("Post for Users");
})

//  delete - Users
app.delete("/users/:id",(req,res) => {
    res.send("Delete for User id");
})


//  Index - posts
app.get("/posts",(req,res) => {
    res.send("Get for posts");
})

//  Show - posts
app.get("/posts/:id",(req,res) => {
    res.send("Get for Post id");
})

//  post - posts
app.post("/posts",(req,res) => {
    res.send("Post for posts");
})

//  delete - posts
app.delete("/posts/:id",(req,res) => {
    res.send("Delete for Post id");
})

app.listen(3000,() =>{
    console.log("Listning on port 3000");
})