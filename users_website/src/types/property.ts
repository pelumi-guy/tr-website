

// For the creator/agency relationships (handling Mongoose .populate())
// When not populated, it's a string (ObjectId). When populated, it's an object.
export interface IAdmin {
  _id: string;
  name: string;
  email: string;
  // add other admin fields if needed
}

export interface IAgency {
  _id: string;
  name: string;
  licenseNumber: string;
  // add other agency fields if needed
}

// For the nested objects in the property schema
export interface IPropertyLocation {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface IPropertyPrice {
  amount: number;
  currency: string;
}

export interface IPropertyDetails {
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  livingrooms: number;
  parkingSpaces: number;
}

export interface IPropertyArea {
  total?: number;
  covered?: number;
  unit: string;
}


// Full mongoose schema interface
export interface IProperty {
  _id: string; // Mongoose ID is a string
  title: string;
  description: string;
  listingType: 'For Sale' | 'For Rent';
  status: 'Available' | 'Sold' | 'Under Offer';
  propertyType: string;
  propertySubtype?: string;

  location: IPropertyLocation;
  price: IPropertyPrice;
  details: IPropertyDetails;
  area: IPropertyArea;

  photos: string[]; // An array of image URLs
  videoUrl?: string;
  features: string[];

  // These fields will be string ObjectIds unless you .populate() them in your API query
  creator: string | IAdmin;
  agency: string | IAgency;

  // Timestamps added by Mongoose
  createdAt: string; // Dates are typically serialized as ISO strings
  updatedAt: string;

  // Optional fields from your homepage logic
  isFeatured?: boolean;
  viewCount?: number;
}