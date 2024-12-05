const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

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

app.get("/", (req, res) => {
    res.send("app is working and this is root");
})

//      ************************        Testing Route

// app.get("/testListing",async(req,res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the Beach",
//         price: 1200,
//         location: "lucknow, UP",
//         Country: "India"
//     })

//     await sampleListing.save();
//     console.log("sample list is saved");
//     res.send("Successfully Testing");
// })

//      ************************        show all Listing route

app.get("/listing", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}))

//      ************************        Add new Listing route

app.get("/listing/new", (req, res) => {
    res.render("listing/new.ejs");
})

app.post("/listing", wrapAsync(async (req, res, next) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid Data for Listing!");
    }
    // let listing = req.body.listing;
    // const newListing = new Listing(listing);         //      these commented line are same of just below line
    const newListing = new Listing(req.body.listing);              //       nothing difference same working of above lines but in a single line
    await newListing.save();
    res.redirect("/listing");
}))

//          ************************        Show Details of particular listing

app.get("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/show.ejs", { listing });
}))

//      ************************        Edit Route

app.get("/listing/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit.ejs", { listing });
}))

app.put("/listing/:id", wrapAsync(async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid Data for Listing!");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
}))

//      ************************        Delete Route

app.delete("/listing/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing");
}))

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong!" } = err;
    res.status(statusCode).render("listing/errors.ejs",{err});
})

app.listen(port, () => {
    console.log("listening on port: ", port);
})