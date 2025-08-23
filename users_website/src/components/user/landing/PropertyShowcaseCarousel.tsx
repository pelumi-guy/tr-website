// components/PropertyShowcaseCarousel.tsx
'use client'; // This component now uses react-bootstrap's hooks internally

import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/exports/images';
import Carousel from 'react-bootstrap/Carousel'; // <-- Import the Carousel component

// Sample data remains the same
const slidesData = [
    {
        id: 1,
        imageUrl: images.PropertyImagePlaceholder2,
        altText: 'Luxurious modern villa',
        title: 'Lagos Property Center',
        subtitle: 'Discover our featured property of the week',
        buttonText: 'See More',
        buttonLink: '/featured-property/1',
    },
    {
        id: 2,
        imageUrl: images.PropertyImagePlaceholder,
        altText: 'Spacious downtown apartment',
        title: 'Stunning city residences',
        subtitle: "Explore spacious, family-oriented homes in Lagos' most sought-after neighborhoods.",
        buttonText: 'Explore Now',
        buttonLink: '/explore',
    },
    {
        id: 3,
        imageUrl: images.PropertyImagePlaceholder3,
        altText: 'Cozy suburban home',
        title: 'Find Your Space to Breathe',
        subtitle: "Find the perfect backdrop for your family's story in our collection of homes",
        buttonText: 'Find Yours',
        buttonLink: '/search',
    },
];

const PropertyShowcaseCarousel = ({ slides = slidesData }) => {
    if (!slides || slides.length === 0) {
        return null; // Or some fallback UI
    }

    // We'll wrap the Carousel in a relative container to position the wavy bottom
    return (
        <div
            className="position-relative"
            data-aos="fade-down"
            data-aos-ease="ease-in"
            data-aos-duration="1000"
            data-aos-once
        >
            {/*
              Use the Carousel component from react-bootstrap as the main wrapper.
              Props like `fade`, `controls`, and `indicators` replace data attributes.
            */}
            <Carousel
                fade // Replaces className="carousel-fade"
                controls={false} // Hides next/prev arrows, as in your original commented-out code
                indicators={true} // Shows the dots at the bottom
                interval={1000} // Set a slide interval in milliseconds
                className="property-showcase-carousel" // Keep your custom class for styling
            >
                {/* Map over your data to create Carousel.Item for each slide */}
                {slides.map((slide, index) => (
                    <Carousel.Item key={slide.id}>
                        {/*
                          The inner structure for the slide's visual content remains the same.
                          This ensures your existing SCSS for these elements still works.
                        */}
                        <div className="showcase-slide-image-container">
                            <Image
                                src={slide.imageUrl}
                                alt={slide.altText}
                                layout="fill"
                                objectFit="cover"
                                priority={index === 0}
                                className="d-block w-100 showcase-img"
                            />
                            <div className="showcase-overlay"></div>
                        </div>

                        {/* Use Carousel.Caption for the text overlay */}
                        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100">
                            <div className="text-center text-white" style={{ maxWidth: '800px' }}>
                                <h1 className="display-4 fw-bold mb-3 text-primary">{slide.title}</h1>
                                <p className="lead fs-5 mb-4">{slide.subtitle}</p>
                                <Link href={slide.buttonLink}>
                                    {/* Using <a> tag inside Link for proper react-bootstrap Button styling and behavior */}
                                    <div className="btn btn-light btn-lg px-4 py-2">{slide.buttonText}</div>
                                </Link>
                            </div>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* The wavy bottom SVG remains outside the Carousel component, positioned absolutely */}
            <div className="wavy-bottom-svg-container" style={{ zIndex: 5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 C150,150 350,0 500,50 C650,100 850,-20 1000,50 C1150,120 1300,0 1440,50 L1440,100 L0,100 Z" fill="#FFFFFF"></path>
                </svg>
            </div>
        </div>
    );
};

export default PropertyShowcaseCarousel;