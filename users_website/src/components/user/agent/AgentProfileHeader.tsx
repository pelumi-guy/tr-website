// components/agent/AgentProfileHeader.tsx
import React from 'react';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
// Using react-icons for icons
import { FiPhone, FiMail, FiStar } from 'react-icons/fi';
import { AgentProfileData } from '@/types/common';

interface AgentProfileHeaderProps {
  agent: AgentProfileData;
}

// Helper function to render star ratings
const renderStars = (rating: number) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0; // Not used in this design, but good to have
  const stars = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= fullStars) {
      // Filled star
      stars.push(<FiStar key={`star-${i}`} className="text-warning filled-star" fill="currentColor" />);
    } else {
      // Empty star
      stars.push(<FiStar key={`star-${i}`} className="text-muted" />);
    }
  }
  return <div className="d-flex align-items-center">{stars}</div>;
};


const AgentProfileHeader: React.FC<AgentProfileHeaderProps> = ({ agent }) => {
  return (
    <section className="agent-profile-header-section py-5">
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Main Agent Card */}
        <div className="agent-profile-card card card-body shadow-sm">
          <div className="row align-items-center g-4 g-lg-5">

            {/* Left Column: Agent Details */}
            <div className="col-lg-7">
              <div className="agent-details">
                <h1 className="agent-name display-4 fw-bold">{agent.firstName}</h1>
                <p className="agent-title text-muted fs-5 mb-3">{agent.title}</p>

                <div className="contact-info d-flex flex-wrap align-items-center mb-3">
                  <a href={`tel:${agent.phone}`} className="d-flex align-items-center text-decoration-none me-4 contact-link">
                    <FiPhone size={18} className="me-2 flex-shrink-0" />
                    <span>{agent.phone}</span>
                  </a>
                  <a href={`mailto:${agent.email}`} className="d-flex align-items-center text-decoration-none contact-link">
                    <FiMail size={18} className="me-2 flex-shrink-0" />
                    <span>{agent.email}</span>
                  </a>
                </div>

                <div className="star-rating d-flex align-items-center mb-4">
                  {renderStars(agent.rating)}
                  <span className="rating-text ms-2 text-muted">{agent.rating.toFixed(1)} rating</span>
                </div>

                <div className="agent-bio mb-4">
                  {agent.bio.map((paragraph, index) => (
                    <p key={`bio-${index}`} className="text-muted lh-lg">{paragraph}</p>
                  ))}
                </div>

                {/* This button might eventually open a modal, requiring it to be a Client Component.
                    For now, it can be a simple button or link. */}
                <Button variant="dark" size="lg" className="book-a-tour-btn">
                  Book A Tour
                </Button>
              </div>
            </div>

            {/* Right Column: Agent Image */}
            <div className="col-lg-5">
              <div className="agent-image-wrapper">
                <Image
                  src={agent.imageUrl || "/images/default-agent-portrait.jpg"}
                  alt={`Portrait of ${agent.firstName}`}
                  width={500} // Intrinsic width of source image
                  height={600} // Intrinsic height of source image
                  layout="responsive"
                  objectFit="cover"
                  className="agent-image"
                  priority // Load this image early as it's LCP
                />
              </div>
            </div>

          </div>
        </div>

        {/* Quote Section Below Card */}
        <div className="agent-quote text-center mt-5">
          <blockquote className="blockquote fs-4 fst-italic text-body-emphasis">
            &quot;{agent.quote}&quot;
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AgentProfileHeader;