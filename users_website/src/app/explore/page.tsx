// pages/explore.tsx (or wherever your Explore page is)
'use client';

import { useState, useEffect } from 'react';
import httpClient from '@/services/httpClient';

import ExplorePageHero from '@/components/user/explore/ExplorePageHero';
import ExploreMoreCategories from '@/components/user/explore/ExploreMoreCategories';
import { IPaginatedProperties } from '@/types/property';
import useUpdateEffect from '@/hooks/useUpdateEffect';

// Updated fetch function to accept a page number
async function getExploreListings(category: string, value: string, page: number, limit: number): Promise<IPaginatedProperties | null> {
  try {
      // Append the page number as a query parameter
      const url = `/api/v1/pages/explore?category=${category}&value=${value}&page=${page}&limit=${limit}`;
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [category, setCategory] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [showListings, setShowListings] = useState(false);



  useUpdateEffect(() => {
    const fetchListings = async () => {
        try {
            setIsLoading(true);
            const data = await getExploreListings(category, categoryValue, currentPage, limit);
            console.log("currentPage:", currentPage);
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
  }, [currentPage, limit, category, categoryValue]);



  // Callback function for react-paginate
  const handlePageChange = (selectedItem: { selected: number }) => {
    // react-paginate is 0-indexed, our API is likely 1-indexed
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    window.scrollTo(0, 559);
  };

  const handleExplore = (category: string, value: string, page: number, limit: number) => {
    setCategory(category);
    setCategoryValue(value);
    setCurrentPage(page);
    setLimit(limit);
    setShowListings(true);
  }



  return (
    <main>
      <ExplorePageHero handleExplore={handleExplore}/>
      <ExploreMoreCategories
        listings={paginatedProperties}
        isLoading={isLoading}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        setListings={setPaginatedProperties}
        showListings={showListings}
        setShowListings={setShowListings}
        handleExplore={handleExplore}
      />
    </main>
  );
}

export default Explore;