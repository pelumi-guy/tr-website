// app/search/page.tsx

import React, { Suspense } from 'react';
import { Metadata } from 'next';
import SearchPageClientWrapper from '@/components/user/search/SearchPageClientWrapper';
import { IPaginatedProperties, IProperty } from '@/types/property';
import PropertyResultsGrid from '@/components/user/search/PropertyResultsGrid';

// This is our server-side data fetching function
async function getInitialSearchResults(
  searchParams: { [key: string]: string | string[] | undefined }
): Promise<IPaginatedProperties> {

  // Construct the query string from server-side searchParams
  const query = new URLSearchParams();

  if (searchParams.search) query.append('search', searchParams.search as string);
  if (searchParams.category) query.append('category', searchParams.category as string);
  if (searchParams.location) query.append('location.city', searchParams.location as string);
  if (searchParams.sort) query.append('sort', searchParams.sort as string);
  if (searchParams.page) query.append('page', searchParams.page as string);
  // Add other params...
  const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  // Example URL to your backend API route that handles searching
  const url = `${apiBaseUrl}/api/v1/properties/search?${query.toString()}`;

  try {
    // Use fetch with caching. For a search page, 'no-store' is appropriate.
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    const data = await res.json();
    if (data?.status !== 'success') throw new Error('API responded with success=false');

    return data.data;
  } catch (error) {
    console.error("Failed to fetch initial search results:", error);
    return { properties: [], pagination: { limit: 10, page: 1, total: 0, totalPages: 0, }}; // Return an empty state on error
  }
}

// Dynamic metadata for SEO
export async function generateMetadata({ searchParams }: { searchParams: { [key: string]: string | undefined } }): Promise<Metadata> {
    const resolvedSearchParams = await searchParams;

  const location = resolvedSearchParams.location || 'Nigeria';
  const category = resolvedSearchParams.category || 'Properties';

  return {
    title: `${category} for Sale in ${location} | Lagos Property Center`,
    description: `Find the best ${category} listings in ${location}. Browse thousands of properties for sale and rent on Lagos Property Center.`,
  };
}

// Optional but recommended: A Skeleton Loader for the fallback
const SearchPageSkeleton = () => {
    return (
      <div className="row">
        <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
          {/* Skeleton for Filters */}
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="placeholder-glow">
                <span className="placeholder col-6"></span>
                <span className="placeholder col-12 mt-2"></span>
                <span className="placeholder col-12 mt-4"></span>
                <span className="placeholder col-12 mt-2"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-8">
          {/* Skeleton for Results */}
          <div className="placeholder-glow">
            <span className="placeholder col-12" style={{ height: '80px' }}></span>
            <div className="row g-4 mt-3">
              <div className="col-12 col-md-6 col-lg-4"><span className="placeholder col-12" style={{ height: '300px' }}></span></div>
              <div className="col-12 col-md-6 col-lg-4"><span className="placeholder col-12" style={{ height: '300px' }}></span></div>
              <div className="col-12 col-md-6 col-lg-4"><span className="placeholder col-12" style={{ height: '300px' }}></span></div>
            </div>
          </div>
        </div>
      </div>
    );
  };


// The main Server Component Page
export default async function SearchPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    const resolvedSearchParams = await searchParams
  // Fetch the initial data on the server
  const initialData = await getInitialSearchResults(resolvedSearchParams);
  // console.log("initial data:", initialData)

  return (
    <main className="search-page-container py-4 py-md-5">
      <div className="container-fluid px-md-4 px-lg-5">
        {/*
          We pass the server-fetched initialData and the initial searchParams
          to our main client component. The <Suspense> is good practice.
        */}
        <Suspense fallback={<SearchPageSkeleton />}>
          <SearchPageClientWrapper
            initialProperties={initialData.properties}
            initialPagination={initialData.pagination ?? null}
            searchParams={searchParams} // Pass initial params for hydration
            >
                <PropertyResultsGrid properties={initialData.properties} loading={false} />
            </SearchPageClientWrapper>
        </Suspense>
      </div>
    </main>
  );
}