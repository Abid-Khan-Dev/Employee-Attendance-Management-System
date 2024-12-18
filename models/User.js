const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        lowercase: true,
        required: true,
    },
    lastName: {
        type: String,
        lowercase: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: function () {
            return this.role !== "admin";
        },
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: function () {
            return this.role !== "admin";
        },
    },
    shift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shift",   
        required: function () {
            return this.role !== "admin";
        },
        
    },
    dob: {
        type: Date,
        required: function () {
            return this.role !== "admin";
        },
    },
    phone: {
        type: String, 
        required: function () {
            return this.role !== "admin";
        },
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: function () {
            return this.role !== "admin";
        },
    },
    employeeId: {
        type: String
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",   
        required: function () {
            return this.role !== "admin";
        },
    },
    statusEmp: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
        required: function () {
            return this.role !== "admin";
        },
    },
    createDate: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ["employee", "admin"],
        default: "employee",
    },
});

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        // console.log("Before saving, employeeId:", this.employeeId);  // Debugging statement

        if (!this.employeeId) {
            // Generate employeeId if it's not provided and it's a new document
            try {
                // Ensure the employeeId is unique by checking the last generated ID
                const lastEmployee = await this.constructor.findOne().sort({ employeeId: -1 });
                const lastEmployeeId = lastEmployee ? lastEmployee.employeeId : 'EMP-000000';  // Default to 'EMP-000000' if no last employee
                const lastIdNumber = parseInt(lastEmployeeId.split('-')[1]) || 0;

                // Generate a new employeeId based on the last one
                this.employeeId = `EMP-${String(lastIdNumber + 1).padStart(6, '0')}`;
            } catch (err) {
                console.error("Error generating employeeId:", err);
                return next(err);  // Pass error to the next middleware if the query fails
            }
        }

        // console.log("After generating, employeeId:", this.employeeId);  // Debugging statement
        this.markModified('employeeId');  // Mark employeeId as modified to ensure it's saved
    }
    next();
});




module.exports = mongoose.model("User", userSchema);
