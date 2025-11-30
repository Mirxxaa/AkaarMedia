import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// --- DATA & STYLING CONSTANTS ---
const primaryBlue = '#006aff';

// Using inline SVG for the star icon to eliminate dependency on 'react-icons/fa'
const StarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 18.896l-7.416 3.917 1.48-8.279-6.064-5.828 8.332-1.151L12 .587z"/>
  </svg>
);

const testimonialsData = [
  { name: 'Abdullah Nasser', quote: 'Akaar Media helped transform our brand presence. Stunning visuals and timely delivery on Contracting Business', company: 'Moujan Contracting - Riyadh' },
  { name: 'Hamza Nawaz', quote: 'Exceptional service and flawless execution. Highly recommend their media solutions for anyone in the Materimonial Services', company: 'MubarakRishte Matrimony - Hyderabad' },
  { name: 'Wayz', quote: 'Our ROI significantly increased after deploying the targeted digital content Akaar Media created for us. Truly powerful strategy.', company: 'Wayz International - Riyadh' },
  { name: 'Abu Salman', quote: 'Professional, creative, and always on time. They are a true partner in branding, handling both digital and print needs seamlessly.', company: 'Rask Law Firm - Riyadh' },
  { name: 'Tanveer Alam', quote: 'The best media agency we have ever worked with. The results speak for themselves, making our brand identity crystal clear.', company: 'Smart Print - Riyadh' },
];

// --- TESTIMONIALS SLIDER COMPONENT ---
const TestimonialsSlider = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll logic (simulating keen-slider's Autoplay)
  useEffect(() => {
    // Only proceed if the slider ref is available
    if (!sliderRef.current || isDragging) return;

    const interval = setInterval(() => {
      if (sliderRef.current && !isDragging) {
        // Calculate the next slide index and scroll position
        const slideWidth = sliderRef.current.children[0].offsetWidth + 32; // width + gap (32px)
        const nextIndex = (currentIndex + 1) % testimonialsData.length;
        
        sliderRef.current.scrollBy({
          left: slideWidth,
          behavior: 'smooth'
        });

        // Loop back to start (simulated infinite scroll for smooth transition)
        if (nextIndex === 0) {
          // If we reach the end, jump back to the start without animation
          // This requires a brief delay to allow the last scroll to complete
          setTimeout(() => {
            if (sliderRef.current) {
              sliderRef.current.scrollTo({ left: 0, behavior: 'auto' });
            }
          }, 500);
        }
        
        setCurrentIndex(nextIndex);
      }
    }, 5000); // Slower interval for readability

    return () => clearInterval(interval);
  }, [currentIndex, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(sliderRef.current.scrollLeft);
    sliderRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (sliderRef.current) {
      sliderRef.current.style.scrollBehavior = 'smooth';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX);
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="w-full pt-20 overflow-hidden"
    >
      <h2
        className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-16 text-white leading-tight text-left"
      >
        CLIENT TESTIMONIALS
      </h2>

      {/* Slider Track: Uses flex, overflow-x-auto, and scroll-snap for a nice horizontal scroll experience */}
      <div 
        ref={sliderRef} 
        className="
          flex gap-8 overflow-x-scroll no-scrollbar 
          p-1 -m-1 pb-4 select-none
          "
        style={{
          // Hide the scrollbar visually for a cleaner look
          MsOverflowStyle: 'none', // IE and Edge
          scrollbarWidth: 'none', // Firefox
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollSnapType: isDragging ? 'none' : 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={() => {
          // Update currentIndex based on scroll position if you want dots/navigation,
          // but for this basic auto-scroll, we rely on the effect.
        }}
      >
        {testimonialsData.map((t, i) => (
          // Card Container
          <div
            key={i}
            className="
              min-w-[85vw] sm:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-21.333px)]
              snap-start
              p-6 rounded-2xl bg-[#0f0f0f] border border-gray-800 shadow-xl 
              transition-all duration-300 hover:border-[#006aff]
            "
          >
            {/* Star ratings */}
            <span className="text-yellow-400 flex mb-6">
              {[...Array(5)].map((_, j) => (
                <StarIcon key={j} className="inline w-4 h-4 mr-1 fill-current" />
              ))}
            </span>

            <div 
              className="h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
              onMouseDown={(e) => e.stopPropagation()}
              onMouseMove={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
            >
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light italic pr-2">
                "{t.quote}"
              </p>
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-700">
                <p className="text-white text-md font-semibold">— {t.name}</p>
                <p className="text-gray-500 text-sm font-light">{t.company}</p>
            </div>
          </div>
        ))}
        {/* Helper style for hiding scrollbar on WebKit browsers */}
        <style jsx="true">{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-thumb-gray-700::-webkit-scrollbar-thumb {
            background-color: #374151;
            border-radius: 3px;
          }
          .scrollbar-track-gray-900::-webkit-scrollbar-track {
            background-color: #111827;
          }
        `}</style>
      </div>
    </motion.div>
  );
};

export default TestimonialsSlider;