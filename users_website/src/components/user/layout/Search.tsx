'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { icons } from '@/exports/images';
import { useNavigate } from 'react-router';
// import SearchIcon from "../../assets/images/homePage/SearchIcon.svg"


const Search = ({ classNames, darkButton = true }: SearchProps) => {
    // const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const searchHandler = () => {
        console.log("Searching...");

        // if (keyword) {
        //     navigate(`/search/${keyword}`);
        // }

    };

    return (
        <form
            onSubmit={searchHandler}
        >
            <div className={`input-group ${classNames}`}>
                <input
                    type="text"
                    // id="search_field"
                    name="search_field"
                    className={`form-control search-field ${darkButton ? 'text-black' : 'text-white'}`}
                    placeholder="Explore Listing"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="input-group-append py-0">
                    <button id="search_btn " className={`btn search-btn ${darkButton ? 'text-black' : 'text-white'}`} >
                        {/* <Image src={icons.SearchIcon} alt="search" style={{ color: "#f5f5f5"}} /> */}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 14L11.1 11.1M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </form>
    )
}

interface SearchProps {
    classNames: string
    darkButton: boolean
}

export default Search