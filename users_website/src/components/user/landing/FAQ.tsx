'use client'

import React from "react";
import styles from "../../../app/page.module.css";
import ImportBootstrap from "../../utilities/ImportBoostrap";

const FAQ = () => {
    const faqs = [
        {
            question: "What is Transcendent Realty?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            question: "What services does Transcendent Realty offer?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            question: "Do I need an account to browse properties?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            question: "Can I filter properties by specific criteria?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            question: "How do I save a property I like?",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ]

    return (
        <main className={styles.landingSection}>
            <ImportBootstrap />
            <hgroup className="section-heading">
                <h2>Frequently Asked Questions</h2>
                <p>Explore FAQs to help you navigate the site and make the most of its features.</p>
            </hgroup>


            <div className={`accordion accordion-flush ${styles.faq}`} id="accordionFlushExample">
                {faqs.map((faq, idx) => {
                    return (
                        <div className="accordion-item my-3 curved-border" key={idx}>
                            <h2 className="accordion-header curved-border" id={`flush-heading-${idx}`}>
                                <button className="accordion-button faq-accordion collapsed fw-bold curved-border" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapse-${idx}`} aria-expanded="false" aria-controls={`flush-collapse-${idx}`}>
                                    {faq.question}
                                </button>
                            </h2>
                            <div id={`flush-collapse-${idx}`} className="accordion-collapse collapse " aria-labelledby={`flush-heading-${idx}`} data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body curved-border">
                                    {faq.answer}
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