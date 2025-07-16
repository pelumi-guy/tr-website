import React from 'react';
import AboutUsIntro from '@/components/user/about-us/AboutUsIntro';
import MissionStatement from '@/components/user/about-us/MissionStatement';
import MeetTheTeam from '@/components/user/about-us/MeetTheTeam';
import StatsAndTestimonials from '@/components/user/about-us/StatsAndTestimonials';

const AboutUs = () => {
  return (
    <main>
        <AboutUsIntro />
        <MissionStatement />
        <MeetTheTeam />
        <StatsAndTestimonials />
    </main>
  )
}

export default AboutUs