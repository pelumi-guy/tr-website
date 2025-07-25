// components/AboutUsIntro.js
import React from 'react';

const AboutUsIntro = () => {


     const introQuestion = "Who are we at Transcendent Realty?";
  const mainHeading = "About Us";
  const paragraph1 = "At TR (Transcendent Realty), we are redefining the real estate experience by delivering premium services tailored to meet the unique needs of every client. With a foundation built on trust, innovation, and excellence, we specialize in premium real estate services, brokerage, and consultancy. Whether you're buying, selling, renting, or investing, we guide you through the process with unmatched expertise and a commitment to exceptional service.";
  const paragraph2 = "Our portfolio spans luxurious residential properties, commercial spaces, and prime real estate opportunities that reflect the dynamic and vibrant landscape of Lagos and beyond.";
  const videoSrc = "/videos/stock-video.mp4";
  const videoPoster = "/images/video-poster.jpg";
  return (
    <section className="about-us-intro-section py-5">
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Top Text Content */}
        <div className="row mb-4 align-items-center"> {/* mb-4 for gap, align-items-center if columns have different heights */}
          <div className="d-none d-md-block col-lg-4 col-md-5 mb-4 mb-md-0">
            <h3 className="intro-question fw-semibold">{introQuestion}</h3>
          </div>
          <div className="col-lg-8 col-md-7">
            <h1 className="about-us-main-heading display-4 fw-bold mb-3">{mainHeading}</h1>
            <div className="d-block d-md-none col-12 mb-2 px-0">
            <h3 className="intro-question fw-semibold mx-0">{introQuestion}</h3>
          </div>
            <p className="about-paragraph lead">
                {paragraph1}
                <br />
                {paragraph2}
            </p>

          </div>
        </div>

        {/* Video Section */}
        <div className="video-wrapper shadow-sm">
          <video
            key={videoSrc} // Add key if src can change, helps React re-render
            className="w-100"
            src={videoSrc}
            poster={videoPoster}
            controls
            autoPlay
            muted // Autoplay usually requires video to be muted initially
            loop
            playsInline // Important for iOS Safari to play inline
            aria-label="Promotional stock video"
          >
            Your browser does not support the video tag.
            Please <a href={videoSrc}>download the video</a> instead.
          </video>
        </div>
      </div>
    </section>
  );
};

export default AboutUsIntro;