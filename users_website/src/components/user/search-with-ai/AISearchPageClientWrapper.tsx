// components/user/search/SearchPageClientWrapper.tsx
'use client'

import React, { useState, useEffect, useCallback, Children } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import PropertyResultsGrid from '../search/PropertyResultsGrid';
import { IPagination, IProperty } from '@/types/property';
import httpClient from '@/services/httpClient';
import { IPaginatedProperties } from '@/types/property';
import Search from '../layout/Search';
import ReactPaginate from 'react-paginate';
import styles from '../../../app/page.module.css';

// Props for our client wrapper
interface AISearchPageClientWrapperProps {
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
    const url = `/api/v1/properties/ai-search?${queryString}&page=${page}&limit=${limit}`;

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

const AISearchPageClientWrapper: React.FC<AISearchPageClientWrapperProps> = ({
  initialProperties,
  initialPagination,
  searchParams: initialSearchParams
}) => {
  const router = useRouter();
  const pathname = usePathname();
  // --- STATE MANAGEMENT ---
  const [properties, setProperties] = useState<IProperty[]>(initialProperties);
  const [pagination, SetPagination] = useState<IPagination | null>(initialPagination);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);


  // This is the general text search from the search bar
  const [searchQuery, setSearchQuery] = useState((initialSearchParams.search as string) || '');


  // --- REFACTORED URL UPDATE & DATA FETCHING LOGIC ---
  useEffect(() => {
    setSearchQuery(prev => {
      return initialSearchParams.search ? (initialSearchParams.search as string) : prev
    });
    // Create a new URLSearchParams object. This class handles encoding automatically.
    const params = new URLSearchParams();

    params.set('search', searchQuery);

    // --- URL and Fetching Logic ---
    const queryString = params.toString();
    const newUrl = `${pathname}?${queryString}`;

    // Use `replace` instead of `push` to prevent the browser history from getting cluttered with every filter change.
    router.replace(newUrl, { scroll: false });

    const fetchData = async () => {
      setLoading(true);
      const result = await fetchClientSideProperties(queryString, currentPage);
      console.log('AI search result:', result);
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
  }, [searchQuery, router, pathname, currentPage, initialSearchParams.search]);

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
  const handleSearch = (query: string) => setSearchQuery(query);


  const handlePageChange = (selectedItem: { selected: number }) => {
    // react-paginate is 0-indexed, our API is likely 1-indexed
    const newPage = selectedItem.selected + 1;
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="row">

      <hgroup className="section-heading">
        <h2>Describe Your Dream Home, Let AI Find It</h2>
        <p>Use our intelligent search to find your dream property by describing the features that matter most to you.</p>
      </hgroup>

      <Search classNames='landing-main-search rounded-pill mt-4' darkButton aiSearch />
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
  );
};

export default AISearchPageClientWrapper;