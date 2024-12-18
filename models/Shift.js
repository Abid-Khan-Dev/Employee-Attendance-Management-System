const mongoose = require("mongoose");

const shiftSchema = mongoose.Schema({
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    statusShift: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
},
    createDate: {
    type: Date,
    default: Date.now,
}
});



module.exports = mongoose.model("Shift", shiftSchema);
