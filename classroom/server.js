const express = require("express");
const app = express();
const user = require("./routes/user.js");
const post = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.use(cookieParser("secretcode"));
const sessionOption = { secret: "mysupersecretstring", resave: false, saveUninitialized: true };
app.use(session(sessionOption));
app.use(flash());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/register", (req,res)=>{
    let { name= "anonymous" } = req.query;
    req.session.name = name;
    req.flash("success","user registerd successfully");
    res.redirect("/hello");
})

app.get("/hello", (req,res)=>{
    res.render("page.ejs",{name: req.session.name, msg: req.flash("success")})
})

app.get("/rqcount", (req, res) => {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send(`You sent a request ${req.session.count} times`);
})

app.get("/test", (req, res) => {
    res.send("test Successful");
})

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("packaged-by", "India", { signed: true });
//     res.cookie("packaged-month", "March", { signed: true });
//     res.send("Signed Cookie Send");
// })

// app.get("/verify", (req, res) => {
//     console.log(req.cookies);                       //show all unsigned cookie
//     console.log(req.signedCookies);                 //show all signed cookies
//     res.send("Verified");
// })

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "Namaste");
//     res.cookie("made-In", "India");
//     res.send("Sent You some cookies");
// })

// app.get("/greet", (req, res) => {
//     let { name = "anonymous" } = req.cookies;
//     res.send(`Hii, ${name}`);
// })

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     console.log(req.cookies);
//     res.send("This is Route");
// })

app.use("/users", user);
app.use("/posts", post);

app.listen(3000, () => {
    console.log("Listning on port 3000");
})