import React from 'react';
import styles from '../../../app/page.module.css';
import PropertyCard from '../fragments/PropertyCard';
import { images } from '@/exports/images';

const SimilarListings = () => {

    const dummyProperties = [
        {
            imageUrl: images.PropertyImagePlaceholder,
            price: 1_000_000,
            beds: 4,
            baths: 5,
            lounges: 3,
            title: 'Sample Property',
            location: 'Lekki',
            isBookmarked: true,
            propertyId: 1,
        },
        {
            imageUrl: images.PropertyImagePlaceholder,
            price: 1_000_000,
            beds: 4,
            baths: 5,
            lounges: 3,
            title: 'Sample Property',
            location: 'Lekki',
            isBookmarked: false,
            propertyId: 1,
        },
        {
            imageUrl: images.PropertyImagePlaceholder,
            price: 1_000_000,
            beds: 4,
            baths: 5,
            lounges: 3,
            title: 'Sample Property',
            location: 'Lekki',
            isBookmarked: true,
            propertyId: 1,
        }
    ];

    return (
        <section className=''>
            <hgroup className="section-heading">
                <h2>Similar Listings</h2>
                <p>People also checked the following out </p>
            </hgroup>

            <div className="row d-flex justify-content-between mx-0 px-0">
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

export default SimilarListings