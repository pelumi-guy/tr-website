import mongoose, { Connection, model, Schema } from 'mongoose';
// import Admin from '../models/admin';
// import Agency from '../models/agency';
// import Property from '../models/property';


// --- Define Minimal Schemas for Dependencies ---
// We define these here to make the migration self-contained.
// They only need the fields we're using for the seed.
const AdminSchema = new Schema({ email: String, name: String });
const AgencySchema = new Schema({ name: String, licenseNumber: String });

// // --- Define the Full Property Schema ---
// // This is a direct copy of your provided schema.
const PropertySchema = new Schema({
  title: { type: String, required: true },
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
  creator: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  agency: { type: Schema.Types.ObjectId, ref: "Agency", required: true },
}, { timestamps: true });


export async function up(connection: Connection): Promise<void> {
  // Get the models from the current database connection
  const Admin = connection.model('Admin', AdminSchema);
  const Agency = connection.model('Agency', AgencySchema);
  const Property = connection.model('Property', PropertySchema);

  console.log('🌱 Starting to seed database...');

  // 1. Create a Seed Admin and Agency (or find them if they already exist)
  // The 'upsert' option creates the document if it doesn't find a match.
  const seedAdmin = await Admin.create(
    { email: 'seed.admin@example.com', name: 'Seed Admin' } // Find by a unique key
    // { new: true, upsert: true }
  );

  const seedAgency = await Agency.create(
    { licenseNumber: 'SEED-AGENCY-001', name: 'Seed Realty Inc.' } // Find by a unique key
    // { new: true, upsert: true }
  );

  console.log(`✅ Upserted Admin: ${seedAdmin._id}`);
  console.log(`✅ Upserted Agency: ${seedAgency._id}`);

  // 2. Define the sample properties to be created
  const propertiesToSeed = [
    {
      title: 'Luxury 5-Bedroom Detached Duplex in Lekki',
      description: 'A stunning and spacious duplex with modern amenities, a swimming pool, and a BQ. Perfect for a family looking for comfort and class.',
      listingType: 'For Sale',
      propertyType: 'House',
      propertySubtype: 'Detached Duplex',
      location: {
        street: '123 Admiralty Way',
        city: 'Lekki',
        state: 'Lagos',
      },
      price: { amount: 350000000 },
      details: { bedrooms: 5, bathrooms: 5, toilets: 6, parkingSpaces: 4 },
      area: { total: 650 },
      photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
      creator: seedAdmin._id,
      agency: seedAgency._id,
    },
    {
      title: 'Modern 3-Bedroom Apartment for Rent in Ikoyi',
      description: 'Well-finished 3-bedroom apartment in a secure and serene serviced estate. Comes with 24/7 power and security.',
      listingType: 'For Rent',
      status: 'Available',
      propertyType: 'Apartment',
      propertySubtype: 'Flat',
      location: {
        street: '456 Orchid Road',
        city: 'Lekki',
        state: 'Lagos',
      },
      price: { amount: 15000000 },
      details: { bedrooms: 3, bathrooms: 3, toilets: 4, parkingSpaces: 2 },
      area: { total: 220 },
      photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png'],
      creator: seedAdmin._id,
      agency: seedAgency._id,
    },
    {
      title: 'Commercial Land on a Major Road in Ikeja',
      description: 'A prime plot of land measuring 1200 sqm, suitable for commercial development. Fenced and gated with a good title.',
      listingType: 'For Sale',
      propertyType: 'Land',
      location: {
        street: '789 Lekki County',
        city: 'Ajah',
        state: 'Lagos',
      },
      price: { amount: 500000000 },
      details: {}, // No beds/baths for land
      area: { total: 1200 },
      photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png'],
      creator: seedAdmin._id,
      agency: seedAgency._id,
    }
  ];

  // 3. Insert the properties into the database
  // We use the creator's email in the query to avoid re-inserting the same properties if the script is run again.
  for (const prop of propertiesToSeed) {
    await Property.create(
      {
        title: prop.title,
        description: prop.description,
        status: prop.status,
        propertyType: prop.propertyType,
        propertySubtype: prop.propertySubtype,
        details: prop.details,
        creator: prop.creator,
        agency: prop.agency,
        'location.street': prop.location.street,
        'location.state': prop.location.state,
        'location.city': prop.location.city,
        listingType: prop.listingType,
        photos: prop.photos,
        'price.amount': prop.price.amount,

      } // Find by a unique combination
      // prop,
      // { upsert: true }
    );
  }

  console.log(`✅ Successfully seeded ${propertiesToSeed.length} properties.`);
}

export async function down(connection: Connection): Promise<void> {
  // This function is for reverting the migration
  const Admin = connection.model('Admin', AdminSchema);
  const Property = connection.model('Property', PropertySchema);

  console.log('🔥 Reverting seed migration...');

  // Find the admin we created to identify and remove only the seeded data
  const seedAdmin = await Admin.findOne({ email: 'seed.admin@example.com' });

  if (seedAdmin) {
    const result = await Property.deleteMany({ creator: seedAdmin._id });
    console.log(`🔥 Deleted ${result.deletedCount} properties created by the seeder.`);
    // Note: We are intentionally not deleting the seed Admin or Agency.
  } else {
    console.log('No seed admin found, nothing to delete.');
  }
}