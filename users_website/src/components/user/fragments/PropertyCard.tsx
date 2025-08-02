import React from 'react'
import Image from 'next/image';
import { icons } from '@/exports/images';
import Link from 'next/link';
import { Property } from '@/types/common';
import { IProperty } from '@/types/property';

const PropertyCardDisplay = ({ id, imageUrl, price, beds, baths, title, livingrooms, location }: PropertyCardProps) => {

  return (

    <div className="card shadow-sm property-card mb-4 my-md-2 mx-4 mx-md-2 px-0" style={{ maxWidth: '20rem' }} data-aos="flip-left" data-aos-ease="ease" data-aos-duration="1500">
      <Link href={`/listing/${id}`}>
        <div className="card-image-container position-relative d-flex justify-content-center">
          <Image
            src={imageUrl || "https://via.placeholder.com/400x250"}
            // width="100"
            // height="100"
            className="card-img-top img-fluid"
            alt={"title"}
            fill
            // // For object-cover behavior with a fixed height, you might need custom CSS
            style={{ objectFit: 'cover' }}
          // // Or ensure your images are consistently aspect-ratioed.
          />
          {/* {isBookmarked && (<div
            className="position-absolute top-0 end-0 m-2 rounded-circle p-1 lh-1"
            style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} // Ensure icon is centered
            aria-label="Bookmark property"
          >
            <Image
              src={icons.BookmarkIcon}
              alt='bookmark icon'
            />

          </div>)
          } */}
        </div>
        <div className="card-body p-3"> {/* Adjust padding: p-3 is 1rem. Figma might suggest p-2 (0.5rem) or p-4 (1.5rem) */}
          {/* Price and Features */}
          <div className="d-flex justify-content-between align-items-start mb-2">
            {/* Price */}
            {/* Use fs- for font size, fw- for weight. Colors: text-dark, text-primary etc. or custom */}
            <p className="fs-4 fw-bold text-dark mb-0"> {/* Or e.g., text-primary */}
              ₦{price.toLocaleString()}
            </p>

            {/* Features Icons */}
            <div className="d-flex align-items-center text-secondary" style={{ gap: '0.75rem' /* Or use Bootstrap gap-2 or gap-3 if suitable */ }}>
              <div className="d-flex align-items-center" style={{ gap: '0.25rem' /* Or gap-1 */ }}>
                {/* Replace with your Bed SVG Icon */}
                <Image
                  src={icons.BedIcon}
                  alt='bed icon'
                />
                <span className="small text-black">{beds}</span> {/* Or fs-sm */}
              </div>
              <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
                {/* Replace with your Couch/Living Room SVG Icon */}
                <Image
                  src={icons.SofaIcon}
                  alt='sofa icon'
                />
                <span className="small text-black">{livingrooms}</span>
              </div>
              <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
                {/* Replace with your Third SVG Icon (e.g., Bath) */}
                <Image
                  src={icons.ShowerIcon}
                  alt='shower icon'
                />
                <span className="small text-black">{baths}</span>
              </div>
              {/* <div className="d-flex align-items-center" style={{ gap: '0.25rem' }}>
                <Image
                  src={icons.SwimmingPoolIcon}
                  alt='swimming pool icon'
                />
                <span className="small text-black">{baths}</span>
              </div> */}
            </div>
          </div>

          {/* Title - Use h5 or h6 for card titles typically */}
          <h5 className="card-title fs-6 fw-semibold text-body-emphasis mb-1 lh-tight"> {/* Or fs-5 if larger */}
            {title}
          </h5>

          {/* Location */}
          <p className="card-text small text-muted">
            {location}
          </p>

          {/* Optional: Add a link/button if the card is clickable for more details */}
          {/* <a href={`/property/${propertyId}`} className="btn btn-primary btn-sm mt-2">View Details</a> */}
        </div>
      </Link>
    </div>

  );
};

const PropertyCard = ({ property }: { property: IProperty }) => {
  // --- Data Transformation Logic ---
  // Transform the rich backend data into a simple format for the display component.

  // 1. Get the first photo as the main image, with a fallback.
  const imageUrl = property.photos[0] || '/images/default-property.png';

  // 2. Create a user-friendly location string.
  const displayLocation = `${property.location?.street}, ${property.location?.city}`;

  // 3. Extract the simple values.
  const cardProps: PropertyCardProps = {
    id: property._id,
    imageUrl: imageUrl,
    price: property.price?.amount,
    beds: property.details?.bedrooms,
    baths: property.details?.bathrooms,
    livingrooms: property.details?.livingrooms,
    title: property.title,
    location: displayLocation,
  };
  return <PropertyCardDisplay {...cardProps} />;
};

export default PropertyCard;


export interface PropertyCardProps {
  id: string;
  imageUrl: string;
  price: number;
  beds: number;
  baths: number;
  livingrooms: number;
  title: string;
  location: string;
}