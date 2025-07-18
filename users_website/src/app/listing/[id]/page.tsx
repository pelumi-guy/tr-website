// app/products/[id]/page.tsx

import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

// Import UI Components
import ImageGallery, { GalleryImage } from '../../../components/user/listing/ImageGallery';
import ProductInfo from '../../../components/user/listing/ProductInfo';
import AgentCard from '../../../components/user/listing/AgentCard';
import ProductDescription from '@/components/user/listing/ProductDescription';
import SimilarListings from '@/components/user/listing/SimilarListings';
import { Button } from 'react-bootstrap';
import { IProperty } from '@/types/property'; // Assuming you have this type defined

// NOTE: The line "'use server'" is not needed at the top of a Server Component file.
// It's a server component by default. You only use it for Server Actions.

// --- DATA FETCHING FUNCTION ---
// This function uses native fetch, allowing Next.js to cache and deduplicate requests.
async function getProductDetails(id: string): Promise<IProperty | null> {
    try {
        // Construct the full URL. Use environment variables for your API base URL.
        const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';
        const url = `${apiBaseUrl}/api/v1/properties/${id}`;

        // Use fetch with 'no-store' to mimic getServerSideProps (dynamic on every request).
        // For static pages, you would omit this or use `cache: 'force-cache'`.
        const res = await fetch(url, { cache: 'no-store' });
        console.log("url:", url);

        // If the request itself fails (e.g., network error, 404 from API), handle it.
        if (!res.ok) {
            console.error(`API Error: Failed to fetch product ${id}, status: ${res.status}`);
            return null;
        }

        const responseData = await res.json();
        console.log("responseData:", responseData);

        // Check for the success flag from your API's response structure.
        if (!responseData.success) {
            console.warn(`API responded with success=false for product ${id}`);
            return null;
        }

        return responseData.data as IProperty;
    } catch (error) {
        console.error(`Exception during fetch for product ${id}:`, error);
        return null;
    }
}


// --- DYNAMIC METADATA (App Router way) ---
export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const product = await getProductDetails(id); // Re-uses the fetch function

    if (!product) {
        return {
            title: 'Property Not Found | TR Realty',
        };
    }

    // Assuming product.photos is an array of objects with a 'url' property
    const mainImageUrl = product.photos?.[0] || '/images/PropertyImagePlaceholder.png';

    return {
        title: `${product.title} | TR Realty`,
        description: product.description || `Details for ${product.title}, located in ${product.location.street}.`,
        openGraph: {
            title: `${product.title} | TR Realty`,
            description: product.description,
            images: [mainImageUrl],
        },
    };
}


// --- SERVER COMPONENT PAGE ---
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const product = await getProductDetails(id); // Next.js automatically deduplicates this call

    console.log("product:", product);

    if (!product) {
        notFound(); // Triggers the not-found.tsx page
    }

    // --- Data Transformation for Child Components ---
    // It's good practice to map your raw API data to the props your components expect.
    const galleryImagesForComponent: GalleryImage[] = product.photos.map((photo, index) => ({
        id: `img-${index}`,
        src: photo,
        alt: product.title, // Use a descriptive alt text
        type: 'image', // Add logic here if you support videos
    }));

    const tagsForComponent = product.features || [];

    return (
        <> {/* Or your main <Layout> component */}
            <main className="container py-4 py-md-5"> {/* Use a standard container */}
                <div className="row g-4 g-lg-5">
                    <div className="col-lg-7 col-md-12">
                        {/* Pass the transformed data to the Client Component */}
                        <ImageGallery galleryImages={galleryImagesForComponent} />
                    </div>

                    <div className="col-lg-5 col-md-12 product-details-column">
                        <ProductInfo
                            title={product.title}
                            tags={tagsForComponent}
                            price={product.price.amount.toLocaleString()} // Format the price nicely
                            location={`${product.location.street}, ${product.location.city}`}
                        />

                        {/*
              AgentCard will need data. Assuming agent info is in `product.creator`
              Make sure your IProperty type includes a creator object with these fields.
            */}
                        {product.creator && (
                            <AgentCard
                                agentName={`${product.creator.name}`}
                                agentTitle="Lead Agent" // You might need to add this to your creator object
                                agentImageUrl={product.creator.avatar || '/images/default_avatar.jpg'}
                                rating={4.5} // This data needs to come from your API
                            />
                        )}

                        <div className="my-3 d-grid"> {/* d-grid makes button full-width */}
                            <Button variant="dark" size="lg" className="book-tour-btn">
                                Book A Tour
                            </Button>
                        </div>

                        {/*
              AmenitiesGrid would also need a mapping from product.features.
              For now, let's assume it's covered by the tags in ProductInfo.
              <AmenitiesGrid amenities={...} />
            */}
                    </div>
                </div>

                {/* Product Description Section */}
                {product.description && product.features && (
                    <div className="mt-4 mt-lg-5">
                        <ProductDescription
                            initialText={product.description}
                            fullText={product.description}
                            keyFeatures={product.features}
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