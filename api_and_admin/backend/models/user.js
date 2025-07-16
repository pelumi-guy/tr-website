import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String }, // Optional for users

    // For wishlisting/bookmarking properties
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],

    // You could store serialized search preferences here
    // e.g., { location: 'Lekki', minPrice: 50000000, type: 'House' }
    savedPreferences: { type: mongoose.Schema.Types.Mixed },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;