import mongoose from "mongoose";

// A helper to check if a value is a valid ObjectId
const isObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    listingType: { type: String, enum: ['For Sale', 'For Rent'], required: true, default: 'For Sale' },
    status: { type: String, enum: ['Available', 'Sold', 'Under Offer'], default: 'Available' },
    propertyType: { type: String, required: true }, // e.g., 'House', 'Apartment', 'Land'
    propertySubtype: { type: String }, // e.g., 'Detached Duplex', 'Terrace', 'Penthouse'
    // Structured location data from 'Locality/Area' and 'Street/Road/Estate'
    location: {
        street: { type: String, required: true },
        city: { type: String, required: true, default: 'Lekki' },
        state: { type: String, required: true, default: 'Lagos' },
        country: { type: String, default: "Nigeria" },
    },
    // Structured price to avoid string parsing issues
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true, default: 'NGN' },
    },
    // Detailed features from CSV
    details: {
        bedrooms: { type: Number, default: 0 },
        bathrooms: { type: Number, default: 0 },
        toilets: { type: Number, default: 0 },
        livingrooms: { type: Number, default: 0 },
        parkingSpaces: { type: Number, default: 0 },
    },
    // Area details from CSV
    area: {
        total: { type: Number }, // Total plot area
        covered: { type: Number }, // Covered building area
        unit: { type: String, default: 'sqm' },
    },
    // Replaces 'Pictures' and 'Video Link'
    photos: [{ type: String, required: true }], // An array of image URLs
    videoUrl: { type: String },
    features: [{ type: String }],
    isFeatured: { type: Boolean, default: false, index: true },
    viewCount: { type: Number, default: 0, index: true },
    inquiryCount: { type: Number, default: 0, index: true },

    // --- Relationships ---
    // The admin who created this listing
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
        validate: [isObjectId, 'Creator field must be a valid ObjectId']
    },
    // The agency this listing belongs to
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency",
        required: true,
        validate: [isObjectId, 'Agency field must be a valid ObjectId']
    },
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

export default Property;