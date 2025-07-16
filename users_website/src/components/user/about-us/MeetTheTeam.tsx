import React from 'react';
import Image from 'next/image';
import { images } from '@/exports/images';

const MeetTheTeam = () => {
     const title = "Meet the Team";
  const description = "Our team of dedicated professionals combines deep industry knowledge with a passion for helping clients achieve their goals. From real estate consultants to brokers, we work collaboratively to provide seamless experiences and achieve outstanding results.";
  const teamImages = [
    { src: images.TeamMemberOnePlaceholder, alt: "Team Member One" },
    { src: images.TeamMemberTwoPlaceholder, alt: "Team Member Two" },
  ];
  return (
    <section className="meet-the-team-section py-5">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="row align-items-center g-4 g-lg-5"> {/* g-lg-5 for larger gap on larger screens */}

          {/* Image Collage Column */}
          <div className="col-md-6">
            <div className="team-image-collage-wrapper">
              {/* Decorative Circles */}
              {/* To do: Animate these circles */}
              <div className="decorative-circle large-circle"></div>
              <div className="decorative-circle small-circle"></div>
              <div className="decorative-circle smallest-circle"></div>

              {/* Team Images - map through them for flexibility */}
              {teamImages.map((img, index) => (
                <div key={index} className={`team-image-item team-image-${index + 1} shadow-sm`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={300} // Example intrinsic width
                    height={400} // Example intrinsic height
                    layout="responsive"
                    objectFit="cover"
                    className="team-member-photo img-fluid"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text Content Column */}
          <div className="col-md-6">
            <div className="team-text-content">
              <h2 className="display-5 fw-bold mb-3">{title}</h2>
              <p className="lead">{description}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;