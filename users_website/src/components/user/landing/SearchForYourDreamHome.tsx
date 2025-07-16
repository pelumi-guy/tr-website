'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Search from '../layout/Search';
import { icons } from '@/exports/images';
import styles from '../../../app/page.module.css';

const SearchForYourDreamHome = () => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = () => {
        // console.log("Searching...");

        // if (keyword) {
        //     navigate(`/search/${keyword}`);
        // }

    };

    return (
        <section className='py-5'>
            <hgroup className={styles.sectionHeading}>
                <h2>Search For Your Dream Home </h2>
            </hgroup>

            <Search classNames='landing-main-search rounded-pill my-3' darkButton />

            <div className="row">
                <div className="col-6">
                    <select name='Location' id='location' title='location' defaultValue="Location" className='landing-search-filter'>
                        {/* <option value="" disabled selected hidden>Location</option> */}
                        <option value="Lagos">Lekki Phase One</option>
                        <option value="Abuja">Ikate</option>
                        <option value="Abuja">Orchid</option>
                    </select>
                </div>
                <div className="col-6">
                    <select name='Property Type' id='propertyType' title='propertyType' defaultValue="Property Type" className='landing-search-filter'>
                        <option value="" disabled selected hidden>Property Type</option>
                        <option value="Lagos">Terrace</option>
                        <option value="Abuja">Semi-detached</option>
                        <option value="Abuja">Fully Detached</option>
                    </select>
                </div>
            </div>



        </section>
    )
}

export default SearchForYourDreamHome