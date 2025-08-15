// src/app/page.tsx (or your landing page route)

import { IProperty } from '@/types/property'; // Assuming your type definition path

// Import your components as before
import SearchForYourDreamHome from "@/components/user/landing/SearchForYourDreamHome";
import PropertiesOfTheWeek from "@/components/user/landing/PropertiesOfTheWeek";
import HotRightNow from "@/components/user/landing/HotRightNow";
import FAQ from "@/components/user/landing/FAQ";
import PropertyShowcaseCarousel from "@/components/user/landing/PropertyShowcaseCarousel";
import HeroSection from '@/components/user/landing/HeroSection';

async function getHomepageData() {
  try {
    // Construct the full URL to your API endpoint.
    // Use an environment variable for your backend URL for flexibility.
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/v1/pages/homepage`;

    // Use the native fetch API. We can add options like caching.
    // `next: { revalidate: 3600 }` tells Next.js to cache this result for 1 hour (3600 seconds).
    // This is great for a homepage that doesn't change every second.
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });

    // It's good practice to check if the response was successful.
    if (!res.ok) {
      // This will be caught by the nearest error.js file.
      throw new Error(`Failed to fetch homepage data: ${res.statusText}`);
    }

    const data = await res.json();

    // Assuming your API returns { success: true, data: { propertiesOfTheWeek: [], hotProperties: [] } }
    if (data.success) {
      return data.data; // Return the nested data object
    } else {
      // Handle the case where the API call was successful (200 OK) but the operation failed.
      console.warn('API indicated a failure:', data.message);
      return { propertiesOfTheWeek: [], hotProperties: [] }; // Return empty arrays
    }
  } catch (error) {
    // Handle network errors or other fetch-related issues.
    console.error("Error in getHomepageData:", error);
    // In case of an error, we return a default empty state to prevent the page from crashing.
    return {
      propertiesOfTheWeek: [],
      hotProperties: [],
    };
  }
}

// --- Step 2: Convert the Main Component to an Async Function ---
export default async function Home() {
  // 1. Fetch the data directly on the server. The component will "wait" here until the data is ready.
  // The result is destructured directly from the function call.
  const { propertiesOfTheWeek, hotProperties } = await getHomepageData();

  // 2. No more `useState` or `useEffect`. The data is available immediately for rendering.
  return (
    <main>
      {/* <PropertyShowcaseCarousel /> */}
      <HeroSection />
      <div className="container-fluid px-5 px-md-6">
        <SearchForYourDreamHome />
        {/* 3. Pass the server-fetched data down as props to the child components. */}
        {/* These child components can remain Client Components if they need interactivity. */}
        <PropertiesOfTheWeek properties={propertiesOfTheWeek} />
        <HotRightNow properties={hotProperties} />
        <FAQ />
      </div>
    </main>
  );
}