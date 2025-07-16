'use client'

import React, { useState } from 'react';
import { Form, InputGroup, Button, ButtonGroup } from 'react-bootstrap';
import { FiSearch, FiCheck } from 'react-icons/fi';
import Search from '../layout/Search';

export type SortOption = 'price_asc' | 'price_desc' | 'recommended';

interface SearchBarAndSortProps {
  initialSearchQuery: string;
  initialSortOption: SortOption;
  onSearch: (query: string) => void;
  onSortChange: (sortOption: SortOption) => void;
}

const SearchBarAndSort: React.FC<SearchBarAndSortProps> = ({
  initialSearchQuery,
  initialSortOption,
  onSearch,
  onSortChange,
}) => {
  const [query, setQuery] = useState(initialSearchQuery);
  const [activeSort, setActiveSort] = useState<SortOption>(initialSortOption);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleSortClick = (option: SortOption) => {
    setActiveSort(option);
    onSortChange(option);
  };

  return (
    <div className="search-bar-sort-wrapper mb-4">
      {/* <Form onSubmit={handleSearchSubmit} className="mb-3">
        <InputGroup>
          <Form.Control
            type="search"
            placeholder="Search by keywords (e.g., Lekki semi-detached)"
            aria-label="Search properties"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="primary" type="submit" aria-label="Submit search">
            <FiSearch />
          </Button>
        </InputGroup>
      </Form> */}

      <Search classNames='landing-main-search rounded-pill my-3' darkButton />

      <div className="sort-options d-flex justify-content-end">
        <ButtonGroup size="sm">
          <Button
            variant={activeSort === 'price_asc' ? 'primary' : 'outline-secondary'}
            onClick={() => handleSortClick('price_asc')}
            className="sort-button"
          >
            {activeSort === 'price_asc' && <FiCheck size={16} className="me-1" />}
                ;
            Price Ascending
          </Button>
          <Button
            variant={activeSort === 'price_desc' ? 'primary' : 'outline-secondary'}
            onClick={() => handleSortClick('price_desc')}
            className="sort-button"
          >
             {activeSort === 'price_desc' && <FiCheck size={16} className="me-1" />}
            Price Descending
          </Button>
          <Button
            variant={activeSort === 'recommended' ? 'primary' : 'outline-secondary'}
            onClick={() => handleSortClick('recommended')}
            className="sort-button"
          >
            {activeSort === 'recommended' && <FiCheck size={16} className="me-1" />}
            Recommended
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default SearchBarAndSort;