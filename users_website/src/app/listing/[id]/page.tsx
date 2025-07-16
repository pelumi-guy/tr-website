'use server'

import React from 'react';
import { Metadata, ResolvingMetadata } from 'next'; // For dynamic metadata
import { notFound } from 'next/navigation'; // For handling 404

// Import your UI components (no changes needed for these if they are client or server components)
import ImageGallery, { GalleryImage } from '../../../components/user/listing/ImageGallery';
import ProductInfo from '../../../components/user/listing/ProductInfo';
import AgentCard from '../../../components/user/listing/AgentCard';
import AmenitiesGrid, { Amenity } from '../../../components/user/listing/AmenitiesGrid';
import ProductDescription from '@/components/user/listing/ProductDescription';
import { Button } from 'react-bootstrap';

// Import specific icons for amenities (assuming these are client components or used within client components)
import { FaBed, FaCouch, FaBath, FaSwimmingPool } from 'react-icons/fa';
import { GiResize } from 'react-icons/gi';
import SimilarListings from '@/components/user/listing/SimilarListings';

// --- TYPE DEFINITIONS (Keep these) ---
interface ProductDetails {
  id: string;
  title: string;
  tags: string[];
  price: string;
  location: string;
  galleryImages: GalleryImage[];
  agent: {
    name: string;
    title: string;
    imageUrl: string;
    rating: number;
  };
  amenities: Amenity[];
  descriptionIntro: string;
  descriptionFull?: string;
}

interface ProductPageParams {
  id: number;
}

interface ProductPageProps {
  params: ProductPageParams;
  // searchParams?: { [key: string]: string | string[] | undefined }; // If you need search params
}

// --- MOCK API (Keep this or replace with your actual data source logic) ---
const fetchProductDetailsAPI = async (id: number): Promise<ProductDetails | null> => {
  console.log("Fetching product with slug:", id);
  // In a real app, use fetch() to call your backend/CMS
  // Example using fetch with 'no-store' for dynamic data (like getServerSideProps)
  // const res = await fetch(`https://your-api.com/products/${slug}`, { cache: 'no-store' });
  // if (!res.ok) return null;
  // const product = await res.json();
  // return product;

  // --- Using your existing mock logic for now ---
  await new Promise(resolve => setTimeout(resolve, 500));
  if (id > 0) {
    return {
      id: 'prod123',
      title: 'Contemporary Luxury 5 Bedroom Detached Duplex',
      tags: ['Lekki', 'Detached Duplex', '5 Bedroom'],
      price: '230,000,000',
      location: 'Lekki Conservation Road, Lekki Lagos',
      galleryImages: [
        { id: 'img1', src: '/images/prop-main.jpg', alt: 'Property exterior', type: 'image' },
        { id: 'vid1', src: '/images/prop-video-thumb.jpg', alt: 'Property video tour', type: 'video', videoSrc: '/videos/stock-video.mp4' },
        { id: 'img2', src: '/images/prop-pool.jpg', alt: 'Swimming pool area', type: 'image' },
        { id: 'img3', src: '/images/prop-living.jpg', alt: 'Living room interior', type: 'image' },
        { id: 'img4', src: '/images/prop-bath.jpg', alt: 'Modern bathroom', type: 'image' },
      ],
      agent: {
        name: 'John Doe',
        title: 'Lead Agent',
        imageUrl: '/images/agent-john-doe.jpg',
        rating: 4.0,
      },
      amenities: [
        { id: 'a1', icon: <FaBed size={20} className="text-primary" />, text: '5 Bedrooms, all ensuite' },
        { id: 'a2', icon: <FaCouch size={20} className="text-primary" />, text: 'General Living Room, Family Living Room' },
        { id: 'a3', icon: <FaSwimmingPool size={20} className="text-primary" />, text: 'Swimming Pool' },
        { id: 'a4', icon: <FaBath size={20} className="text-primary" />, text: '5 ½ Bath' },
        { id: 'a5', icon: <GiResize size={20} className="text-primary" />, text: 'Spacious Compound Area' },
        { id: 'a6', icon: <FaCouch size={20} className="text-primary" />, text: 'Cinema Room' },
      ],
      descriptionIntro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };
  }
  return null;
};
// --- END MOCK API ---


// --- DYNAMIC METADATA (App Router way) ---
// This function allows you to generate metadata dynamically based on the route params
export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata // Access to parent metadata
): Promise<Metadata> {
  const id = params.id;
  const product = await fetchProductDetailsAPI(id); // Fetch data again for metadata

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | TR Realty`,
    description: `Details for ${product.title}, located in ${product.location}.`,
    // openGraph: {
    //   images: [product.galleryImages[0]?.src || '/default-og-image.jpg'],
    // },
  };
}

// --- SERVER COMPONENT PAGE ---
export default async function ProductDetailPage({ params }: ProductPageProps) {
  const id = params.id;
  const product = await fetchProductDetailsAPI(id);

  if (!product) {
    notFound(); // This will render the nearest not-found.tsx file or a default 404 page
  }

  // Client-side interaction logic (like booking a tour) would typically be in a Client Component
  // For simplicity, keeping the handler here, but it would need to be moved if it used hooks like useState
  const handleBookTour = () => {
    // This function will execute on the server during SSR if called directly from a server component button.
    // For client-side interactivity, this button and its handler should be in a Client Component.
    console.log("Book A Tour clicked for (server):", product.title);
    // In a real app: redirect, or trigger a server action, or interact with a client component that handles the modal.
  };

  return (
    <> {/* Or your main <Layout> component if it's compatible with Server Components */}
      {/* Metadata is handled by the `generateMetadata` function or a static `metadata` export */}

      <main className="container-fluid px-5 py-4 py-md-5">
        <div className="px-0">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-7 col-md-12">
              <ImageGallery images={product.galleryImages} />
            </div>

            <div className="col-lg-5 col-md-12 product-details-column">
              <ProductInfo
                title={product.title}
                tags={product.tags}
                price={product.price}
                location={product.location}
              />
              <AgentCard
                agentName={product.agent.name}
                agentTitle={product.agent.title}
                agentImageUrl={product.agent.imageUrl}
                rating={product.agent.rating}
              />
              {/*
                For the "Book A Tour" button to have client-side interactivity (e.g., open a modal using useState),
                it (and potentially its parent section) would need to be a Client Component.
                Example: <BookTourButton productId={product.id} />
              */}
              {/* Example using form action for server-side handling */}
              {/* <form action={handleBookTour}>
                 <Button variant="dark" size="lg" type="submit" className="w-100 mb-4 book-tour-btn">
                    Book A Tour
                 </Button>
              </form> */}

              <div className="my-3">
                <Button variant="dark" type="submit" className="w-100 book-tour-btn">
                  Book A Tour
                </Button>
              </div>


              <AmenitiesGrid amenities={product.amenities} />
            </div>
          </div>
        </div>


        {/* Product Description Section */}
        {product.descriptionIntro && product.amenities && ( // Conditionally render if data exists
          <div className="mt-4 mt-lg-5"> {/* Add margin top to space from amenities */}
            <ProductDescription
              initialText={product.descriptionIntro} // Use the specific intro from your data
              fullText={product.descriptionIntro}
              keyFeatures={product.amenities}
            />
          </div>
        )}

        <div className="mt-4 mt-lg-5">
          <SimilarListings />
        </div>


      </main>
    </>
  );
}