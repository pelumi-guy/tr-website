import { StaticImageData } from 'next/image';

export interface Property {
    imageUrl: string | StaticImageData,
    price: number,
    beds: number,
    baths: number,
    lounges: number,
    title: string,
    location: string,
    isBookmarked: boolean,
    propertyId: number,
    creatorId: number,

  }


  export interface AgentProfileData {
    firstName: string;
    lastName: string;
    title: string;
    phone: string;
    email: string;
    rating: number; // e.g., 4.0, 4.5
    bio: string[]; // Array of strings for paragraphs
    imageUrl: string;
    quote: string;
  }


  export type ListingType = 'rent' | 'sale' | 'shortlet';

  interface PriceRange {
    min: string;
    max: string;
  }