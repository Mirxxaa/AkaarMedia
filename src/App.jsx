import React, { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate,  } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/FooterSection"; 
import ScrollToTop from "./components/ScrollToTop";

// Export the Context so Footer.jsx can use it
export const ScrollContext = createContext({
    scrollCounter: 0, 
    REQUIRED_SCROLLS: 7 
});

// 1. Define the Page Order (The Scroll Chain)
const PAGE_ORDER = [
  '/', 
  '/about', 
  '/services', 
  '/projects', 
  '/contact' // Last page for the loop
];

// --- Custom Component to Handle Scroll Navigation Logic ---
const ScrollPageNavigator = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // This state will be shared with the Footer
    const [scrollCounter, setScrollCounter] = useState(0); 
    const resetTimer = useRef(null);
    const lastScrollTime = useRef(0);
    const isScrolling = useRef(false);
    const touchStartY = useRef(0);
    const scrollAccumulator = useRef(0);
    
    // Constant defining the required number of scrolls to trigger navigation
    const REQUIRED_SCROLLS = 7; 

    // Function to navigate to the next page in the array
    const navigateNext = useCallback(() => {
        // Current index of the path in the PAGE_ORDER array
        const currentPageIndex = PAGE_ORDER.indexOf(location.pathname); 
        
        if (currentPageIndex >= 0) {
            let nextPath;
            
            // Check if we are on the last page in the defined loop
            if (currentPageIndex === PAGE_ORDER.length - 1) {
                // Loop back to the first page (Home)
                nextPath = PAGE_ORDER[0]; 
            } else {
                // Move to the next page in the sequence
                nextPath = PAGE_ORDER[currentPageIndex + 1];
            }
            
            navigate(nextPath);
            
            // Ensure the new page starts at the top
            window.scrollTo(0, 0); 
            
            console.log(`Navigated to: ${nextPath}`);
        }
    }, [navigate, location.pathname]);

    // Check if user is at bottom of page
    const isAtBottom = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const clientHeight = window.innerHeight;
        return scrollTop + clientHeight >= scrollHeight - 10;
    }, []);

    // --- IMPROVED SCROLL DETECTION WITH DEBOUNCING ---
    const handleWheel = useCallback((e) => {
        const now = Date.now();
        const timeSinceLastScroll = now - lastScrollTime.current;
        
        // Only process downward scrolls when at bottom
        if (e.deltaY > 0 && isAtBottom()) {
            // Accumulate scroll delta for more natural detection
            scrollAccumulator.current += Math.abs(e.deltaY);
            
            // Debounce: We need enough time AND enough scroll distance
            // 250ms prevents trackpad from counting multiple times in one gesture
            // But still allows intentional repeated scrolls
            if (timeSinceLastScroll < 250) {
                return;
            }
            
            // Require minimum scroll distance (prevents tiny movements from counting)
            if (scrollAccumulator.current < 100) {
                return;
            }
            
            // Reset accumulator for next scroll
            scrollAccumulator.current = 0;
            lastScrollTime.current = now;
            
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }

            setScrollCounter(prev => {
                const newCounter = prev + 1;
                console.log(`Scroll count: ${newCounter}/${REQUIRED_SCROLLS}`);
                
                if (newCounter >= REQUIRED_SCROLLS) { 
                    navigateNext();
                    return 0; 
                }
                
                // Reset counter after 3 seconds of inactivity
                resetTimer.current = setTimeout(() => {
                    setScrollCounter(0);
                    scrollAccumulator.current = 0;
                    console.log('Scroll counter reset by timeout.');
                }, 3000); 
                
                return newCounter;
            });
        } else if (e.deltaY < 0 && scrollCounter > 0) {
            // User scrolled up, reset the counter
            setScrollCounter(0);
            scrollAccumulator.current = 0;
            lastScrollTime.current = now;
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
        }
    }, [navigateNext, scrollCounter, REQUIRED_SCROLLS, isAtBottom]);

    // --- TOUCH SUPPORT FOR MOBILE ---
    const handleTouchStart = useCallback((e) => {
        touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!isAtBottom()) {
            return;
        }

        const touchY = e.touches[0].clientY;
        const diff = touchStartY.current - touchY;

        // User is swiping up (scrolling down content)
        if (diff > 50) { // Threshold for a meaningful swipe
            const now = Date.now();
            const timeSinceLastScroll = now - lastScrollTime.current;
            
            // Debounce touch events too
            if (timeSinceLastScroll < 300) {
                return;
            }
            
            lastScrollTime.current = now;
            touchStartY.current = touchY; // Reset for next swipe
            
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }

            setScrollCounter(prev => {
                const newCounter = prev + 1;
                console.log(`Touch swipe count: ${newCounter}/${REQUIRED_SCROLLS}`);
                
                if (newCounter >= REQUIRED_SCROLLS) { 
                    navigateNext();
                    return 0; 
                }
                
                // Reset counter after 2 seconds of inactivity
                resetTimer.current = setTimeout(() => {
                    setScrollCounter(0);
                    console.log('Touch counter reset by timeout.');
                }, 2000); 
                
                return newCounter;
            });
        }
    }, [navigateNext, scrollCounter, REQUIRED_SCROLLS, isAtBottom]);

    const handleTouchEnd = useCallback(() => {
        touchStartY.current = 0;
    }, []);

    // Attach event listeners
    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
        };
    }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]); 

    // Ensure the counter resets on page change
    useEffect(() => {
        setScrollCounter(0);
        lastScrollTime.current = 0;
        scrollAccumulator.current = 0;
    }, [location.pathname]);

    return (
        <ScrollContext.Provider value={{ scrollCounter, REQUIRED_SCROLLS }}>
            <div className="main-content-wrapper relative"> 
                {children}
                <Footer /> 
            </div>
        </ScrollContext.Provider>
    );
}

// --- Main App Component ---
function App() {
  return (
  <Router>
      <NavigationBar />
      <ScrollToTop /> 
      <ScrollPageNavigator>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </ScrollPageNavigator>
    </Router>
  );
}

export default App;