import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // 'select: false' hides it from default queries
    avatar: { type: String },
    // Each admin must belong to one agency
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
    },
    // A list of all properties this specific admin has created
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;