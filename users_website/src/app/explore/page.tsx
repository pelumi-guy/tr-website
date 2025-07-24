// pages/explore.tsx (or wherever your Explore page is)
'use client';

import { useState, useEffect } from 'react';
import httpClient from '@/services/httpClient';

import ExplorePageHero from '@/components/user/explore/ExplorePageHero';
import ExploreMoreCategories from '@/components/user/explore/ExploreMoreCategories';
import { IPaginatedProperties } from '@/types/property';

// Updated fetch function to accept a page number
async function getExploreListings(page: number): Promise<IPaginatedProperties | null> {
  try {
      // Append the page number as a query parameter
      const url = `/api/v1/pages/explore?page=${page}`;
      const response = await httpClient.get(url);

      if (response.data && response.data.status === "success") {
          return response.data.data as IPaginatedProperties;
      } else {
          console.warn(`API responded with success=false for explore page ${page}`);
          return null;
      }
  } catch (error) {
      console.error(`Exception while fetching explore page ${page} with Axios.`, error);
      return null;
  }
}

const Explore = () => {
  const [paginatedProperties, setPaginatedProperties] = useState<IPaginatedProperties | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // <-- State for current page

  useEffect(() => {
    const fetchListings = async () => {
        try {
            setIsLoading(true);
            const data = await getExploreListings(currentPage); // <-- Pass current page
            if (data) {
              setPaginatedProperties(data);
            } else {
                setError("Failed to load listings.");
            }
        } catch (err) {
            setError("An error occurred while fetching data.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    fetchListings();
  }, [currentPage]); // <-- Add currentPage to dependency array to re-fetch on change

  // Callback function for react-paginate
  const handlePageChange = (selectedItem: { selected: number }) => {
    // react-paginate is 0-indexed, our API is likely 1-indexed
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    window.scrollTo(0, 0); // Optional: scroll to top on page change
  };

  return (
    <main>
      <ExplorePageHero />
      <ExploreMoreCategories
        listings={paginatedProperties}
        isLoading={isLoading}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </main>
  );
}

export default Explore;