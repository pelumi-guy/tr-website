// components/home/HeroSection.tsx (Previously PropertyShowcaseCarousel.tsx)
'use client';

import Image, { StaticImageData } from 'next/image';
import { images } from '@/exports/images';
import Carousel from 'react-bootstrap/Carousel';
import HeroSearchPanel from './HeroSearchPanel'; // <-- Import the new component

// Simplify the data structure - we only need background images now
const backgroundImages: { id: number; src: StaticImageData | string; alt: string }[] = [
    { id: 1, src: images.PropertyImagePlaceholder2, alt: 'Luxurious modern villa backdrop' },
    { id: 2, src: images.PropertyImagePlaceholder, alt: 'Spacious downtown apartment building' },
    { id: 3, src: images.PropertyImagePlaceholder3, alt: 'Cozy suburban home exterior' },
];

const HeroSection = () => {
    return (
        <div
            className="position-relative hero-section-wrapper" // Added a class for easier targeting
            data-aos="fade-down"
            data-aos-ease="ease-in"
            data-aos-duration="1000"
            data-aos-once
        >
            <Carousel
                fade
                controls={false}
                indicators={false} // Hide indicators for a clean background look
                interval={4000}
                className="property-showcase-carousel"
            >
                {backgroundImages.map((image, index) => (
                    <Carousel.Item key={image.id}>
                        <div className="showcase-slide-image-container">
                            <Image
                                src={image.src}
                                alt={image.alt}
                                // layout="fill"
                                objectFit="cover"
                                priority={index === 0}
                                className="d-block w-100 showcase-img"
                            />
                            <div className="showcase-overlay"></div>
                        </div>

                        {/*
                          The Carousel.Caption now acts as a centered container for our search panel.
                          We render the same panel on every slide for a persistent feel.
                        */}
                        <Carousel.Caption className="d-flex flex-column justify-content-center align-items-center h-100 carousel-caption-with-search">
                            <HeroSearchPanel />
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* The wavy bottom SVG remains */}
            <div className="wavy-bottom-svg-container" style={{ zIndex: 5 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 C150,150 350,0 500,50 C650,100 850,-20 1000,50 C1150,120 1300,0 1440,50 L1440,100 L0,100 Z" fill="#FFFFFF"></path>
                </svg>
            </div>
        </div>
    );
};

export default HeroSection;