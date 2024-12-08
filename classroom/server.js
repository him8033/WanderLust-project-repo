const express = require("express");
const app = express();

const user = require("./routes/user.js");
const post = require("./routes/post.js");

app.get("/",(req,res) => {
    res.send("This is Route");
})

app.use("/users",user);
app.use("/posts",post);

app.listen(3000,() =>{
    console.log("Listning on port 3000");
})