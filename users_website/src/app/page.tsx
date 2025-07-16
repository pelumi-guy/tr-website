'use client'

import { useEffect, useState } from 'react';
import httpClient from '@/services/httpClient';
import { Property } from '@/types/common';

import Image from "next/image";
import styles from "./page.module.css";
import SearchForYourDreamHome from "@/components/user/landing/SearchForYourDreamHome";
import PropertiesOfTheWeek from "@/components/user/landing/PropertiesOfTheWeek";
import HotRightNow from "@/components/user/landing/HotRightNow";
import FAQ from "@/components/user/landing/FAQ";
import PropertyShowcaseCarousel from "@/components/user/landing/PropertyShowcaseCarousel";
import { IProperty } from '@/types/property';

export default function Home() {
  const [propertiesOfTheWeek, setPopertiesOfTheWeek] = useState(Array<IProperty>);
  const [hotProperties, setHotProperties] = useState(Array<IProperty>);

  useEffect(() => {
    const fetchProperties = async () => {
      const url = "/api/v1/pages/homepage";
      const response = await httpClient.get(url);

      console.log("response:", response)

      if (response.data.success) {
        setPopertiesOfTheWeek(response.data.data.propertiesOfTheWeek);
        setHotProperties(response.data.data.hotProperties);
      }
    };

    const props = fetchProperties();
    console.log("properties:", props);
  }, []);

  return (
    <main>
      <PropertyShowcaseCarousel />
      <div className="container-fluid px-5 px-md-6">
        <SearchForYourDreamHome />
        <PropertiesOfTheWeek properties={propertiesOfTheWeek} />
        <HotRightNow properties={hotProperties} />
        <FAQ />
      </div>

    </main>
  );
}