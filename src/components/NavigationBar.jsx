import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
// White Logos (Default)
import logoOnlyWhite from "../assets/LogoOnly.png"; // LogoOnly.png (White Color)
import logoWithTextWhite from "../assets/LogoWhite.png"; // LogoWhite.png (White Color)
// Black Logos (For White Background Sections)
import logoOnlyBlack from "../assets/LogoOnlyBlack.png"; // LogoOnlyBlack.png (Black Color)
import logoWithTextBlack from "../assets/LogoBlack.png"; // LogoBlack.png (Black Color)

// Social Media Data (Extracted for clarity, same as previous revision)
const SOCIAL_LINKS = [
    {
        name: "Instagram",
        url: "https://instagram.com/your-dummy-profile",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zM18.406 7.155c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/your-dummy-profile",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
    },
    {
        name: "YouTube",
        url: "https://youtube.com/your-dummy-channel",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
        ),
    },
];

// Define the Page Order here so the component can determine the active state.
const PAGE_ORDER = [
  '/',
  '/about',
  '/services',
  '/contact',
];


const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  
  const location = useLocation();
  const currentPath = location.pathname;
  // Calculate the current page index (needed for the active line)
  const currentPageIndex = PAGE_ORDER.indexOf(currentPath); 


  const links = [
    { name: "Home", path: "/" },
  
    { name: "About Us", path: "/about" },
      { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  // --- 1. Basic Scroll Effect ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // --- 2. Intersection Observer for Dynamic Theme Change ---
  useEffect(() => {
    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.1, 
    };

    const observerCallback = (entries) => {
      const isOverLightSection = entries.some(entry => entry.isIntersecting);
      setIsDarkBackground(!isOverLightSection);
    };

    const targetElements = document.querySelectorAll('[data-nav-theme="light"]');

    if (targetElements.length === 0) {
        setIsDarkBackground(true); 
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    targetElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [currentPath]); 

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);


  // --- Dynamic Variables ---

  // Determine logo source based on the desired theme color
  const logoWithText = isDarkBackground ? logoWithTextWhite : logoWithTextBlack;
  const logoOnly = isDarkBackground ? logoOnlyWhite : logoOnlyBlack;

  // Determine text color based on the desired theme color
  const textColor = isDarkBackground ? "text-white" : "text-black";
  const hoverTextColor = isDarkBackground ? "hover:text-white/70" : "hover:text-gray-700";
  const activeLineColor = isDarkBackground ? "bg-white" : "bg-black";
  const hamburgerColor = isDarkBackground ? "bg-white" : "bg-black";
  
  // Scrolled-down navbar background color logic
  const scrolledNavClasses = isScrolled
    ? `top-4 w-[90%] max-w-5xl rounded-2xl ${isDarkBackground ? "bg-white/5 backdrop-blur-xl border border-white/20 shadow-lg" : "bg-black/5 backdrop-blur-xl border border-black/10 shadow-lg"}`
    : `top-0 w-full rounded-none ${isDarkBackground ? "bg-black/50 backdrop-blur-lg border-b border-white/10 shadow-md" : "bg-white/70 backdrop-blur-lg border-b border-black/10 shadow-md"}`;


  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out
          ${scrolledNavClasses}
        `}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-6 relative">
          {/* Logo */}
          <div className="shrink-0 relative">
            {/* Full Logo */}
            <img
              src={logoWithText}
              alt="Logo"
              className={`w-auto min-w-40 object-contain transition-all duration-500 absolute ${
                isScrolled ? "h-8 opacity-0" : "h-10 opacity-100"
              }`}
            />
            {/* Icon-only Logo */}
            <img
              src={logoOnly}
              alt="Logo"
              className={`w-auto object-contain transition-all duration-500 ${
                isScrolled ? "h-8 opacity-100" : "h-10 opacity-0"
              }`}
            />
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-10 font-medium absolute left-1/2 transform -translate-x-1/2">
            {links.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <li key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    // Apply dynamic text color classes
                    className={`pb-1 ${textColor} ${hoverTextColor} transition-colors duration-300`}
                  >
                    {link.name}
                    <span
                      // Apply dynamic line color class
                      className={`absolute left-0 bottom-0 h-[2px] ${activeLineColor} transition-all duration-300 ease-out origin-left ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Hamburger Icon */}
          <div
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer relative z-[999]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              // Apply dynamic hamburger color class
              className={`block h-[2px] w-6 ${hamburgerColor} rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            ></span>
            <span
              // Apply dynamic hamburger color class
              className={`block h-[2px] w-6 ${hamburgerColor} rounded my-[6px] transition-all duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              // Apply dynamic hamburger color class
              className={`block h-[2px] w-6 ${hamburgerColor} rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            ></span>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu (Kept dark theme for menu overlay) */}
      <div
        // 🚨 Z-INDEX FIX: The overlay must have a slightly lower Z-index than the logo/hamburger
        // but high enough to cover the rest of the page. It's currently z-[998].
        className={`fixed inset-0 z-[998] md:hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Full screen overlay */}
        <div className="absolute inset-0 bg-black/95 backdrop-blur-lg">
          <div className="h-full overflow-y-auto flex flex-col">
            {/* Logo and Close Button (ensures they are clickable above the nav links) */}
            <div className="px-6 py-6 flex-shrink-0 flex justify-between items-center z-[1000] relative">
              <img src={logoOnlyWhite} alt="Logo" className="h-10 w-auto" />
              
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors duration-300"
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 -mt-20 relative z-[999]"> {/* 💡 FIX: Added relative z-[999] here */}
              <ul className="space-y-6">
                {links.map((link, i) => {
                  const isActive = currentPath === link.path;
                  return (
                    <li
                      key={link.name}
                      className={`transition-all duration-500 ease-out ${
                        menuOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-8"
                      }`}
                      style={{
                        transitionDelay: menuOpen ? `${i * 80 + 100}ms` : "0ms",
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        // 💡 FIX: Ensure the link is a block and covers the list item fully
                        className={`block text-2xl font-medium py-2 transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Get Personalized Quote Button */}
              <div
                className={`mt-12 transition-all duration-500 ease-out ${
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${links.length * 80 + 100}ms` : "0ms",
                }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center bg-white text-black py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors duration-300"
                >
                  Get Personalized Quote
                </Link>
              </div>

              {/* Social Media Section */}
              <div
                className={`mt-12 transition-all duration-500 ease-out ${
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${(links.length + 1) * 80 + 100}ms` : "0ms",
                }}
              >
                <p className="text-gray-400 text-sm mb-4">Follow us on</p>
                <div className="flex gap-6">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;