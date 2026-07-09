import React from 'react';
import ImageSlider from './ImageSlider';
import Homeslider from './Homeslider';

/**
 * HeroSliderSection
 * Combines the full-width image banner slider at the top
 * with the SaaS-split-layout course highlights slider below.
 */
const HeroSliderSection = () => (
  <>
    {/* Full-width image banner */}
    <div className="w-full relative">
      <ImageSlider />
    </div>

    {/* Split-layout hero with auto course slider */}
    <div className="w-full bg-alternate-white border-b border-gray-100 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <Homeslider />
      </div>
    </div>
  </>
);

export default HeroSliderSection;
