'use client';

import React from 'react';
import Image from 'next/image';
import { icons } from '@/exports/images';
import CountUp from 'react-countup';
// Assuming you have an icon library or SVGs

interface StatItem {
    id: number | string;
    count: number;
    label: string;
    suffix?: string; // e.g., for "+"
}

interface TestimonialItem {
    id: number | string;
    title: string;
    text: string;
    icon?: React.ReactNode; // For custom icons per testimonial
}

interface StatsAndTestimonialsProps {
    stats?: StatItem[];
    testimonialsTitle?: string;
    testimonialsSubtitle?: string;
    testimonials?: TestimonialItem[];
}

const defaultStats: StatItem[] = [
    { id: 1, count: 8, label: 'PRIME<br />LOCATIONS' },
    { id: 2, count: 67, label: 'SATISFIED<br />CUSTOMERS' },
    { id: 3, count: 128, label: 'HOUSES<br />SOLD' },
];

const defaultTestimonials: TestimonialItem[] = [
    { id: 1, title: 'Amazing Experience!', text: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.' },
    { id: 2, title: 'Highly Recommended', text: 'Working with them was a breeze. They truly understand the market and client needs. Will definitely come back!' },
    { id: 3, title: 'Professional & Efficient', text: 'The team was incredibly professional and made the entire process smooth and efficient from start to finish.' },
    { id: 4, title: 'Exceeded Expectations', text: 'They went above and beyond to help us find our dream home. Couldn\'t be happier with the service provided.' },
    { id: 5, title: 'Title', text: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ' },
    { id: 6, title: 'Title', text: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. ' },
];

const StatsAndTestimonials: React.FC<StatsAndTestimonialsProps> = () => {
    const stats = defaultStats;
    const testimonialsTitle = "What Our Customers are Saying";
    const testimonialsSubtitle = "Check out reviews from real satisfied customers...";
    const testimonials = defaultTestimonials;

    return (

        <section className="stats-testimonials-section"> {/* py-4 for 24px padding */}
            <div className="container" style={{ maxWidth: '1200px' }}>

                {/* Stats Counter Cards */}
                {stats && stats.length > 0 && (
                    <div className="row justify-content-center g-3 g-lg-4 mb-5 pb-lg-4"> {/* mb-5 pb-lg-4 for the large 120px gap */}
                        {stats.map((stat) => (
                            <div key={stat.id} className="col-12 d-flex justify-content-center col-md-4 col-lg-3">
                                <div className="stat-card text-center shadow-sm">
                                    {/* <div className="stat-count display-3 fw-bold">{stat.count}{stat.suffix}</div> */}
                                    <CountUp end={stat.count} duration={5} className='stat-count display-3 fw-bold' />
                                    <p className="stat-label text-uppercase small fw-medium" dangerouslySetInnerHTML={{ __html: stat.label }}></p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Testimonials Section */}
                {testimonials && testimonials.length > 0 && (
                    <div className="testimonials-content">
                        <hgroup className="section-heading mb-4 mb-md-6">
                            <h2 className="section-title fw-bold">{testimonialsTitle}</h2>
                            <p className="lead text-muted">{testimonialsSubtitle}</p>
                        </hgroup>

                        <div className="row g-4">
                            {testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="col-md-4 pe-5 my-3">
                                    <div className="testimonial-item d-flex">
                                        <div className="testimonial-icon me-3 mt-1">
                                            <Image src={icons.InfoIcon} alt="info" />
                                        </div>
                                        <div className="testimonial-text">
                                            <h5 className="testimonial-title fw-semibold">{testimonial.title}</h5>
                                            <p className="mb-0 small">{testimonial.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default StatsAndTestimonials;