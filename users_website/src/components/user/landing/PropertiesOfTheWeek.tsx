import React from 'react';
import styles from '../../../app/page.module.css';
import PropertyCard from '../fragments/PropertyCard';
import { images } from '@/exports/images';
import { Property } from '@/types/common';
import { IProperty } from '@/types/property';

const PropertiesOfTheWeek = ({
    properties
} : PropertiesOfTheWeekProps) => {

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
        <section className={styles.landingSection}>
            <hgroup className="section-heading">
                <h2>Properties of the Week</h2>
                <p>Our top picks for the week</p>
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

export default PropertiesOfTheWeek


interface PropertiesOfTheWeekProps {
  properties: Array<IProperty>;
}