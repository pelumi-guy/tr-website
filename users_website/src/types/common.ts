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
