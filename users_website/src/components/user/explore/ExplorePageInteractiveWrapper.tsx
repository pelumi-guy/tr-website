'use client';

import { IPaginatedProperties } from '@/types/property';
import { useState, useEffect } from 'react';
import httpClient from '@/services/httpClient';

async function getExploreListings(): Promise<IPaginatedProperties | null> {
    try {
        const url = "/api/v1/pages/explore";
        const response = await httpClient.get(url);

        if (response.data && response.data.status === "success") {
            return response.data.data as IPaginatedProperties;
        } else {
            console.warn(`API responded with success=false for explore — paginated properties`);
            return null;
        }
    } catch (error) {
        // Axios provides better error objects
        console.error(`Exception while fetching '/api/v1/pages/explore' with Axios.`, error);
        return null;
    }
}

export default function MyInteractiveWrapper({ children }: { children: React.ReactNode }) {
    const [paginatedProperties, setPropertyCount] = useState<IPaginatedProperties | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                setIsLoading(true);
                // The only change here is that we are confident getListingsCount is using Axios.
                const data = await getExploreListings();
                if (data) {
                    setPropertyCount(data);
                } else {
                    setError("Failed to load listing.");
                }
            } catch (err) {
                setError("An error occurred while fetching data.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchListings();
    }, []);


    return (
        <div className="wrapper">

            {/*
        React renders the 'children' prop here.
        This 'children' prop contains the pre-rendered HTML from the Server Component.
        The client doesn't know or care about the source code of MyServerDataDisplay.
      */}
            {children}
        </div>
    );
}