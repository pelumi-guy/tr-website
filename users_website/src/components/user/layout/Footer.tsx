import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import Telephone from '../../assets/svgs/icons/telephone.svg';
// import Message from '../../assets/svgs/icons/message.svg';
// import Instagram from '../../assets/svgs/icons/instagram.svg';

import { icons, images } from '@/exports/images';


const Footer = () => {
    return (
        <footer className="footer text-black pt-4 px-0">

            <div className="container-fluid row px-0 mx-0 main-footer">

                <div className="col-12 col-md-3 fg-subtle px-5">
                    <Image src={images.Logo} alt='brand logo' className='my-2 ' />

                    {/* <div className='mt-2'>
                        <Image src={Telephone} alt='telephone' className='my-2' />
                        &nbsp;
                        +012 345 6789
                        <br />
                        <Image src={Message} alt='message' className='my-2' />
                        &nbsp;
                        Hello@novodeus.co
                    </div> */}

                    <div className='mb-4'>
                        <Link href="#" className=''><Image src={icons.XIcon} alt='instagram' className='' /></Link>
                        &nbsp; &nbsp;
                        <Link href="#" className=''><Image src={icons.InstagramIcon} alt='instagram' className='' /></Link>
                        &nbsp; &nbsp;
                        <Link href="#"><Image src={icons.YoutubeIcon} alt='instagram' className='' /></Link>
                        &nbsp; &nbsp;
                        <Link href="#"><Image src={icons.LinkedIcon} alt='instagram' className='' /></Link>
                    </div>


                </div>

                <div className="col-12 col-md-9 px-5 px-md-0 row">
                    <div className="d-none d-md-block col-md-2"></div>

                    <div className="col-12 col-md-3 mt-2 mt-md-0">
                        <div className="footer-col">
                            <div className="footer-header mb-3">
                                Quick Links</div>
                            <Link href="/search">
                                <div className="footer-item mb-2">Property Search</div>
                            </Link>
                            <Link href="#!">
                                <div className="footer-item mb-2">Saved Properties</div>
                            </Link>
                            <Link href="#!" className="footer-item mb-2">
                                <div className="footer-item mb-2">Compare Listings</div>
                            </Link>
                            <Link href="/contact-us">
                                <div className="footer-item mb-2">Contact Us</div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 mt-2 mt-md-0">
                        <div className="footer-col">
                            <div className="footer-header mb-3">Resources</div>
                            <Link href="/about-us" className="footer-item mb-2">
                                <div className="footer-item mb-2">About Us</div></Link>
                            <Link href="#!" className="footer-item mb-2">
                                <div className="footer-item mb-2">Testimonials</div></Link>
                            <Link href="/#faq-accordion">
                                <div className="footer-item mb-2">FAQ</div></Link>
                        </div>
                    </div>

                    <div className="col-12 col-md-3 mt-2 mt-md-0">
                        <div className="footer-col">
                            <div className="footer-header mb-3">
                                Support</div>
                            <Link href="#!">
                                <div className="footer-item mb-2">Customer Support</div></Link>
                            <Link href="#!" className="footer-item mb-2">
                                <div className="footer-item mb-2">Schedule a Consultation</div></Link>
                        </div>
                    </div>
                </div>

            </div>

            <div className="py-3 copyright container-fluid d-flex justify-content-end align-items-center mx-0">
                <div className="px-3 px-md-5 justify-content-md-center fg-subtle">
                    Lagos Property Center by Transcendent Realty &copy; 2025
                </div>

            </div>

        </footer>
    )
}

export default Footer