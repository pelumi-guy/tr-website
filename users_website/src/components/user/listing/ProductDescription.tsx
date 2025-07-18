'use client'; // This makes it a Client Component

import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Icons for show more/less
import { Amenity } from './AmenitiesGrid';

interface ProductDescriptionProps {
    initialText: string;
    fullText?: string; // Optional: if different from initialText when expanded
    keyFeatures: string[];
    maxInitialChars?: number; // Characters to show before "Show More..."
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
    initialText,
    fullText,
    keyFeatures,
    maxInitialChars = 200, // Default character limit for initial view
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const displayFullText = fullText || initialText;
    const showToggle = displayFullText.length > maxInitialChars;
    const textToShow = isExpanded || !showToggle ? displayFullText : `${displayFullText.substring(0, maxInitialChars)}...`;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <section className="product-description-section card card-body mt-6 shadow-sm"> {/* Using card for styling consistency */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className="section-main-title fw-semibold mb-0">Description</h3>
                {showToggle && (
                    <button
                        onClick={toggleExpanded}
                        className="btn btn-link btn-sm text-decoration-none show-more-less-btn"
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? 'Show Less' : 'Show More...'}
                        {isExpanded ? <FiChevronUp className="ms-1" /> : <FiChevronDown className="ms-1" />}
                    </button>
                )}
            </div>

            <p className="description-intro-text text-muted mb-3 lh-lg">{textToShow}</p>

            {keyFeatures && keyFeatures.length > 0 && (
                <div className="key-features-container">
                    <h5 className="key-features-title fw-medium mb-2">Key Features:</h5>
                    <ul className="list-unstyled key-features-list ps-0">
                        {keyFeatures.map((feature, index) => (
                            <li key={index} className="d-flex align-items-start mb-1">
                                <span className="feature-bullet me-2">–</span> {/* Using an en-dash as bullet */}
                                <span className="feature-text small">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default ProductDescription;