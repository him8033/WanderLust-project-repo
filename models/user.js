const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {                    //  here we are only other fields are created because "passport-local-mongoose"
        type: String,           //  already creates username and password(with salt and hashing) fields 
        required: true,
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);