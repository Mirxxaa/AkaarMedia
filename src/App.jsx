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
            
            console.log(`Mapsd to: ${nextPath}`);
        }
    }, [navigate, location.pathname]);

    

    // --- Core Scroll Detection Logic ---
 const handleWheel = useCallback((e) => {
    // 1. DETERMINE SCROLL MAGNITUDE THRESHOLD
    // Standard mouse wheel delta is usually 3-50. 
    // Touchpads can easily produce deltas of 100 or more per "tick".
    // We'll use a small constant for normalization.
    const DELTA_THRESHOLD = 50; 

    // Determine if the scroll is large enough to count as a single "step down"
    // We also check e.deltaY > 0 for scrolling down.
    const isScrollingDownStep = e.deltaY > 0 && Math.abs(e.deltaY) > 5;
    
    // 2. CHECK IF THIS IS A LARGE TOUCHPAD SCROLL
    // Only proceed if the delta is smaller than the threshold OR if it's a mouse wheel scroll.
    // If the delta is large (touchpad), we should only count it once per "scroll action".
    const shouldCountScroll = Math.abs(e.deltaY) <= DELTA_THRESHOLD;

    // Check if the user is at the bottom of the page (existing logic)
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const clientHeight = window.innerHeight;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 5; 

    // --- MODIFIED SCROLL DOWN LOGIC ---
    // Change the condition to check for the new scroll step.
    if (atBottom && isScrollingDownStep) {
        
        // If it's a small mouse scroll OR the counter is currently 0 (start of a new large scroll action)
        // This ensures a large touchpad "flick" counts as only 1 or 2 increments, not 10.
        if (shouldCountScroll || scrollCounter === 0) { 
            
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }

            setScrollCounter(prev => {
                const newCounter = prev + 1;
                
                if (newCounter >= REQUIRED_SCROLLS) { 
                    navigateNext();
                    return 0; 
                }
                
                resetTimer.current = setTimeout(() => {
                    setScrollCounter(0);
                    console.log('Scroll counter reset by timeout.');
                }, 500); 
                
                return newCounter;
            });
        }
        
    } else if (e.deltaY < 0 && scrollCounter > 0) {
        // User scrolled up, reset the counter immediately
        setScrollCounter(0);
        if (resetTimer.current) {
            clearTimeout(resetTimer.current);
        }
    }
}, [navigateNext, scrollCounter, REQUIRED_SCROLLS]);

    // 4. Attach and clean up the wheel listener
    useEffect(() => {
        window.addEventListener('wheel', handleWheel);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
        };
    }, [handleWheel]); 

    // Ensure the counter resets on page change (for navigation/url changes)
    useEffect(() => {
        setScrollCounter(0);
    }, [location.pathname]);


    return (
        // Provide the scroll state to children (especially Footer)
        <ScrollContext.Provider value={{ scrollCounter, REQUIRED_SCROLLS }}>
            {/* ADD 'relative' CLASS HERE to ensure Framer Motion works correctly */}
            <div className="main-content-wrapper relative"> 
                {children}
                {/* The Footer is part of the content */}
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
      
      {/* PLACE THE SCROLL TO TOP COMPONENT HERE */}
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