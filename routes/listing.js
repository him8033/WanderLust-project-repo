const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");

//  Index route
router.get("/", wrapAsync(listingController.index));

//   Add new Listing route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//    Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//    Create Post Route
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));

//   Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

//   Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

//   Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;