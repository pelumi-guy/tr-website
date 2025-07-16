/* eslint-disable @typescript-eslint/no-require-imports */
'use client';
import { ReactNode, useEffect } from 'react';
import 'aos/dist/aos.css';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'animate.css';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css'
import '../app/globals.css';

export default function AOSAnimation({ children }: { children: ReactNode }) {
  // AOS animation
  const AOS = require('aos');

  useEffect(() => {
    AOS.init();
  }, [AOS]);

  return <div> {children} </div>;
}
