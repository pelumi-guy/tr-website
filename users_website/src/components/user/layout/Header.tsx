// components/layout/Header.tsx
// NO 'use client' directive here. This is a Server Component.

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Search from '@/components/user/layout/Search';
import { images } from "@/exports/images";
import BootstrapClient from '../../utilities/BoostrapClient';
import NavigationLinks from './NavigationLinks'; // <-- Import the new Client Component

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg px-lg-5">
            <div className="container-fluid">
                <Link className="navbar-brand py-0" href="/">
                    <Image src={images.Logo} alt='brand logo' className='my-2' />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbarCollapse"
                    aria-controls="mainNavbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbarCollapse">
                    {/*
                      Here, we are passing a Client Component as a child of a Server Component.
                      This is a core pattern of the App Router.
                    */}
                    <NavigationLinks />

                    <div className="search-wrapper-div">
                        <Search
                            classNames='header-search bg-black'
                            headerSearch={true}
                            darkButton={false}
                            key={'header-search'}
                        />
                    </div>
                </div>
            </div>

            {/*
              The Bootstrap JS initializer component.
              This component is also a Client Component, which is fine.
            */}
            <BootstrapClient />
        </nav>
    );
}

export default Header;