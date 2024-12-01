const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Listing = require("./models/listing.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
    .then(() => {
        console.log("Mongoose Connected");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

app.get("/",(req,res) => {
    res.send("app is working and this is root");
})

app.get("/testListing",async(req,res) => {
    let sampleListing = new Listing({
        title: "My new Villa",
        description: "By the Beach",
        price: 1200,
        location: "lucknow, UP",
        Country: "India"
    })

    await sampleListing.save();
    console.log("sample list is saved");
    res.send("Successfully Testing");
})

app.get("/listing",async (req,res) => {
    const allListing = await Listing.find({});
    res.render("\listing/index.ejs",{allListing});
})

app.listen(port,() =>{
    console.log("listening on port: ",port);
})