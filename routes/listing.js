const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../Schema.js");

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//  Index route

router.get("/", wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}))

//   Add new Listing route

router.get("/new", (req, res) => {
    res.render("listing/new.ejs");
})

//    Show Route

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("reviews");
    res.render("listing/show.ejs", { listing });
}))

//    Create Post Route

router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    // let listing = req.body.listing;
    // const newListing = new Listing(listing);         //      these commented line are same of just below line
    const newListing = new Listing(req.body.listing);              //       nothing difference same working of above lines but in a single line
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listing");
}))

//   Edit Route

router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listing/edit.ejs", { listing });
}))

//   Update Route

router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listing/${id}`);
}))

//   Delete Route

router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listing");
}))

module.exports = router;