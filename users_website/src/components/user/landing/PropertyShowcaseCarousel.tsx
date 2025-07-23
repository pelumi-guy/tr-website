import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/exports/images';

import { Property } from '@/types/common';

// Sample data for slides - you'd likely fetch this or pass it as props
const slidesData = [
    {
        id: 1,
        imageUrl: images.PropertyImagePlaceholder2,
        altText: 'Luxurious modern villa',
        title: 'Lagos Property Center',
        subtitle: 'Discover our featured property of the week',
        buttonText: 'See More',
        buttonLink: '/featured-property/1', // Example link
    },
    {
        id: 2,
        imageUrl: images.PropertyImagePlaceholder,
        altText: 'Spacious downtown apartment',
        title: 'Urban Living Perfected',
        subtitle: 'Explore stunning city residences',
        buttonText: 'Explore Now',
        buttonLink: '/properties/urban',
    },
    {
        id: 3,
        imageUrl: images.PropertyImagePlaceholder3,
        altText: 'Cozy suburban home',
        title: 'Your Dream Suburban Home',
        subtitle: 'Family-friendly neighborhoods await',
        buttonText: 'Find Yours',
        buttonLink: '/properties/suburban',
    },
];

const PropertyShowcaseCarousel = ({ slides = slidesData }) => {

    if (!slides || slides.length === 0) {
        return null; // Or some fallback UI
    }

    const carouselId = "propertyShowcaseCarousel"; // Unique ID for the carousel

    return (
        <div id={carouselId} className="carousel slide carousel-fade property-showcase-carousel" data-bs-ride="carousel" data-aos="fade-down" data-aos-ease="ease-in" data-aos-duration="500" data-aos-once>
            {/* Indicators (dots at the bottom) */}
            <div className="carousel-indicators">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="wavy-bottom-svg-container img-fluid" style={{ zIndex: 5 /* Ensure it's above carousel content if needed, but below controls */ }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none"> {/* Adjust viewBox height (100 here) */}
                    <path d="M0,50 C150,150 350,0 500,50 C650,100 850,-20 1000,50 C1150,120 1300,0 1440,50 L1440,100 L0,100 Z" fill="#FFFFFF"></path> {/* fill="#FFFFFF" should be the background of the section BELOW the carousel */}
                </svg>
            </div>

            {/* Slides */}
            <div className="carousel-inner">
                {slides.map((slide, index) => (
                    <div key={slide.id} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="1000">
                        {/* Background Image with Dark Overlay */}
                        <div className="showcase-slide-image-container">
                            <Image
                                src={slide.imageUrl}
                                alt={slide.altText}
                                layout="fill"
                                objectFit="cover"
                                priority={index === 0} // Prioritize loading the first image
                                className="d-block w-100 showcase-img"
                            />

                            <div className="showcase-overlay"></div>
                        </div>

                        {/* Caption - Centered Content */}
                        <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100">

                            <div className="text-center text-white" style={{ maxWidth: '800px' }}>
                                <h1 className="display-4 fw-bold mb-3 text-primary">{slide.title}</h1>
                                <p className="lead fs-5 mb-4 ">{slide.subtitle}</p>
                                <Link href={slide.buttonLink}>
                                    <div className="btn btn-light btn-lg px-4 py-2">{slide.buttonText}</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls (Next/Prev Arrows) */}
            {/* <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#${carouselId}`}
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button> */}


        </div>
    );
};

export default PropertyShowcaseCarousel;