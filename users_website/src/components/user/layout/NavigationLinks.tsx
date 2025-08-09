// components/layout/NavigationLinks.tsx
'use client'; // This is the only part that needs to be a client component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// The navLinks array can live here or be passed as a prop
const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/explore', text: 'Explore' },
    { href: '/about-us', text: 'About' },
    { href: '/contact-us', text: 'Contact Us' },
];

const NavigationLinks = () => {
    const pathname = usePathname();

    return (
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <li className="nav-item" key={link.href}>
                        <Link
                            className={`nav-link mx-3 text-black ${isActive ? 'active' : ''}`}
                            aria-current={isActive ? 'page' : undefined}
                            href={link.href}
                        >
                            {link.text}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default NavigationLinks;