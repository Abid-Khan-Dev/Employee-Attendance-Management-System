const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    locationName: {
        type: String,
        required: true,
    },
    statusLoc: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
},
    createDate: {
    type: Date,
    default: Date.now,
}
});



module.exports = mongoose.model("Location", locationSchema);
