// components/AmenitiesGrid.tsx
import React from 'react';
// Import specific amenity icons
import { FaBed, FaCouch, FaBath, FaSwimmingPool } from 'react-icons/fa'; // Example general icons
// You might need more specific icons like: GiBathtub, GiHomeGarage, MdOutlineOutdoorGrill etc.

export interface Amenity {
  id: string;
  icon: React.ReactNode; // Allow passing any JSX element as icon
  text: string;
}

interface AmenitiesGridProps {
  amenities: Amenity[];
}

// Example: Create a helper to map text to icons if needed, or pass icons directly
const getAmenityIcon = (text: string): React.ReactNode => {
  if (text.toLowerCase().includes('bedroom')) return <FaBed size={20} className="text-primary" />;
  if (text.toLowerCase().includes('living room')) return <FaCouch size={20} className="text-primary" />;
  if (text.toLowerCase().includes('bath')) return <FaBath size={20} className="text-primary" />;
  if (text.toLowerCase().includes('swimming pool')) return <FaSwimmingPool size={20} className="text-primary" />;
  return <FaBed size={20} className="text-primary" />; // Default
};


const AmenitiesGrid: React.FC<AmenitiesGridProps> = ({ amenities }) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="amenities-grid-section">
      <h4 className="mb-3 fw-semibold section-subtitle">Key Features & Amenities</h4>
      <div className="row g-3">
        {amenities.map(amenity => (
          <div key={amenity.id} className="col-md-6 col-lg-6"> {/* 2 per row on md/lg */}
            <div className="amenity-item card card-body h-100 flex-row align-items-center p-2 shadow-sm">
              <div className="amenity-icon me-2 flex-shrink-0">
                {amenity.icon /* Use passed icon */}
              </div>
              <p className="amenity-text mb-0 small">{amenity.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesGrid;