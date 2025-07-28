'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ReactTyped } from "react-typed";
import httpClient from '@/services/httpClient';

import { icons, images } from '@/exports/images';
import { IPropertiesCount, IProperty } from '@/types/property';


interface IExplorePageHeroProps {
  handleExplore: (category: string, value: string, page: number, limit: number) => void;
}

// Sample data for location cards - pass as props or fetch
const locationTeasers = [
  { id: 1, title: 'Ajah', description: 'Explore Ajah...' },
  { id: 2, title: 'Lekki', description: 'Explore Lekki...' },
  { id: 3, title: 'Ikoyi', description: 'Explore Ikoyi...' },
  { id: 3, title: 'Victoria Island', description: 'Explore Victoria Island...' },
  { id: 3, title: 'Ikeja', description: 'Explore Ikeja...' }
];

const headerLocations = [
  'CHEVRON',
  'ORDHID ROAD',
  'LEKKI COUNTY',
  'MAGODO',
  'OPEBI'
];

async function getListingsCount(): Promise<IPropertiesCount | null> {
  try {
    const url = "/api/v1/properties/count"; // Use the relative URL, Axios will use the baseURL you configured
    const response = await httpClient.get(url);
    console.log("response:", response);

    if (response.data && response.data.status === "success") {
      return response.data.data as IPropertiesCount;
    } else {
      console.warn(`API responded with success=false for listings count.`);
      return null;
    }
  } catch (error) {
    // Axios provides better error objects
    console.error(`Exception during listings fetch with Axios.`, error);
    return null;
  }
}

const ExplorePageHero = ({
  handleExplore
} : IExplorePageHeroProps ) => {
  const backgroundImageUrl = "/images/PropertyImagePlaceholder2.png";
  const subTitlePrefix = "Discover all";
  const listingCount = 99;
  const subTitleSuffix = "listings";
  const locations = locationTeasers;
  const limit = 12;


  const [propertiesCount, setPropertyCount] = useState<IPropertiesCount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setIsLoading(true);
        // The only change here is that we are confident getListingsCount is using Axios.
        const data = await getListingsCount();
        if (data) {
          setPropertyCount(data);
        } else {
          setError("Failed to load listing counts.");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const getListingCount = () : string => {
    if (error || !propertiesCount) {
      return '99+';
    }
    return propertiesCount.count.toString();
  };

  return (

    <section>
      <div
        className="page-hero"
        style={{ '--hero-bg-image': `url(${backgroundImageUrl})` }}
      >
        <div className="hero-overlay"></div>
        <div className="container-fluid h-100 d-flex flex-column"> {/* Use container-fluid for full-width content alignment */}

          {/* Main Hero Content - Takes up remaining space and centers its content */}
          <div className="hero-main-content flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center text-white mt-lg-3" data-aos="slide-up" data-aos-ease="ease-in" data-aos-duration="1000">
            <h1 className="hero-title">
              <strong className="text-slider">
                <ReactTyped
                  strings={headerLocations}
                  typeSpeed={80}
                  backDelay={1100}
                  backSpeed={30}
                  loop
                />
              </strong>
            </h1>
            {/* <h1 className="display-1 fw-bold hero-title">{mainTitle}</h1> */}
            <Link href="#explore-categories"
            onClick={() => handleExplore("status", "available", 1, limit)}
            >
              {isLoading ? (<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>)
                :
                (<div className="hero-subtitle-link d-inline-flex align-items-center mt-0 mt-lg-2">
                  {subTitlePrefix} {getListingCount()} {subTitleSuffix}
                  &nbsp;&nbsp;
                  <Image src={icons.RightUpArrow} alt='right up arrow' className='' />
                </div>)
              }
            </Link>
          </div>
        </div>


        {/* Location Teaser Cards Area */}
        <div className="location-teasers-container pb-4 pt-3 mb-5 mb-lg-0">
          <div className="row justify-content-center justify-content-md-between g-1 g-md-4">
            {locations.map((loc) => (
              <div key={loc.id} className="col-6 col-md-2 location-teaser-card-wrapper my-2 my-md-0">
                <Link href="#explore-categories"
                 onClick={() => handleExplore("location.city", loc.title, 1, limit)}
                >
                  <div className="card location-teaser-card text-decoration-none" data-aos="flip-up" data-aos-ease="ease-in" data-aos-duration="1200">
                    <div className="card-body text-center">
                      <h5 className="card-title fw-semibold">{loc.title}</h5>
                      <p className="card-text small text-muted mb-0">{loc.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExplorePageHero;