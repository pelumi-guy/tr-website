import React from 'react';
import styles from '../../../app/page.module.css';
import PropertyCard from '../fragments/PropertyCard';
import { images } from '@/exports/images';
import { IProperty } from '@/types/property';

const HotRightNow = ({
    properties
} : HotRightNowProps) => {

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
        <section className={` ${styles.landingSection}`}>
            <hgroup className="section-heading">
                <h2>Hot Right Now</h2>
                <p>Our hot selling properties</p>
            </hgroup>

            <div className="row justify-content-center">
                {
                    properties.map((property, key) => (
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

export default HotRightNow

interface HotRightNowProps {
  properties: Array<IProperty>;
}