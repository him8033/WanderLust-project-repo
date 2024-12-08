const express = require("express");
const app = express();

const user = require("./routes/user.js");
const post = require("./routes/post.js");

app.get("/getcookies",(req,res) => {
    res.cookie("greet","Namaste");
    res.cookie("made-In","India");
    res.send("Sent You some cookies");
})

app.get("/",(req,res) => {
    res.send("This is Route");
})

app.use("/users",user);
app.use("/posts",post);

app.listen(3000,() =>{
    console.log("Listning on port 3000");
})