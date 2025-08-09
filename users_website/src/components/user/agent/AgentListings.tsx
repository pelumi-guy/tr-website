import React from 'react';
import styles from '../../../app/page.module.css';
import PropertyCard from '../fragments/PropertyCard';
import { images } from '@/exports/images';
import { IProperty } from '@/types/property';
import { AgentProfileData } from '@/types/common';




const AgentListings = () => {

    const dummyProperties : Array<IProperty> = [{
        _id: "1",
        title: 'Luxury 5-Bedroom Detached Duplex in Lekki',
        description: 'A stunning and spacious duplex with modern amenities, a swimming pool, and a BQ. Perfect for a family looking for comfort and class.',
        listingType: 'For Sale',
        propertyType: 'House',
        propertySubtype: 'Detached Duplex',
        location: { street: '123 Admiralty Way', city: 'Lekki', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 350000000, currency: 'NGN' },
        details: { bedrooms: 5, bathrooms: 5, toilets: 6, parkingSpaces: 4, livingrooms: 5 },
        area: { total: 650, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
        isFeatured: true,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    },
    {
        _id: "2",
        title: 'Modern 3-Bedroom Apartment for Rent in Ikoyi',
        description: 'Well-finished 3-bedroom apartment in a secure and serene serviced estate. Comes with 24/7 power and security.',
        listingType: 'For Rent',
        propertyType: 'Apartment',
        propertySubtype: 'Flat',
        location: { street: '456 Orchid Road', city: 'Lekki', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 15000000, currency: 'NGN' },
        details: { bedrooms: 3, bathrooms: 3, toilets: 4, parkingSpaces: 2, livingrooms: 3 },
        area: { total: 220, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
        isFeatured: true,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    },
    {
        _id: "3",
        title: 'Commercial Land on a Major Road in Ikeja',
        description: 'A prime plot of land measuring 1200 sqm, suitable for commercial development. Fenced and gated with a good title.',
        listingType: 'For Sale',
        propertyType: 'Land',
        location: { street: '789 Lekki County', city: 'Ajah', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 500000000, currency: 'NGN' },
        details: { bedrooms: 3, bathrooms: 3, toilets: 4, parkingSpaces: 2, livingrooms: 3 },
        area: { total: 1200, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570979/Transcendent_Realty/Sample_Images/SemiDetachedPlaceholder_cxff1j.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570979/Transcendent_Realty/Sample_Images/SemiDetachedPlaceholder_cxff1j.png'],
        isFeatured: false,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    },
    {
        _id: "4",
        title: 'Luxury 6-Bedroom Detached Triplex in Ajah',
        description: 'A stunning and spacious duplex with modern amenities, a swimming pool, and a BQ. Perfect for a family looking for comfort and class.',
        listingType: 'For Sale',
        propertyType: 'House',
        propertySubtype: 'Detached Triplex',
        location: { street: 'Lekki County', city: 'Ajah', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 400000000, currency: 'NGN' },
        details: { bedrooms: 6, bathrooms: 4, toilets: 7, parkingSpaces: 4, livingrooms: 6 },
        area: { total: 750, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
        isFeatured: true,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    }
];

const agent: AgentProfileData = {
    firstName: 'John', lastName: 'Doe', title: 'Lead Agent', phone: '+234 800 123 4567', email: 'johndoe@transcendentralty.com', rating: 4.0, bio: [ "With years of experience and a deep understanding of the local real estate market, John Doe is dedicated to helping clients find their dream properties or secure the best deals on their investments. Specializing in luxury residential, commercial, and investment properties, John Doe combines market expertise with a personalized approach to deliver exceptional results every time.", "Whether you're a first-time buyer, an investor, or looking to sell your property, John Doe is here to guide you every step of the way."], imageUrl: images.TeamMemberOnePlaceholder,
    quote: "Your satisfaction is my priority. Let's turn your real estate goals into reality!",
};

    return (
        <section className='container'>
            <hgroup className="section-heading">
                <h2>{agent.firstName}&apos;s Listings</h2>
                <p className='mt-2 text-muted'>Book {agent.firstName} for a tour to see these listings.</p>
            </hgroup>

            <div className="row d-flex justify-content-lg-between justify-content-center mx-0 px-0">
                {
                    dummyProperties.map((property, key) => (
                        <PropertyCard
                            property={property}
                            key={key}
                        />

                    ))
                }
            </div>


        </section>
    )
}

export default AgentListings