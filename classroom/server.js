const express = require("express");
const app = express();
const user = require("./routes/user.js");
const post = require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/getcookies",(req,res) => {
    res.cookie("greet","Namaste");
    res.cookie("made-In","India");
    res.send("Sent You some cookies");
})

app.get("/greet",(req,res) => {
    let {name = "anonymous"} = req.cookies;
    res.send(`Hii, ${name}`);
})

app.get("/",(req,res) => {
    console.dir(req.cookies);
    console.log(req.cookies);
    res.send("This is Route");
})

app.use("/users",user);
app.use("/posts",post);

app.listen(3000,() =>{
    console.log("Listning on port 3000");
})