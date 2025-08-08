'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Only need useRouter for this component

const Search = ({ classNames, headerSearch = false, darkButton = true }: SearchProps) => {
    const router = useRouter();
    // The target page for the search results
    const targetPathname = '/search';

    const [keyword, setKeyword] = useState('');

    // 1. Accept the form event object as a parameter
    const searchHandler = (event: React.FormEvent<HTMLFormElement>) => {
        // 2. Prevent the default browser form submission (the full page reload)
        event.preventDefault();

        console.log("Submitting search for:", keyword);

        // Trim the keyword to avoid searching for just whitespace
        const trimmedKeyword = keyword.trim();

        if (trimmedKeyword) {
            // Use a standard query parameter name like 'q' or 'query'
            const newUrl = `${targetPathname}?search=${encodeURIComponent(trimmedKeyword)}`;

            // This will now work correctly
            router.replace(newUrl);
        } else {
            // Optional: If the user submits an empty form, you might just want to go to the search page
            // or do nothing. Going to the search page is a good user experience.
            router.push(targetPathname);
        }
    };

    return (
        // The onSubmit handler is attached here
        <form onSubmit={searchHandler}>
            <div className={`input-group ${classNames}`}>
                <input
                    type="text"
                    // The 'name' attribute is no longer strictly needed since we're handling state with React
                    // but it's good for accessibility and form semantics.
                    name="search_query"
                    className={`form-control search-field ${darkButton ? 'text-black' : 'text-white'}`}
                    placeholder="Search properties, locations..."
                    value={keyword} // Control the input value with state
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append py-0">
                    {/*
                      It's good practice to set type="submit" on the button
                      that is meant to submit the form.
                    */}
                    <button type="submit" className={`btn search-btn ${darkButton ? 'text-black' : 'text-white'}`}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    );
}

interface SearchProps {
    classNames?: string; // Made optional for easier use
    headerSearch?: boolean;
    darkButton?: boolean; // Also made optional
}

export default Search;