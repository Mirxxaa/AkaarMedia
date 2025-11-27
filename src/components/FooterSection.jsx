import { motion } from 'framer-motion';
import { Send, ArrowRight } from 'lucide-react';
import { useRef, useContext, useState, useEffect } from 'react'; // ADD useContext, useState, useEffect

// Import the ScrollContext created in App.js
import { ScrollContext } from '../App'; // Adjust path as needed

// --- Framer Motion Variants (Unchanged) ---
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.5,
    },
  },
};

// --- Main Footer Component ---

const Footer = () => {
  const footerRef = useRef(null);

  // Use the context to get the current scroll status from ScrollPageNavigator
  const { scrollCounter, REQUIRED_SCROLLS } = useContext(ScrollContext);
  
  // State for smooth width animation
  const [barWidth, setBarWidth] = useState('0%');

  // --- PROGRESS BAR LOGIC (Context-Driven) ---
  useEffect(() => {
    // Calculate the width based on the counter:
    
    let finalWidth;
    
    if (scrollCounter === 0) {
        // If the counter is 0, show minimum width (e.g., 50%) to signal readiness
        finalWidth = 50; 
    } else {
        // If scrolling has started, the bar grows from 50% up to 100%
        // Growth is: 50% + (50% * (scrolls_done / scrolls_required))
        finalWidth = 50 + (50 * (scrollCounter / REQUIRED_SCROLLS));
    }

    setBarWidth(`${finalWidth}%`);
  }, [scrollCounter, REQUIRED_SCROLLS]);
  // The Framer Motion scroll hooks (useScroll, useTransform) are no longer needed here.

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscription requested!");
  };

  return (
    <motion.footer 
      ref={footerRef}
      className="w-full bg-[#0f0f0f] text-white pt-24 pb-12 px-8 sm:px-16 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto border-t border-gray-800 pt-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 1. Newsletter / Left Section (Unchanged) */}
          <motion.div 
            className="lg:col-span-2"
            variants={childVariants}
          >
            <motion.h3 
              className="text-3xl sm:text-4xl font-light mb-4 tracking-tighter text-[#006aff]"
              variants={childVariants}
            >
              Stay Updated
            </motion.h3>
            <motion.p 
              className="text-gray-400 mb-8 max-w-lg font-light text-lg"
              variants={childVariants}
            >
              Get the latest insights, case studies, and studio news delivered straight to your inbox. No spam, guaranteed.
            </motion.p>
            
            {/* Newsletter Form (Unchanged Button Logic) */}
            <motion.form 
              onSubmit={handleSubscribe} 
              className="flex flex-col sm:flex-row gap-4 max-w-xl"
              variants={childVariants}
            >
              <input 
                type="email"
                placeholder="Enter your professional email"
                required
                className="flex-grow p-3 bg-[#0f0f0f] border-b border-gray-700 focus:border-[#006aff] focus:outline-none transition-colors duration-300 text-lg font-light rounded-none"
              />
              
              {/* Subscribe Button - Unified Minimal Style */}
              <motion.button
                type="submit"
                className="
                  relative py-2 px-6 overflow-hidden 
                  text-base font-normal tracking-wide whitespace-nowrap 
                  rounded-lg border border-white/50 text-white transition-colors duration-500 cursor-pointer group
                  flex items-center justify-center
                "
              >
                {/* Blue Wipe Effect */}
                <span aria-hidden="true" className="
                    absolute inset-0 w-full h-full bg-[#006aff] 
                    transform translate-y-full transition-transform ease-in-out duration-500
                    group-hover:translate-y-0
                "></span>
                <span className="relative z-10 transition-colors duration-500 flex items-center">
                    <Send className="w-4 h-4 mr-2" strokeWidth={2} />
                    Subscribe
                </span>
              </motion.button>
            </motion.form>
          </motion.div>
          
          {/* 2. Contact Button / Right Section (Unchanged) */}
          <motion.div 
            className="flex flex-col items-start lg:items-end justify-start pt-8 lg:pt-0"
            variants={childVariants}
          >
            <motion.p 
              className="text-xl text-gray-500 mb-6 font-light"
              variants={childVariants}
            >
              Ready to start a project?
            </motion.p>
            
            {/* Contact Us Button - Unified Minimal Style */}
            <motion.a 
              href="mailto:contact@studio.com"
              className="
                relative py-3 px-8 overflow-hidden inline-block
                text-xl font-normal tracking-wide 
                rounded-lg border border-white/50 text-white transition-colors duration-500 cursor-pointer group
              "
              variants={childVariants}
            >
                {/* Blue Wipe Effect */}
                <span aria-hidden="true" className="
                    absolute inset-0 w-full h-full bg-[#006aff] 
                    transform translate-y-full transition-transform ease-in-out duration-500
                    group-hover:translate-y-0
                "></span>
                <span className="relative z-10 transition-colors duration-500 flex items-center">
                    Contact Us
                    <ArrowRight className="w-5 h-5 ml-3" />
                </span>
            </motion.a>
          </motion.div>
          
        </div>

        {/* Studio Copyright/Legal Info - Updated to Akaar media */}
        <motion.div 
          className="mt-24 text-center text-sm text-gray-600 font-light"
          variants={childVariants}
        >
          &copy; {new Date().getFullYear()} Akaar media. All rights reserved. | Privacy Policy
        </motion.div>
        
        {/* ===== Localized Scroll Progress Bar ===== */}
        <div 
          className="mt-16 w-full h-16 bg-[#1a1a1a] border-t border-gray-800 lg:h-20"
        >
          <div className="flex items-center justify-between h-full px-6">
              <span className="text-sm text-gray-400 font-light tracking-wider">
                  Scroll to next page **({scrollCounter}/{REQUIRED_SCROLLS})**
              </span>
              <div className="w-1/2 h-1 bg-[#707070] rounded-full relative">
                  <motion.div
                      style={{ 
                          width: barWidth, 
                          // Add a CSS transition for smooth, visible progress on each scroll click
                          transition: 'width 0.15s ease-out' 
                      }}
                      className="absolute top-0 left-0 h-full bg-[#c0c0c0] rounded-full"
                  />
              </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;