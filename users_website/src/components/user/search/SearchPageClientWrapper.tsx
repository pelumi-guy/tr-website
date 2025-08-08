// components/user/search/SearchPageClientWrapper.tsx
'use client'

import React, { useState, useEffect, useCallback, Children } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'; // <-- The new App Router hooks
import FiltersSidebar, { Filters } from './FiltersSidebar';
import SearchBarAndSort, { SortOption } from './SearchBarAndSort';
import PropertyResultsGrid from './PropertyResultsGrid';
import { IPagination, IProperty } from '@/types/property';
import httpClient from '@/services/httpClient';
import { IPaginatedProperties } from '@/types/property';
import ReactPaginate from 'react-paginate';

// Props for our client wrapper
interface SearchPageClientWrapperProps {
  initialProperties: IProperty[];
  initialPagination: IPagination | null;
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode
}

// This function will now be used for CLIENT-SIDE fetching
const fetchClientSideProperties = async (
  queryString: string,
  page: number,
  limit: number = 12
): Promise<IPaginatedProperties> => {
  try {
    const url = `/api/v1/properties/search?${queryString}&page=${page}&limit=${limit}`;

    const response = await httpClient.get(url);
    if (response.data?.status === 'success') {
      return response.data.data;
    }
    return { properties: [] };
  } catch (error) {
    console.error("Client-side fetch failed:", error);
    return { properties: [] };
  }
};

const SearchPageClientWrapper: React.FC<SearchPageClientWrapperProps> = ({
  initialProperties,
  initialPagination,
  searchParams: initialSearchParams,
  children
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // --- STATE MANAGEMENT ---
  const [properties, setProperties] = useState<IProperty[]>(initialProperties);
  const [pagination, SetPagination] = useState<IPagination | null>(initialPagination);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  // Initialize state from the server-passed searchParams
  // Let's align the state names more closely with the API expectations
  const [filters, setFilters] = useState<Filters>({
    keywords: (initialSearchParams.search as string)?.split(',') || [],
    maxPrice: Number(initialSearchParams['price[lte]']) || 1500000000,
    // Note: locations can be part of the keywords or a separate filter
    // For simplicity, let's treat selected locations as keywords for now.
    locations: [],
  });

  // This is the general text search from the search bar
  const [searchQuery, setSearchQuery] = useState((initialSearchParams.search as string) || '');

  // Sorting state
  const [sortOption, setSortOption] = useState<SortOption>((initialSearchParams.sort as SortOption) || 'recommended');

  const availableLocations = ['Lekki', 'Ajah', 'Ikoyi', 'Victoria Island', 'Ikeja'];

  // --- REFACTORED URL UPDATE & DATA FETCHING LOGIC ---
  useEffect(() => {
    setSearchQuery(prev => {
      return initialSearchParams.search ? (initialSearchParams.search as string) : prev
    });
    // Create a new URLSearchParams object. This class handles encoding automatically.
    const params = new URLSearchParams();

    // 1. Handle `keywords` from the search bar and filter sidebar
    // We combine the general search query with the specific keyword tags from the filter
    const allKeywords = [
      // ...filters.keywords,
      // Add the main search query if it's not already in the keywords array
      // ...(searchQuery.trim() && !filters.keywords.includes(searchQuery.trim()) ? [searchQuery.trim()] : [])

      ...(searchQuery.trim() ? [searchQuery.trim()] : [])
    ];

    // setFilters(prev => ({
    //   ...prev,
    //   keywords: allKeywords
    // }));

    if (allKeywords.length > 0) {
      // Your backend expects a single comma-separated string for 'keywords'
      params.set('search', allKeywords.join(','));
    }

    // 2. Handle advanced filtering for `price`
    // Your backend expects a format like: price[lte]=500000000
    if (filters.maxPrice) {
      params.set('price[amount][lte]', filters.maxPrice.toString());
    }

    // 3. Handle `sort`
    // Your backend expects formats like 'price' (ascending) or '-price' (descending)
    let apiSortValue = '';
    if (sortOption === 'price_asc') {
      apiSortValue = 'price.amount'; // Sort by the amount field inside price
    } else if (sortOption === 'price_desc') {
      apiSortValue = '-price.amount'; // Prepend '-' for descending
    } else if (sortOption === 'recommended') {
      // 'recommended' might map to a different sort field like '-createdAt' or a special field
      apiSortValue = '-createdAt';
    }

    if (apiSortValue) {
      params.set('sort', apiSortValue);
    }

    // Add other filters like page number if you have pagination
    // if (currentPage) params.set('page', currentPage.toString());

    // --- URL and Fetching Logic ---
    const queryString = params.toString();
    const newUrl = `${pathname}?${queryString}`;

    // Use `replace` instead of `push` to prevent the browser history from getting cluttered with every filter change.
    router.replace(newUrl, { scroll: false });

    const fetchData = async () => {
      setLoading(true);
      const result = await fetchClientSideProperties(queryString, currentPage);
      console.log("properties result:", result);
      setProperties(result.properties);
      SetPagination(result.pagination ?? null)
      setLoading(false);
    };

    const handler = setTimeout(() => {
      fetchData();
    }, 500);

    return () => {
      clearTimeout(handler);
    };

  }, [searchQuery, sortOption, router, pathname, currentPage, filters, initialSearchParams.search]);

  // useUpdateEffect(() => {
  //   setSearchQuery(prev => {
  //     return initialSearchParams.search ? (initialSearchParams.search as string) : prev
  //   });

  //   setFilters(prev => {
  //     return {
  //       ...prev,
  //       keywords: []
  //     }
  //   })
  // }, [filters, searchQuery, sortOption, router, pathname])

  // --- Handler functions ---
  const handleFilterChange = (newFilters: Filters) => setFilters(newFilters);
  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSortChange = (newSortOption: SortOption) => setSortOption(newSortOption);

  const handlePageChange = (selectedItem: { selected: number }) => {
    // react-paginate is 0-indexed, our API is likely 1-indexed
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
        <FiltersSidebar
          initialFilters={filters}
          availableLocations={availableLocations}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="col-lg-9 col-md-8">
        <SearchBarAndSort
          initialSearchQuery={searchQuery}
          initialSortOption={sortOption}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
        />
        {/* {children } */}
        <PropertyResultsGrid properties={properties} loading={loading} />

      {/* --- ReactPaginate Component --- */}
      {pagination && pagination?.total > 1 && (
            <ReactPaginate
              previousLabel={'< Prev'}
              nextLabel={'Next >'}
              breakLabel={'...'}
              pageCount={pagination?.totalPages}
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
      </div>
    </div>
  );
};

export default SearchPageClientWrapper;