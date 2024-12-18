const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
    departmentId: {
        type: String,
        required: true,
    },
    departmentName: {
        type: String,
        required: true,
    },
    statusDep: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
},
    createDate: {
    type: Date,
    default: Date.now,
}
});



module.exports = mongoose.model("Department", departmentSchema);
