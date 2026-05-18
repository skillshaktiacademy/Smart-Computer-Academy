import React, { useState, useEffect } from 'react';

const Homeslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200",
      title: "Web Development",
      description: "Become a full-stack web developer by learning HTML, CSS, JavaScript, React, Node.js, and more with live projects."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200",
      title: "Tally with GST",
      description: "Master Tally ERP 9 / Tally Prime with GST for effective accounting, taxation, and business inventory."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      title: "SEO (Search Engine Optimization)",
      description: "Learn the art of optimizing websites for search engines to increase visibility, organic search traffic, and ranking."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=1200",
      title: "Video Editing",
      description: "Learn the fundamentals of professional video editing using industry-standard software like Premiere Pro and After Effects."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
      title: "ADCA (Advanced Diploma in Computer Application)",
      description: "Gain complete computer knowledge with practical training in MS Office, Internet, Tally, and essential IT tools."
    }
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl mb-8 group">
      {/* Images with Ken Burns effect transition */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transform transition-transform duration-10000 ${
                index === currentSlide ? 'scale-105' : 'scale-100'
              }`}
              loading="lazy"
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-end z-20">
              <div className="p-6 md:p-12 text-white max-w-3xl">
                <span className="inline-block px-3 py-1 bg-red-600 text-xs font-bold uppercase tracking-wider rounded mb-3">
                  Smart Computer Academy
                </span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 leading-tight drop-shadow-md">
                  {slide.title}
                </h3>
                <p className="text-sm md:text-lg text-gray-200 font-medium drop-shadow-sm max-w-xl leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-red-600/80 text-white p-3 rounded-full transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 blur-backdrop"
        aria-label="Previous Slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-red-600/80 text-white p-3 rounded-full transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 blur-backdrop"
        aria-label="Next Slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Pagination */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-red-600 w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Homeslider;
