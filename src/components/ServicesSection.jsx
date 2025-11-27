import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const initialServicesData = [
  {
    id: 1,
    title: 'Web Development',
    details: [
      'Custom web applications',
      'Responsive design',
      'Progressive web apps',
      'E-commerce solutions'
    ]
  },
  {
    id: 2,
    title: 'Mobile Applications',
    details: [
      'iOS & Android development',
      'Cross-platform solutions',
      'App store deployment',
      'Mobile UI/UX design'
    ]
  },
  {
    id: 3,
    title: 'ERP Solutions',
    details: [
      'Enterprise resource planning',
      'Business process automation',
      'Custom ERP modules',
      'Integration services'
    ]
  },
  {
    id: 4,
    title: 'Cloud Services',
    details: [
      'Cloud migration',
      'Infrastructure management',
      'DevOps solutions',
      'Cloud security'
    ]
  }
];

const ServicesSection = () => {
  const [servicesData] = useState(initialServicesData);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]); // To get precise item positions
  const animationIntervalRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Triple the data for infinite scroll effect
  const tripleServices = [...servicesData, ...servicesData, ...servicesData];
  const totalItems = servicesData.length;
  const itemHeight = 100; // matches the height in style
  const middleSectionStart = totalItems;
  const middleSectionEnd = totalItems * 2 - 1;

  // Function to calculate the truly active index based on scroll position
  const updateActiveIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerCenterY = container.scrollTop + container.clientHeight / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    // Iterate through all items in the tripleServices array
    itemRefs.current.forEach((itemEl, index) => {
      if (itemEl) {
        const itemCenterY = itemEl.offsetTop + itemEl.clientHeight / 2;
        const distance = Math.abs(containerCenterY - itemCenterY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });
    
    // Only update if the closest item is truly near the center
    // This helps prevent false positives when two items are almost equally close
    if (minDistance < itemHeight / 2) { // If distance is less than half item height, it's pretty centered
        const originalIndex = closestIndex % totalItems;
        setActiveIndex(originalIndex);
    }
  }, [totalItems, itemHeight]);
  
  // Initial scroll and Active Index Listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Set initial scroll position to the middle section for smooth infinite looping
    container.scrollTop = itemHeight * middleSectionStart;
    
    const handleScrollBoundary = () => {
      const sectionHeight = itemHeight * totalItems;
      
      // Reset scroll position for infinite effect
      if (container.scrollTop >= sectionHeight * 2) {
        container.scrollTop = sectionHeight; 
      } else if (container.scrollTop < sectionHeight) {
        container.scrollTop = sectionHeight * 2;
      }
      updateActiveIndex(); // Update active index on scroll
    };
    
    container.addEventListener('scroll', handleScrollBoundary, { passive: true });
    updateActiveIndex(); // Initial active index set

    return () => {
      container.removeEventListener('scroll', handleScrollBoundary);
    };
  }, [totalItems, itemHeight, middleSectionStart, updateActiveIndex]);

  // Auto-scroll animation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isHovering) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
      return;
    }

    if (!animationIntervalRef.current) {
        const scrollAmount = itemHeight; 
        const intervalTime = 2500; 
        
        animationIntervalRef.current = setInterval(() => {
            if (container && !isHovering) {
                container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            }
        }, intervalTime);
    }
    
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = null;
      }
    };
  }, [isHovering, itemHeight]);

  // Helper function for smooth manual item scroll
  const handleItemClick = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Find the closest corresponding item in the middle section of tripleServices
    let targetIndexInTriple = middleSectionStart + index;
    
    // Ensure the scroll position keeps the clicked item centered
    const targetScrollTop = itemRefs.current[targetIndexInTriple].offsetTop - (container.clientHeight / 2) + (itemHeight / 2);
    
    container.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const activeService = servicesData[activeIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Scrolling Services */}
          <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
            {/* Brighter Gradient Overlays - adjusted for better blending and fade */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10 pointer-events-none" />

            {/* Scrollable Container with scroll-snap */}
            <div
              ref={scrollContainerRef}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className="h-full overflow-y-scroll relative w-full focus:outline-none" // 1. Removed outline
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                scrollBehavior: 'auto', 
                scrollSnapType: 'y mandatory',
                // This background matches the overall section background to prevent the "square"
                background: 'linear-gradient(to bottom right, #1a202c, #000000, #1a202c)' // Matches from-gray-900 via-black to-gray-900
              }}
            >
              <div className="py-[200px]">
                {tripleServices.map((service, index) => {
                  const originalIndex = index % totalItems;
                  
                  // Calculate distance from center for dynamic fading and scaling
                  let opacity = 0.3;
                  let scale = 0.75;
                  
                  if (scrollContainerRef.current && itemRefs.current[index]) {
                      const containerCenterY = scrollContainerRef.current.scrollTop + scrollContainerRef.current.clientHeight / 2;
                      const itemCenterY = itemRefs.current[index].offsetTop + itemHeight / 2;
                      const distance = Math.abs(containerCenterY - itemCenterY);
                      
                      // Normalize distance to be between 0 (center) and 1 (edge of view)
                      const normalizedDistance = Math.min(1, distance / (scrollContainerRef.current.clientHeight / 2));
                      
                      opacity = 1 - normalizedDistance * 0.7; // Fade out more at edges
                      scale = 1 - normalizedDistance * 0.25; // Scale down more at edges
                      
                      // If it's the very center, make it fully opaque and scaled
                      if (distance < itemHeight / 4) { // Small threshold for "active" center
                          opacity = 1;
                          scale = 1.25;
                      }
                  }

                  return (
                    <div
                      key={`${service.id}-${index}`}
                      ref={el => itemRefs.current[index] = el}
                      className="py-4 px-8 transition-all duration-500 cursor-pointer flex items-center justify-center"
                      style={{ 
                        height: `${itemHeight}px`, 
                        scrollSnapAlign: 'center',
                        opacity: opacity, // Apply dynamic opacity
                        transform: `scale(${scale})` // Apply dynamic scale
                      }}
                      onClick={() => handleItemClick(originalIndex)}
                    >
                      <div
                        className={`text-2xl md:text-4xl font-bold transition-all duration-500 
                          ${opacity === 1 && scale === 1.25 // 2. & 3. Only highlight truly active (centered) item
                            ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text'
                            : 'text-gray-600' // Use gray-600 for faded items, not just opacity
                          }`}
                      >
                        {service.title}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Service Details */}
          <div className="lg:pl-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {activeService.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {activeService.details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start space-x-4 group"
                      >
                        <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 group-hover:scale-150 transition-transform" />
                        <p className="text-gray-300 text-lg group-hover:text-white transition-colors">
                          {detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Service Indicators */}
        <div className="flex justify-center mt-16 space-x-3">
          {servicesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleItemClick(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-12 bg-gradient-to-r from-blue-400 to-purple-500'
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;