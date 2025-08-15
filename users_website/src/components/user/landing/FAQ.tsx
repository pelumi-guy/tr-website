'use client'

import React from "react";
import styles from "../../../app/page.module.css";
import BootstrapClient from "../../utilities/BoostrapClient";

const FAQ = () => {
    const faqs = [
        {
            question: "What is Lagos Property Center?",
            answer: "Lagos Property Center is a premier real estate platform built and managed by <b><em>Transcendent Realty Services</em></b> to simplify the process of buying, renting, and investing in property across Lagos. We combine a curated portfolio of high-quality listings with innovative technology, including our AI-powered search, to deliver a seamless and exceptional property experience for our clients."
        },
        {
            question: "What services do you offer?",
            answer: "We offer a comprehensive suite of services for all your real estate needs. Our platform features a curated marketplace for property sales and rentals, advanced search and filtering tools, and our unique AI-powered search to help you find your dream home faster. We also connect you with professional, vetted agents and provide a simple process to book property tours directly from our listings."
        },
        {
            question: "Do I need an account to use the site?",
            answer: "No, you do not need an account to browse our extensive collection of property listings. However, creating a free account unlocks several powerful features, such as the ability to save your favorite properties, manage your profile for a personalized experience, and easily book tours with our expert agents."
        },
        {
            question: "How can I refine my property search?",
            answer: "Our search page is equipped with a powerful set of filters to help you pinpoint the perfect property. You can easily refine your search by location, price range, property type (like duplex or apartment), number of bedrooms, and other key features and amenities to match your exact criteria."
        },
        {
            question: "How does the AI-powered search work?",
            answer: "Our AI-powered search allows you to find properties by describing what you're looking for in plain, natural language. Instead of using rigid filters, you can simply type a prompt like 'a modern 4-bedroom duplex in Lekki with a swimming pool,' and our AI will intelligently parse your request to find the most relevant listings that match your vision."
        },
        {
            question: "How do I book a tour for a property?", // Added Bonus FAQ
            answer: "Booking a tour is simple. Once you find a property you're interested in, just navigate to its details page. You will find a prominent <b>'Book A Tour'</b> button. Clicking it will guide you through a quick process to schedule a viewing with the designated agent at a time that works for you."
        }
    ];

    return (
        <main className={styles.landingSection}>
            <BootstrapClient />
            <hgroup className="section-heading">
                <h2>Frequently Asked Questions</h2>
                <p>Explore FAQs to help you navigate the site and make the most of its features.</p>
            </hgroup>


            <div className={`accordion accordion-flush ${styles.faq}`} id="faq-accordion">
                {faqs.map((faq, idx) => {
                    return (
                        <div className="accordion-item my-3 curved-border" key={idx}>
                            <h2 className="accordion-header curved-border" id={`flush-heading-${idx}`}>
                                <button className="accordion-button faq-accordion collapsed fw-bold curved-border" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${idx}`} aria-expanded="false" aria-controls={`flush-collapse-${idx}`}>
                                    {faq.question}
                                </button>
                            </h2>
                            <div id={`flush-collapse-${idx}`} className="accordion-collapse collapse " aria-labelledby={`flush-heading-${idx}`} data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body curved-border"
                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                >
                                    {/* {faq.answer} */}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </main>
    )
}

export default FAQ