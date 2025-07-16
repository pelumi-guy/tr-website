import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    logo: { type: String },
    address: { type: String },
    phone: { type: String },
    website: { type: String },
    // A link to all admins (realtors) working for this agency
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Admin" }],
}, { timestamps: true });

const Agency = mongoose.model("Agency", agencySchema);

export default Agency;