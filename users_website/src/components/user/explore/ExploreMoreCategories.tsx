import Link from 'next/link';
import Image from 'next/image'; // For category images

// Sample data for categories - pass as props or fetch
const categoriesData = [
  {
    id: 1,
    label: 'SMART HOMES',
    imageUrl: '/images/SmartHomesPlaceholder.png',
    altText: 'Smart home technology interface',
    link: '/categories/smart-homes',
  },
  {
    id: 2,
    label: 'SEMI DETACHED',
    imageUrl: '/images/SemiDetachedPlaceholder.png',
    altText: 'Modern semi-detached house',
    link: '/categories/semi-detached',
  },
  {
    id: 3,
    label: 'FULLY DETACHED',
    imageUrl: '/images/FullyDetachedPlaceholder.png',
    altText: 'Luxurious fully detached villa',
    link: '/categories/fully-detached',
  },
];

const ExploreMoreCategories = ({
  title = "Explore more categories",
  subtitle = "View various listing categories...",
  categories = categoriesData,
}) => {
  return (
    <section className="explore-categories-section py-5"> {/* py-5 for Bootstrap padding (64px is ~4rem, so py-5 is 3rem. Adjust if needed or use custom class) */}
      <div className="container" style={{ maxWidth: '1200px' }}> {/* Max width from Figma */}
        {/* Text Content Heading */}
        <hgroup className="mb-4 mb-md-5 section-heading"> {/* mb- for margin bottom, adjust gap */}
          <h2 className="section-title fw-bold">{title}</h2>
          <p className="lead text-muted">{subtitle}</p>
        </hgroup>

        {/* Categories Grid/Row */}
        <div className="row g-5 justify-content-center"> {/* g-4 for gap between columns */}
          {categories.map((category) => (
            <div key={category.id} className="col-12 col-md-6 col-lg-4 d-flex" data-aos="flip-right" data-aos-ease="ease-in" data-aos-duration="1200"> {/* d-flex for equal height cards if content varies */}
              <Link href={category.link} legacyBehavior>
                <a className="card category-card text-decoration-none w-100">
                  <div className="category-card-image-wrapper">
                    <Image
                      src={category.imageUrl}
                      alt={category.altText}
                      layout="fill"
                      objectFit="cover"
                      className="category-img"
                    />
                  </div>
                  <div className="card-img-overlay d-flex align-items-end p-0"> {/* Overlay for the label */}
                    <div className="category-label w-100 text-center">
                      <span className="label-text d-inline-block">{category.label}</span>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreMoreCategories;