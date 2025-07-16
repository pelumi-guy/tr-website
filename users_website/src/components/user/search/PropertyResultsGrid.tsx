import React from 'react';
import PropertyCard, { Property } from '../fragments/PropertyCard';

interface PropertyResultsGridProps {
  properties: Property[];
  loading?: boolean;
}

const PropertyResultsGrid: React.FC<PropertyResultsGridProps> = ({ properties, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading properties...</p>
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No Properties Found</h4>
        <p className="text-muted">Try adjusting your search filters or keywords.</p>
      </div>
    );
  }

  return (
    <div className="row g-4 property-results-grid"> {/* g-4 for gap between cards */}
      {properties.map(property => (
        <div key={property.propertyId} className="col-12 col-md-6 col-lg-4 mx-5 d-flex align-items-between"> {/* d-flex and align-items-stretch for equal height cards */}
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default PropertyResultsGrid;