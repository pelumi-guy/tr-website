// components/MissionStatementSection.js
import React from 'react';
import Image from 'next/image';
import { images } from '@/exports/images';

const MissionStatement = () => {
  const imageAlt = "Team members' hands clasped together in unity";
  const quoteText = "To be a leader in the real estate industry by setting new standards in quality, service, and innovation. We aim to empower our clients with the tools and knowledge to make informed real estate decisions that create long-term value.";

  return (
    <section className="mission-statement-section py-5">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="row align-items-center g-4"> {/* g-4 for gap, align-items-center for vertical alignment */}
          {/* Image Column */}
          <div className="col-md-6 col-lg-5" data-aos="slide-right" data-aos-ease="linear" data-aos-duration="500">
            <div className="mission-image-wrapper shadow-sm">
              <Image
                src={images.TeamworkHands} // Placeholder
                alt={imageAlt}
                width={500} // Intrinsic width of the image for aspect ratio calculation
                height={350} // Intrinsic height
                layout="responsive" // Makes image scale with container width
                objectFit="cover" // Optional: if you want to ensure it covers a fixed aspect ratio container
                className="mission-image"
              />
            </div>
          </div>

          {/* Quote Column */}
          <div className="col-md-6 col-lg-7" data-aos="slide-left" data-aos-ease="linear" data-aos-duration="500">
            <div className="mission-quote-wrapper">
              <span className="quote-mark open-quote" aria-hidden="true">“</span>
              <blockquote className="mission-quote-text">
                {quoteText}
              </blockquote>
              <span className="quote-mark close-quote" aria-hidden="true">”</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;