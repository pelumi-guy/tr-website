// components/Search.tsx
'use client'

import React, { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { HiOutlineSparkles } from "react-icons/hi";

const Search = ({ classNames, headerSearch = false, darkButton = true, aiSearch = false }: SearchProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const initialKeyword = searchParams.get('search') || '';


    const [keyword, setKeyword] = useState(initialKeyword);
    const [aiPrompt, setAiPrompt] = useState(initialKeyword);
    const [isLoading, setIsLoading] = useState(false);

    // This state will help us control when the aurora is visible
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const queryFromUrl = searchParams.get('search') || '';

        console.log('pathname:', pathName);
        if (queryFromUrl != keyword || queryFromUrl != aiPrompt) {
            if (pathName.includes('search-with-ai')) setAiPrompt(queryFromUrl);
            else setKeyword(queryFromUrl);
        }
    }, [searchParams]);

    const searchHandler = async (event: FormEvent<HTMLFormElement>) => {
        const targetPathname = aiSearch ? '/search-with-ai' : '/search';
        const searchQuery = aiSearch ? aiPrompt : keyword;

        event.preventDefault();
        const trimmedSearchQuery = searchQuery.trim();

        if (!trimmedSearchQuery || isLoading) return;

        setIsLoading(true);


        if (trimmedSearchQuery) {
            const newUrl = `${targetPathname}?search=${encodeURIComponent(trimmedSearchQuery)}`;
            router.replace(newUrl);
        } else {
            router.push(targetPathname);
        }

        setIsLoading(false);

    };

    return (
        <form onSubmit={searchHandler}>
            <div className={`input-group search-wrapper ${classNames}`}>
                {/* --- This is the new structure for the input field --- */}
                <div className="aurora-input-wrapper">
                    <input
                        type="text"
                        name="search_query"
                        className={`form-control search-field ${darkButton ? 'text-black' : 'text-white'}`}
                        placeholder={`${aiSearch ? 'e.g., "a modern 4-bedroom semi-detached duplex in Lekki with a swimming pool"' : 'Search properties, locations...'}`}
                        value={aiSearch ? aiPrompt : keyword}
                        onChange={(e) => aiSearch ? setAiPrompt(e.target.value) : setKeyword(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        disabled={isLoading}
                    />
                    {/* The Aurora effect is placed inside the wrapper, behind the input */}
                    {aiSearch &&
                        (<div className="aurora">
                            <div className="aurora__item"></div>
                            <div className="aurora__item"></div>
                            <div className="aurora__item"></div>
                            <div className="aurora__item"></div>
                        </div>)}

                    {/* Optional: Add a subtle loading indicator */}
                    {isLoading && <div className="spinner-border text-primary loading-spinner" role="status"></div>}
                </div>

                <div className="input-group-append py-0">
                    <button type="submit" className={`btn search-btn ${darkButton ? 'text-black' : 'text-white'}`} disabled={isLoading}>
                        {/* Search Icon */}
                        {aiSearch ? (<HiOutlineSparkles className='text-black' size={20} />) :
                        (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>)}
                    </button>
                </div>
            </div>
        </form>
    );
}

interface SearchProps {
    classNames?: string;
    headerSearch?: boolean;
    darkButton?: boolean;
    aiSearch?: boolean;
}

export default Search;