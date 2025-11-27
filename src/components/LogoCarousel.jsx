import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable component for an infinite, seamless logo loop carousel.
 *
 * @param {object[]} logos - Array of logo objects { name: string, icon: string }
 */
const LogoCarousel = ({ logos = [] }) => {
  // Simple check to determine if the icon string is a URL
  const isImageUrl = (iconString) => {
    // Check if the string starts with http or contains a file extension
    return typeof iconString === 'string' && (
      iconString.startsWith('http') || 
      iconString.match(/\.(png|jpe?g|svg|webp|gif)$/i)
    );
  };

  const logosToDisplay = logos.length ? logos : [];
  // Duplicate the logos to create the seamless loop
  const duplicatedLogos = [...logosToDisplay, ...logosToDisplay];

  // If there are no logos, prevent division by zero or rendering
  if (logosToDisplay.length === 0) {
    return (
      <div className="w-full bg-[#0f0f0f] py-12 text-center text-gray-500">
        No logos available.
      </div>
    );
  }

  // Calculate the width for each logo item. Total items = logos.length * 2.
  // Each item must occupy exactly 100% / (total items) of the track width.
  const itemWidthPercentage = 100 / duplicatedLogos.length;


  return (
    <div className="w-full bg-[#0f0f0f] py-12 px-8 overflow-hidden">
      <div className="flex justify-center">
        <div className="w-full overflow-hidden">
          <motion.div
            // Set a fixed track width (200vw) for the duplicated content
            // The item widths are calculated based on this 200vw total width.
            className="flex items-center w-[200vw] min-w-[200vw]"
            initial={{ x: 0 }}
            // FIX: Changed from -50% to -50.01% to compensate for sub-pixel rounding errors
            animate={{ x: '-50.0%' }} 
            transition={{
              x: {
                repeat: Infinity,
                duration: 40,
                ease: "linear",
              }
            }}
          >
            {duplicatedLogos.map((logo, index) => {
              const IconContent = isImageUrl(logo.icon) ? (
                // Render image for URL ICONS
                <img 
                  src={logo.icon} 
                  alt={`${logo.name} logo`} 
                  // Use inline block to ensure it respects the height
                  className="max-h-full object-contain inline-block"
                  style={{ height: '2.5rem', width: 'auto' }}
                  // Fallback for broken links
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              ) : (
                // Render span/emoji for text ICONS
                <span className="text-3xl" role="img" aria-label={logo.name}>
                  {logo.icon}
                </span>
              );

              return (
                <div 
                  key={index}
                  // Spacing handled by internal padding
                  className="flex flex-shrink-0 items-center justify-center h-24 sm:h-32 text-gray-500 px-4 md:px-8 lg:px-8 sm:px-8"
                  style={{ width: `${itemWidthPercentage}%` }} // Ensure exact percentage width
                >
                  <div className="flex items-center">
                    {/* The rendered icon/image content */}
                    <div className="mr-3 flex-shrink-0 flex items-center justify-center" style={{ height: '2.5rem' }}>
                        {IconContent}
                    </div>

                    {/* Logo Name was removed in the query, keeping it clean */}
                   
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;