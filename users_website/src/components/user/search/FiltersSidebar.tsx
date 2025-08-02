'use client'

// components/FiltersSidebar.tsx
import React, { useState } from 'react';
import { Form, Badge } from 'react-bootstrap'; // Using react-bootstrap for form controls
// import { FiX } from 'react-icons/fi';

export interface Filters {
  keywords: string[];
  maxPrice: number;
  locations: string[];
}

interface FiltersSidebarProps {
  initialFilters: Filters;
  availableLocations: string[]; // e.g., ['Lekki', 'Ajah', 'Ikoyi']
  onFilterChange: (filters: Filters) => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  initialFilters,
  availableLocations,
  onFilterChange,
}) => {
  const [keywords, setKeywords] = useState<string[]>(initialFilters.keywords);
  const [maxPrice, setMaxPrice] = useState<number>(initialFilters.maxPrice);
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialFilters.locations);

  const handleKeywordRemove = (keywordToRemove: string) => {
    const updatedKeywords = keywords.filter(k => k !== keywordToRemove);
    setKeywords(updatedKeywords);
    onFilterChange({ keywords: updatedKeywords, maxPrice, locations: selectedLocations });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(e.target.value, 10);
    setMaxPrice(newPrice);
    onFilterChange({ keywords, maxPrice: newPrice, locations: selectedLocations });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    const isChecked = e.target.checked;
    let updatedLocations;
    if (isChecked) {
      updatedLocations = [...selectedLocations, location];
    } else {
      updatedLocations = selectedLocations.filter(l => l !== location);
    }
    setSelectedLocations(updatedLocations);
    onFilterChange({ keywords, maxPrice, locations: updatedLocations });
  };

  return (
    <div className="filters-sidebar card shadow-sm">
      <div className="card-body">
        {/* Keywords */}
        <div className="mb-4 filter-section">
          <h6 className="filter-title fw-semibold mb-2">Keywords</h6>
          {keywords.length > 0 ? (
            keywords.map(keyword => (
              <Badge key={keyword} pill bg="success" className="me-1 mb-1 p-2 keyword-badge">
                {keyword}
                {/* <FiX
                  size={14}
                  className="ms-1 cursor-pointer"
                  onClick={() => handleKeywordRemove(keyword)}
                  aria-label={`Remove ${keyword} keyword`}
                /> */}
                &nbsp;
                &#10005;
              </Badge>
            ))
          ) : (
            <p className="text-muted small mb-0">No keywords applied.</p>
          )}
        </div>

        {/* Max Price */}
        <div className="mb-4 filter-section">
          <h6 className="filter-title fw-semibold mb-2">Max Price</h6>
          <Form.Label htmlFor="maxPriceRange" className="small text-muted">
            Up to ₦{maxPrice.toLocaleString()}
          </Form.Label>
          <Form.Range
            id="maxPriceRange"
            min={50_000_000}
            max={1_500_000_000}
            step={1_000_000}
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* Location */}
        <div className="filter-section">
          <h6 className="filter-title fw-semibold mb-2">Location</h6>
          {availableLocations.map(location => (
            <Form.Check
              key={location}
              type="checkbox"
              id={`location-${location.toLowerCase()}`}
              label={location}
              value={location}
              checked={selectedLocations.includes(location)}
              onChange={handleLocationChange}
              className="mb-1 location-checkbox"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;