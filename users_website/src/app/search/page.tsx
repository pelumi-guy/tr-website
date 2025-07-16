'use client'


import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import FiltersSidebar, { Filters } from '../../components/user/search/FiltersSidebar';
import SearchBarAndSort, { SortOption } from '../../components/user/search/SearchBarAndSort';
import PropertyResultsGrid from '../../components/user/search/PropertyResultsGrid';
import PropertyCard, { Property } from '../../components/user/fragments/PropertyCard';
// import Layout from '../components/Layout'; // If you have a main site Layout

// --- Mock API call ---
const fetchPropertiesAPI = async (
    query: string,
    filters: Filters,
    sort: SortOption,
    page: number = 1
): Promise<{ properties: Property[], totalPages: number }> => {
    console.log('Fetching properties with:', { query, filters, sort, page });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data - replace with actual API call
    const allProperties: Property[] = [
        // ... (Populate with 10-20 sample Property objects)
        { propertyId: 1, imageUrl: '/images/PropertyImagePlaceholder.png', title: 'Luxury Villa in Lekki Phase 1', price: 250_000_000, location: 'Lekki', beds: 5, baths: 5, lounges: 2,  isBookmarked: false },
        { propertyId: 2, imageUrl: '/images/PropertyImagePlaceholder2.png', title: 'Modern Duplex in Ajah', price: 180_000_000, location: 'Ajah', beds: 4, baths: 4, lounges: 1, isBookmarked: true },
        { propertyId: 3, imageUrl: '/images/PropertyImagePlaceholder.png', title: 'Serviced Apartment in Ikoyi', price: 300_000_000, location: 'Ikoyi', beds: 3, baths: 3, lounges: 1,  isBookmarked: false },
        { propertyId: 4, imageUrl: '/images/PropertyImagePlaceholder.png', title: 'Spacious Semi-Detached, Lekki', price: 200_000_000, location: 'Lekki', beds: 4, baths: 3, lounges: 2,  isBookmarked: false },
        { propertyId: 5, imageUrl: '/images/PropertyImagePlaceholder2.png', title: 'Cozy Bungalow, Ajah Outskirts', price: 90_000_000, location: 'Ajah', beds: 3, baths: 2, lounges: 1, isBookmarked: true },
        { propertyId: 6, imageUrl: '/images/PropertyImagePlaceholder.png', title: 'Penthouse with Ocean View, Ikoyi', price: 450_000_000, location: 'Ikoyi', beds: 4, baths: 5, lounges: 2,  isBookmarked: false },
    ];

    // Simple filtering logic (replace with backend logic)
    let filtered = allProperties;
    if (query) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.location.toLowerCase().includes(query.toLowerCase()));
    }
    if (filters.keywords.length > 0) {
        filtered = filtered.filter(p => filters.keywords.some(kw => p.title.toLowerCase().includes(kw.toLowerCase())));
    }
    if (filters.locations.length > 0) {
        filtered = filtered.filter(p => filters.locations.includes(p.location));
    }
    filtered = filtered.filter(p => p.price <= filters.maxPrice);

    // Simple sorting (replace with backend logic)
    //   if (sort === 'price_asc') {
    //     filtered.sort((a, b) => parseInt(a.price.replace(/,/g, ''), 10) - parseInt(b.price.replace(/,/g, ''), 10));
    //   } else if (sort === 'price_desc') {
    //     filtered.sort((a, b) => parseInt(b.price.replace(/,/g, ''), 10) - parseInt(a.price.replace(/,/g, ''), 10));
    //   }

    // Simple sorting (replace with backend logic)
    if (sort === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    // Simple pagination
    const itemsPerPage = 6;
    const paginatedProperties = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return { properties: paginatedProperties, totalPages: Math.ceil(filtered.length / itemsPerPage) };
};
// --- End Mock API call ---


const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<Filters>({
        keywords: ['Lekki', 'Detached Duplex', '5 Bedroom', 'Modern', 'Services', 'Cozy'], // Initial from Figma
        maxPrice: 250000000, // Initial from Figma
        locations: ['Lekki', 'Ajah', 'Ikoyi'], // Initial from Figma
    });
    const [sortOption, setSortOption] = useState<SortOption>('price_asc'); // Initial from Figma
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);

    const availableLocations = ['Lekki', 'Ajah', 'Ikoyi', 'Victoria Island', 'Ikeja']; // Example

    const loadProperties = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fetchPropertiesAPI(searchQuery, filters, sortOption /*, currentPage */);
            setProperties(result.properties);
            // setTotalPages(result.totalPages);
        } catch (error) {
            console.error("Failed to fetch properties:", error);
            setProperties([]); // Clear properties on error
        } finally {
            setLoading(false);
        }
    }, [searchQuery, filters, sortOption /*, currentPage */]);

    useEffect(() => {
        loadProperties();
    }, [loadProperties]); // Reload when loadProperties changes (i.e., its dependencies change)

    const handleFilterChange = (newFilters: Filters) => {
        // setCurrentPage(1); // Reset to first page on filter change
        setFilters(newFilters);
    };

    const handleSearch = (query: string) => {
        // setCurrentPage(1);
        setSearchQuery(query);
    };

    const handleSortChange = (newSortOption: SortOption) => {
        // setCurrentPage(1);
        setSortOption(newSortOption);
    };

    return (
        // TO DO:  handled metadat with the `generateMetadata` like in ProductDetailPage
        <> {/* Or <Layout> */}
            <Head>
                <title>Search Properties | TR Realty</title>
                <meta name="description" content="Find your dream property with our advanced search." />
            </Head>

            <main className="search-page-container py-4 py-md-5">
                <div className="container-fluid px-md-4 px-lg-5"> {/* Use container-fluid for better control over side padding */}
                    <div className="row">
                        {/* Filters Sidebar Column */}
                        <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
                            <FiltersSidebar
                                initialFilters={filters}
                                availableLocations={availableLocations}
                                onFilterChange={handleFilterChange}
                            />
                        </div>

                        {/* Main Content Column (Search Bar, Sort, Results) */}
                        <div className="col-lg-9 col-md-8">
                            <SearchBarAndSort
                                initialSearchQuery={searchQuery}
                                initialSortOption={sortOption}
                                onSearch={handleSearch}
                                onSortChange={handleSortChange}
                            />
                            <PropertyResultsGrid properties={properties} loading={loading} />
                            {/* Add PaginationControls here if implemented */}
                            {/* {totalPages > 1 && !loading && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )} */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default SearchPage;