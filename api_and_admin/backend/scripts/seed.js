// scripts/seed.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import Admin from '../models/admin.js';
import Agency from '../models/agency.js';
import Property from '../models/property.js';

// --- Define Mongoose Schemas ---
// These are the JavaScript versions of your TypeScript schemas.
var configPath = path.resolve('.', 'config.env')
console.log(`configPath: ${configPath}`);

dotenv.config({ path: configPath });

console.log("env:", process.env);

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

const AgencySchema = new mongoose.Schema({
    name: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
});

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true }, // Added unique for seeding
    description: { type: String, required: true },
    listingType: { type: String, enum: ['For Sale', 'For Rent'], required: true },
    status: { type: String, enum: ['Available', 'Sold', 'Under Offer'], default: 'Available' },
    propertyType: { type: String, required: true },
    propertySubtype: { type: String },
    location: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, default: "Nigeria" },
    },
    price: {
        amount: { type: Number, required: true },
        currency: { type: String, required: true, default: 'NGN' },
    },
    details: {
        bedrooms: { type: Number, default: 0 },
        bathrooms: { type: Number, default: 0 },
        toilets: { type: Number, default: 0 },
        parkingSpaces: { type: Number, default: 0 },
    },
    area: {
        total: { type: Number },
        unit: { type: String, default: 'sqm' },
    },
    photos: [{ type: String, required: true }],
    videoUrl: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    agency: { type: mongoose.Schema.Types.ObjectId, ref: "Agency", required: true },
}, { timestamps: true });

// --- Create Mongoose Models ---
// const Admin = mongoose.model('Admin', AdminSchema);
// const Agency = mongoose.model('Agency', AgencySchema);
// const Property = mongoose.model('Property', PropertySchema);


/**
 * The 'up' function seeds the database.
 * It's idempotent: running it multiple times won't create duplicates.
 */
const seedDatabase = async() => {
    console.log('🌱 Starting to seed database...');

    // 1. Create a Seed Admin and Agency (or find them if they already exist)
    // findOneAndUpdate with `upsert: true` is the key to making this script re-runnable.
    // const seedAdmin = await Admin.findOneAndUpdate({ email: 'seed.admin@example.com' }, // Find by this unique key
    //     { email: 'seed.admin@example.com', name: 'Seed Admin' }, // Data to insert if not found
    //     { new: true, upsert: true } // `upsert` creates it, `new` returns the created/updated doc
    // );

    // const seedAgency = await Agency.findOneAndUpdate({ licenseNumber: 'SEED-AGENCY-001' }, // Find by this unique key
    //     { licenseNumber: 'SEED-AGENCY-001', name: 'Seed Realty Inc.' }, // Data to insert
    //     { new: true, upsert: true }
    // );

    const seedAgency = await Agency.create({ name: 'Seed Realty Inc.', email: 'seed-agency@example.com', website: "www.example.com" } // Find by a unique key
        // { new: true, upsert: true }
    );

    console.log(`✅ Upserted Agency: ${seedAgency.name} (ID: ${seedAgency._id})`);

    const seedAdmin = await Admin.create({ email: 'seed.admin@example.com', name: 'Seed Admin', password: "P@ssw0rd", agency: seedAgency._id } // Find by a unique key
        // { new: true, upsert: true }
    );

    console.log(`✅ Upserted Admin: ${seedAdmin.name} (ID: ${seedAdmin._id})`);

    // 2. Define the sample properties
    const propertiesToSeed = [{
            title: 'Luxury 5-Bedroom Detached Duplex in Lekki',
            description: 'A stunning and spacious duplex with modern amenities, a swimming pool, and a BQ. Perfect for a family looking for comfort and class.',
            listingType: 'For Sale',
            propertyType: 'House',
            propertySubtype: 'Detached Duplex',
            location: { street: '123 Admiralty Way', city: 'Lekki', state: 'Lagos' },
            price: { amount: 350000000 },
            details: { bedrooms: 5, bathrooms: 5, toilets: 6, parkingSpaces: 4 },
            area: { total: 650 },
            photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
            isFeatured: true
        },
        {
            title: 'Modern 3-Bedroom Apartment for Rent in Ikoyi',
            description: 'Well-finished 3-bedroom apartment in a secure and serene serviced estate. Comes with 24/7 power and security.',
            listingType: 'For Rent',
            propertyType: 'Apartment',
            propertySubtype: 'Flat',
            location: { street: '456 Orchid Road', city: 'Lekki', state: 'Lagos' },
            price: { amount: 15000000 },
            details: { bedrooms: 3, bathrooms: 3, toilets: 4, parkingSpaces: 2 },
            area: { total: 220 },
            photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
            isFeatured: true
        },
        {
            title: 'Commercial Land on a Major Road in Ikeja',
            description: 'A prime plot of land measuring 1200 sqm, suitable for commercial development. Fenced and gated with a good title.',
            listingType: 'For Sale',
            propertyType: 'Land',
            location: { street: '789 Lekki County', city: 'Ajah', state: 'Lagos' },
            price: { amount: 500000000 },
            details: {},
            area: { total: 1200 },
            photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570979/Transcendent_Realty/Sample_Images/SemiDetachedPlaceholder_cxff1j.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570979/Transcendent_Realty/Sample_Images/SemiDetachedPlaceholder_cxff1j.png'],
            isFeatured: false
        },
        {
            title: 'Luxury 6-Bedroom Detached Triplex in Ajah',
            description: 'A stunning and spacious duplex with modern amenities, a swimming pool, and a BQ. Perfect for a family looking for comfort and class.',
            listingType: 'For Sale',
            propertyType: 'House',
            propertySubtype: 'Detached Triplex',
            location: { street: 'Lekki County', city: 'Ajah', state: 'Lagos' },
            price: { amount: 400000000 },
            details: { bedrooms: 6, bathrooms: 4, toilets: 7, parkingSpaces: 4 },
            area: { total: 750 },
            photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
            isFeatured: true
        }
    ];

    // 3. Insert the properties, linking them to the seed admin and agency.
    console.log(`ℹ️  Seeding ${propertiesToSeed.length} properties...`);
    for (const prop of propertiesToSeed) {
        await Property.create({
                title: prop.title,
                description: prop.description,
                status: prop.status,
                propertyType: prop.propertyType,
                propertySubtype: prop.propertySubtype,
                details: prop.details,
                creator: seedAdmin._id,
                agency: seedAgency._id,
                'location.street': prop.location.street,
                'location.state': prop.location.state,
                'location.city': prop.location.city,
                listingType: prop.listingType,
                photos: prop.photos,
                'price.amount': prop.price.amount,
                isFeatured: prop.isFeatured

            } // Find by a unique combination
            // prop,
            // { upsert: true }
        );
    }
    console.log(`✅ Successfully seeded ${propertiesToSeed.length} properties.`);
};

/**
 * The 'down' function deletes the data seeded by this script.
 */
const clearDatabase = async() => {
    console.log('🔥 Reverting seed data...');

    // Find the admin we created to identify and remove only the seeded data
    const seedAdmin = await Admin.findOne({ email: 'seed.admin@example.com' });

    if (seedAdmin) {
        // Delete all properties created by the seed admin
        const { deletedCount } = await Property.deleteMany({ creator: seedAdmin._id });
        console.log(`🔥 Deleted ${deletedCount} properties.`);

        // Delete the seed admin and agency themselves for a full clean-up
        await Admin.deleteOne({ _id: seedAdmin._id });
        console.log(`🔥 Deleted seed admin.`);

        await Agency.deleteOne({ licenseNumber: 'SEED-AGENCY-001' });
        console.log(`🔥 Deleted seed agency.`);
    } else {
        console.log('🤷 No seed admin found, nothing to delete.');
    }
}

/**
 * Main execution function
 */
const run = async() => {
    const command = process.argv[2]; // Get command from command line (e.g., 'up' or 'down')

    if (!process.env.MONGODB_CLUSTER_URI) {
        console.error('❌ MONGODB_CLUSTER_URI not found in .env file. Please add it.');
        process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_CLUSTER_URI);
    console.log('🚀 Connected to MongoDB successfully.');

    try {
        if (command === 'up') {
            await seedDatabase();
        } else if (command === 'down') {
            await clearDatabase();
        } else {
            console.log("-------------------------------------------------");
            console.log("Please provide a command: 'up' or 'down'.");
            console.log("  'up'   : To seed the database with sample data.");
            console.log("  'down' : To remove the sample data.");
            console.log("-------------------------------------------------");
        }
    } catch (error) {
        console.error('An error occurred during the script execution:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('🚪 Connection to MongoDB closed.');
    }
};

run();