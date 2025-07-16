import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/components/user/layout/Search'

import { images } from "@/exports/images";
// import Logo from '../../assets/svgs/Logo.svg';
// import ImportBootstrap from '../reusables/ImportBoostrap';
// import Button from '../reusables/Button';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg px-lg-5">
            {/* <ImportBootstrap /> */}
            <div className="container-fluid d-flex">
                <Link className="navbar-brand py-0" href="/">
                    <Image src={images.Logo} alt='brand logo' className='my-2' />
                </Link>
                {/* <Image src={Logo} alt='brand logo' className='mt-0'/> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse navbar-link " id="navbarText">
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto ">
                        <li className="nav-item mx-3">
                            <Link className="nav-link active text-black" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link text-black" href="/explore">Explore</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link text-black" href="/about-us">About</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link text-black" href="/contact-us">Contact Us</Link>
                        </li>
                    </ul>

                    <div style={{ backgroundColor: "#f5f5f5" }}>
                        <Search classNames='bg-black header-search' darkButton={false} />
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Header