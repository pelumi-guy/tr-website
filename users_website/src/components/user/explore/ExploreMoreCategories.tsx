// components/user/explore/ExploreMoreCategories.tsx
'use client'; // This component now needs to be a client component for react-paginate

import Link from 'next/link';
import Image from 'next/image';
import { IPaginatedProperties } from '@/types/property';
import ReactPaginate from 'react-paginate';
import PropertyCard from '../fragments/PropertyCard';

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

// Updated props interface
interface IExploreMoreCategoriesProps {
  listings: IPaginatedProperties | null,
  isLoading: boolean,
  currentPage: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
}

const ExploreMoreCategories = ({
  listings,
  isLoading,
  currentPage,
  handlePageChange
}: IExploreMoreCategoriesProps) => {
  const title = "Explore more categories";
  const subtitle = "View various listing categories...";
  const categories = categoriesData;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-5">
          <span className="spinner-border spinner-border-lg" role="status" aria-hidden="true"></span>
          <p className="mt-2 text-muted">Loading Properties...</p>
        </div>
      );
    }

    if (listings?.properties && listings?.properties.length > 0) {
      // --- Render Paginated Properties ---
      return (
        <>
          <div className="row g-4">
            {listings.properties.map((property) => (
              <div key={property._id} className="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* --- ReactPaginate Component --- */}
          {listings.pagination.total > 1 && (
            <ReactPaginate
              previousLabel={'< Prev'}
              nextLabel={'Next >'}
              breakLabel={'...'}
              pageCount={listings.pagination.totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={'pagination justify-content-center mt-5'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
              forcePage={currentPage - 1} // 0-indexed current page
            />
          )}
        </>
      );
    }

    // --- Render Placeholder Categories ---
    // This will show if loading is false but properties are null or empty
    return (
      <div className="row g-5 justify-content-center">
        {categories.map((category) => (
          <div key={category.id} className="col-12 col-md-6 col-lg-4 d-flex" data-aos="flip-right" data-aos-ease="ease-in" data-aos-duration="1200">
            <Link href={category.link} className="card category-card text-decoration-none w-100">
              <div className="category-card-image-wrapper">
                <Image
                  src={category.imageUrl}
                  alt={category.altText}
                  layout="fill"
                  objectFit="cover"
                  className="category-img"
                />
              </div>
              <div className="card-img-overlay d-flex align-items-end p-0">
                <div className="category-label w-100 text-center">
                  <span className="label-text d-inline-block">{category.label}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="explore-categories-section py-5">
      <div className="container" style={{ maxWidth: '1200px' }}>
        <hgroup className="mb-4 mb-md-5 section-heading">
          <h2 className="section-title fw-bold">{title}</h2>
          <p className="lead text-muted">{subtitle}</p>
        </hgroup>

        {renderContent()}
      </div>
    </section>
  );
};

export default ExploreMoreCategories;