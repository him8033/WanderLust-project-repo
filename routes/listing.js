const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

//  Index route

router.get("/", wrapAsync(listingController.index));

//   Add new Listing route

router.get("/new", isLoggedIn, (req, res) => {
    res.render("listing/new.ejs");
})

//    Show Route

router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing You requested does not exists!");
        res.redirect("/listing");
    }
    res.render("listing/show.ejs", { listing });
}))

//    Create Post Route

router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    // let listing = req.body.listing;
    // const newListing = new Listing(listing);         //      these commented line are same of just below line
    const newListing = new Listing(req.body.listing);              //       nothing difference same working of above lines but in a single line
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listing");
}))

//   Edit Route

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing You requested does not exists!");
        res.redirect("/listing");
    }
    res.render("listing/edit.ejs", { listing });
}))

//   Update Route

router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated");
    res.redirect(`/listing/${id}`);
}))

//   Delete Route

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listing");
}))

module.exports = router;