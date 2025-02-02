const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listing/index.ejs", { allListing });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listing/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing You requested does not exists!");
        res.redirect("/listing");
    }
    res.render("listing/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {
    try {
        let GeoUrl = `https://nominatim.openstreetmap.org/search?q=${req.body.listing.location}&format=json`;
        let result = await fetch(GeoUrl);
        let data = await result.json();
        if (data.length > 0) {
            let lat = data[0].lat;
            let lon = data[0].lon;

            let url = req.file.path;
            let filename = req.file.filename;
            // let listing = req.body.listing;
            // const newListing = new Listing(listing);         //      these commented line are same of just below line
            const newListing = new Listing(req.body.listing);              //       nothing difference same working of above lines but in a single line
            newListing.owner = req.user._id;
            newListing.image = { url, filename };
            newListing.geometry = { type: "Point", coordinates: [lon, lat] };
            await newListing.save();
            req.flash("success", "New Listing Created");
            res.redirect("/listing");
        } else {
            console.log("No location found.");
            req.flash("error", "Invalid location.");
            res.redirect("/listing/new");
        }
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/listing/new");
    }
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing You requested does not exists!");
        res.redirect("/listing");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250")
    res.render("listing/edit.ejs", { listing, originalImageUrl });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated");
    res.redirect(`/listing/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listing");
}