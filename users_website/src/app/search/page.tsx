'use client'


import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import FiltersSidebar, { Filters } from '../../components/user/search/FiltersSidebar';
import SearchBarAndSort, { SortOption } from '../../components/user/search/SearchBarAndSort';
import PropertyResultsGrid from '../../components/user/search/PropertyResultsGrid';
import PropertyCard from '../../components/user/fragments/PropertyCard';
import { Property } from '@/types/common';
import { IProperty } from '@/types/property';
// import Layout from '../components/Layout'; // If you have a main site Layout

// --- Mock API call ---
const fetchPropertiesAPI = async (
    query: string,
    filters: Filters,
    sort: SortOption,
    page: number = 1
): Promise<{ properties: IProperty[], totalPages: number }> => {
    console.log('Fetching properties with:', { query, filters, sort, page });
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data - replace with actual API call
    const allProperties: Array<IProperty> = [{
        _id: "1",
        title: 'Luxury 5-Bedroom Detached Duplex in Lekki',
        description: 'A stunning and spacious duplex with modern amenities, a swimming pool, and a BQ. Perfect for a family looking for comfort and class.',
        listingType: 'For Sale',
        propertyType: 'House',
        propertySubtype: 'Detached Duplex',
        location: { street: '123 Admiralty Way', city: 'Lekki', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 350000000, currency: 'NGN' },
        details: { bedrooms: 5, bathrooms: 5, toilets: 6, parkingSpaces: 4, livingrooms: 5 },
        area: { total: 650, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
        isFeatured: true,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    },
    {
        _id: "2",
        title: 'Modern 3-Bedroom Apartment for Rent in Ikoyi',
        description: 'Well-finished 3-bedroom apartment in a secure and serene serviced estate. Comes with 24/7 power and security.',
        listingType: 'For Rent',
        propertyType: 'Apartment',
        propertySubtype: 'Flat',
        location: { street: '456 Orchid Road', city: 'Lekki', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 15000000, currency: 'NGN' },
        details: { bedrooms: 3, bathrooms: 3, toilets: 4, parkingSpaces: 2, livingrooms: 3 },
        area: { total: 220, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
        isFeatured: true,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    },
    {
        _id: "3",
        title: 'Commercial Land on a Major Road in Ikeja',
        description: 'A prime plot of land measuring 1200 sqm, suitable for commercial development. Fenced and gated with a good title.',
        listingType: 'For Sale',
        propertyType: 'Land',
        location: { street: '789 Lekki County', city: 'Ajah', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 500000000, currency: 'NGN' },
        details: { bedrooms: 3, bathrooms: 3, toilets: 4, parkingSpaces: 2, livingrooms: 3 },
        area: { total: 1200, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570979/Transcendent_Realty/Sample_Images/SemiDetachedPlaceholder_cxff1j.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570979/Transcendent_Realty/Sample_Images/SemiDetachedPlaceholder_cxff1j.png'],
        isFeatured: false,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    },
    {
        _id: "4",
        title: 'Luxury 6-Bedroom Detached Triplex in Ajah',
        description: 'A stunning and spacious duplex with modern amenities, a swimming pool, and a BQ. Perfect for a family looking for comfort and class.',
        listingType: 'For Sale',
        propertyType: 'House',
        propertySubtype: 'Detached Triplex',
        location: { street: 'Lekki County', city: 'Ajah', state: 'Lagos', country: 'Nigeria' },
        price: { amount: 400000000, currency: 'NGN' },
        details: { bedrooms: 6, bathrooms: 4, toilets: 7, parkingSpaces: 4, livingrooms: 6 },
        area: { total: 750, unit: 'sqm' },
        photos: ['https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png', 'https://res.cloudinary.com/do5lofza7/image/upload/v1751570981/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder2_jn6xcq.png'],
        isFeatured: true,
        status: 'Available',
        amenities: ['elevator', 'gym'],
        // creator: "01",
        // agency: "01",
        createdAt: "01-01-1970",
        updatedAt: "01-01-1970",
        creator: undefined,
        agency: undefined
    }
];

    // Simple filtering logic (replace with backend logic)
    let filtered = allProperties;
    if (query) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.location.city?.toLowerCase().includes(query.toLowerCase()));
    }
    if (filters.keywords.length > 0) {
        filtered = filtered.filter(p => filters.keywords.some(kw => p.title.toLowerCase().includes(kw.toLowerCase())));
    }
    if (filters.locations.length > 0) {
        filtered = filtered.filter(p => filters.locations.includes(p.location.city));
    }
    filtered = filtered.filter(p => p.price.amount <= filters.maxPrice);

    // Simple sorting (replace with backend logic)
    //   if (sort === 'price_asc') {
    //     filtered.sort((a, b) => parseInt(a.price.replace(/,/g, ''), 10) - parseInt(b.price.replace(/,/g, ''), 10));
    //   } else if (sort === 'price_desc') {
    //     filtered.sort((a, b) => parseInt(b.price.replace(/,/g, ''), 10) - parseInt(a.price.replace(/,/g, ''), 10));
    //   }

    // Simple sorting (replace with backend logic)
    if (sort === 'price_asc') {
        filtered.sort((a, b) => a.price.amount - b.price.amount);
    } else if (sort === 'price_desc') {
        filtered.sort((a, b) => b.price.amount - a.price.amount);
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
    const [properties, setProperties] = useState<IProperty[]>([]);
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