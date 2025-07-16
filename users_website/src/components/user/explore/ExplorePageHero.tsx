import Link from 'next/link';
import Image from 'next/image';

import { icons, images } from '@/exports/images';

// Sample data for location cards - pass as props or fetch
const locationTeasers = [
  { id: 1, title: 'Ajah', description: 'Explore Ajah...', link: '/explore/ajah' },
  { id: 2, title: 'Lekki', description: 'Explore Lekki...', link: '/explore/lekki' },
  { id: 3, title: 'Ikoyi', description: 'Explore Ikoyi...', link: '/explore/ikoyi' },
];

const ExplorePageHero = ({
  backgroundImageUrl = "/images/PropertyImagePlaceholder2.png",
  mainTitle = "AJAH",
  subTitlePrefix = "Discover all",
  listingCount = 99,
  subTitleSuffix = "listings",
  locations = locationTeasers,
}) => {
  return (
    <section
      className="page-hero"
      style={{ '--hero-bg-image': `url(${backgroundImageUrl})` }}
    >
      <div className="hero-overlay"></div>
      <div className="container-fluid h-100 d-flex flex-column"> {/* Use container-fluid for full-width content alignment */}

        {/* Main Hero Content - Takes up remaining space and centers its content */}
        <div className="hero-main-content flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center text-white mt-md-1" data-aos="fade-down" data-aos-ease="ease-in" data-aos-duration="500">
          <h1 className="display-1 fw-bold hero-title">{mainTitle}</h1>
          <Link href="/explore-listings" >
            <div className="hero-subtitle-link d-inline-flex align-items-center fs-4">
              {subTitlePrefix} {listingCount} {subTitleSuffix}
              &nbsp;&nbsp;
              <Image src={icons.RightUpArrow} alt='right up arrow' className='' />
            </div>
          </Link>
        </div>

        {/* Location Teaser Cards Area */}
        <div className="location-teasers-container pb-4 pt-3">
          <div className="row justify-content-center g-1 g-md-4">
            {locations.map((loc) => (
              <div key={loc.id} className="col-4 location-teaser-card-wrapper">
                <Link href={loc.link}>
                  <div className="card location-teaser-card text-decoration-none" data-aos="flip-up" data-aos-ease="ease-in" data-aos-duration="1200">
                    <div className="card-body text-center">
                      <h5 className="card-title fw-semibold">{loc.title}</h5>
                      <p className="card-text small text-muted mb-0">{loc.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExplorePageHero;