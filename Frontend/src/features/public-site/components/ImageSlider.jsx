import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../../assets/images/slidebar/1.jpg';
import img2 from '../../../assets/images/slidebar/2.jpg';
import img3 from '../../../assets/images/slidebar/3.jpg';
import img4 from '../../../assets/images/slidebar/4.jpg';
import siteContent from '../data/siteContent.json';

// Map image paths from JSON to actual imported assets
const imageMap = {
  '/src/assets/images/slidebar/1.jpg': img1,
  '/src/assets/images/slidebar/2.jpg': img2,
  '/src/assets/images/slidebar/3.jpg': img3,
  '/src/assets/images/slidebar/4.jpg': img4,
};

const ImageSlider = () => {
  const slides = siteContent.sliders.map((slide) => ({
    ...slide,
    src: imageMap[slide.image] || slide.image,
  }));

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-slide every 4 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-900"
      style={{ height: 'clamp(220px, 45vw, 520px)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: idx === current ? 1 : 0, pointerEvents: idx === current ? 'auto' : 'none' }}
        >
          {/* Image */}
          <img
            src={slide.src}
            alt={`Slide ${slide.id}`}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Subtle dark gradient at bottom for link visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

          {/* Link Button — bottom center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <Link
              to={slide.linkUrl}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-white text-white hover:text-red-600 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-all duration-300"
              style={{ whiteSpace: 'nowrap' }}
            >
              {slide.linkLabel}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white transition-all duration-200 backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white transition-all duration-200 backdrop-blur-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: idx === current ? '24px' : '8px',
              height: '8px',
              background: idx === current ? '#dc2626' : 'rgba(255,255,255,0.6)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;