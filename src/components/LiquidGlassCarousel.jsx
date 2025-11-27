import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ------------------------------------------------------------------
// ClampedDescription Component (Required for CarouselCard)
// ------------------------------------------------------------------

const ClampedDescription = ({ description, maxHeight, setModalState }) => {
  const [showFullText, setShowFullText] = useState(false);

  const openModal = () => {
    setShowFullText(true);
    if (setModalState) setModalState(true); // PAUSE AUTOPLAY
  };

  const closeModal = () => {
    setShowFullText(false);
    if (setModalState) setModalState(false); // RESUME AUTOPLAY
  };

  return (
    <div className="relative mb-5" style={{ minHeight: maxHeight }}>
      {/* Description Text - CLAMPING TO 3 LINES */}
      <p
        className="text-white text-sm text-justify leading-relaxed transition-all duration-300 ease-in-out"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3, 
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description}
      </p>
      
      {/* Read More Button (Stylistic link to open the full modal) */}
      <button
        onClick={openModal}
        className="text-white/30 text-xs font-semibold mt-2 hover:text-white transition-colors duration-200"
      >
        Read More
      </button>

      {/* Full Text Tooltip / Modal (Conditionally Rendered) */}
      {showFullText && (
        <>
          {/* Overlay to dim background and capture clicks */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Full Text Box (Modal) */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-[90%] md:w-full z-50">
            <div className="rounded-xl p-6 bg-gradient-to-br mx-4 
              from-blue-700/70 to-blue-800/70 backdrop-blur-lg 
              shadow-2xl border border-white/30 transition-all duration-500 
              transform scale-100 opacity-100">
              
              <h3 className="text-xl font-bold text-white mb-3">Full Description</h3>
              <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
              <button
                onClick={closeModal}
                className="mt-4 py-2 px-4 rounded-full cursor-pointer text-white/50 text-sm font-medium hover:bg-white/30 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ------------------------------------------------------------------
// CarouselCard Component
// ------------------------------------------------------------------

const CarouselCard = ({ title, description, image, icons, isActive, position, setModalState }) => {
  const opacity = isActive ? 'opacity-100' : 'opacity-60';
  const zIndex = isActive ? 'z-20' : 'z-10';

  return (
    <div
      className={`absolute top-1/2 left-1/2 transition-all duration-700 ease-out ${opacity} ${zIndex}`}
      style={{
        transform: `translate(calc(-50% + ${position * 380}px), -50%) ${
          isActive ? 'scale(1)' : 'scale(0.9)'
        }`,
      }}
    >
      <div 
        className="w-[340px] md:w-[360px] h-[550px] overflow-hidden rounded-3xl p-6 backdrop-blur-xl bg-gradient-to-br from-blue-500/90 to-blue-600/90 shadow-2xl border border-white/20"
      >
        {/* Header with icons */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-left text-white">{title}</h2>
          {icons && icons.length > 0 && (
            <div className="flex gap-2">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={icon.src}
                    alt={icon.alt || `Icon ${index + 1}`}
                    className="w-6 h-6 object-contain"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Container */}
        <div className="rounded-2xl bg-blue-200/50 backdrop-blur-sm mb-5 h-[240px]"> 
          <div className="flex items-center h-full justify-center w-full"> 
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-xl" 
            />
          </div>
        </div>

        {/* Description (Updated) */}
        <ClampedDescription description={description} maxHeight="60px" setModalState={setModalState} />

        {/* Learn More Button */}
        <button className="relative w-full py-3 cursor-pointer rounded-full bg-white/20 backdrop-blur-sm text-white font-medium border border-white/30 overflow-hidden group">
          <span className="relative z-10">Learn More</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
        </button>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// LiquidGlassCarousel Component (WITH SWIPE & DRAG GESTURES)
// ------------------------------------------------------------------

const LiquidGlassCarousel = ({
  slides = [],
  autoPlayInterval = 0, // CHANGED: Default to 0 (disabled)
  showNavigation = true,
  showDots = true,
  carouselTitle = 'Our Expertise',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef(null);

  const N = slides.length;

  const setModalState = (isOpen) => {
    setIsModalOpen(isOpen);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % N);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + N) % N);
  };

  // Auto-play effect (disabled by default)
  useEffect(() => {
    if (autoPlayInterval > 0 && !isModalOpen && !isDragging) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlayInterval, N, isModalOpen, isDragging]);

  // Mouse/Touch event handlers
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    setCurrentX(clientX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const diff = startX - currentX;
    const threshold = 50; // Minimum swipe distance

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) handleEnd();
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  if (!slides || N === 0) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-gray-500">No slides to display</p>
      </div>
    );
  }

  // Helper function to calculate the visual position for seamless looping
  const getPosition = (index) => {
    let diff = index - activeIndex;

    if (diff > N / 2) {
      diff -= N;
    } else if (diff <= -N / 2) {
      diff += N;
    }
    return diff;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 py-8 md:py-12">
      {/* Carousel Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-10 drop-shadow-sm">
        {carouselTitle}
      </h1>

      {/* Carousel Container with Swipe/Drag */}
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl h-[620px] md:h-[700px] flex flex-col items-center justify-center overflow-visible cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Cards */}
        {slides.map((slide, index) => {
          const position = getPosition(index);
          const isActive = index === activeIndex;

          if (Math.abs(position) > Math.floor(N / 2)) return null;

          return (
            <CarouselCard
              key={index}
              title={slide.title}
              description={slide.description}
              image={slide.image}
              icons={slide.icons}
              isActive={isActive}
              position={position}
              setModalState={setModalState}
            />
          );
        })}

        {/* Navigation Buttons */}
        {showNavigation && N > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 cursor-pointer top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {showDots && N > 1 && (
          <div className="absolute bottom-6 cursor-pointer left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-blue-500 w-8'
                    : 'bg-blue-300/60 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiquidGlassCarousel;
export { LiquidGlassCarousel };