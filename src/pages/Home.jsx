import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./CSS/globals.css"
import section2Video from "../assets/videos/section2.mp4";
import section3Image from "../assets/billboard.jpg";
import section4Image from "../assets/image4.png";
import blueBG from "../assets/blueBG.jpg";
import { FaStar, FaCheckCircle, FaBolt, FaUsers, FaLaptop, FaHotel, FaShoppingCart, FaBook, FaDollarSign } from "react-icons/fa";
import { PencilRuler, Laptop, Rocket, Printer } from 'lucide-react';
import { LiquidGlassCarousel } from "../components/LiquidGlassCarousel";
import TypewriterEffect from "../components/TypewriterEffect";
import UIUX from "../assets/UIUX.png";
import WEBDEV from "../assets/WEBDEV.png";
import PrintMaterial from "../assets/PrintMaterial.png";
import GD from "../assets/GD.jpg";
import DigitalMarketing from "../assets/digitalMarketing.jpg";


const industryIcons = [
  { icon: <FaLaptop size={40} />, label: "Tech" },
  { icon: <FaHotel size={40} />, label: "Hospitality" },
  { icon: <FaShoppingCart size={40} />, label: "E-commerce" },
  { icon: <FaBook size={40} />, label: "Education" },
  { icon: <FaDollarSign size={40} />, label: "Finance" },
];

const Home = ({ videos = [section2Video] }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);
  const ANIMATED_WORDS = ['Design.', 'Build.', 'Elevate.'];

  const scrollSectionRef = useRef(null);
const sectionContainerRef = useRef(null);
const [scrollProgress, setScrollProgress] = useState(0);

 
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};


  const carouselData = [
    {
      title: "UIUX",
      description:
        "We design intuitive and engaging digital experiences that focus on clarity, usability, and visual appeal.",
      image: UIUX,
      icons: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
        },
        {
          src: "https://dhygzobemt712.cloudfront.net/Mark/Mark_Logo_Blue.svg",
        },
      ],
    },
    {
      title: "WEB DEV",
      description:
        "We build responsive, fast, and scalable platforms using Next.js, React, Node, Webflow and custom ERP solutions.",
      image: WEBDEV,
      icons: [
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
        },
      ],
    },
    {
      title: "Digital Marketing",
      description:
        "Grow your brand with engaging content, Meta ads, Google ads, and powerful digital strategies.",
      image: DigitalMarketing,
      icons: [
        {
          src: "https://brandlogos.net/wp-content/uploads/2021/10/meta_platforms_icon-logo_brandlogos.net_f5zqr.png",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Google_Ads_icon.svg",
        },
      ],
    },
    {
      title: "Print & Production",
      description:
        "Premium quality prints, packaging, signage, wall wraps and production services that bring ideas to life.",
      image: PrintMaterial,
      icons: [
        { src: "https://cdn-icons-png.freepik.com/512/30/30203.png" },
        { src: "https://cdn-icons-png.freepik.com/256/3712/3712190.png" },
      ],
    },
    {
      title: "Graphic Designing",
      description:
        "From logos to full-scale brand identity systems, we create visuals that define your brand.",
      image: GD,
      icons: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAEPcn7-1FET8-xENfhX6J97htkiZnanwxbg",
        },
        {
          src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Blender_logo_no_text.svg",
        },
      ],
    },
  ];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const primaryBlue = '#006aff';

    const services = [
        { 
            title: "Branding", 
            description: "Identity systems that define who you are, creating a memorable and lasting impression in the market.",
            delay: 0.1,
            icon: PencilRuler // Icon for design/strategy
        },
        { 
            title: "Web Development", 
            description: "Fast, responsive, high-converting platforms built with modern frameworks and optimized for performance.",
            delay: 0.3,
            icon: Laptop // Icon for digital/web
        },
        { 
            title: "Digital Marketing", 
            description: "Strategies that drive awareness, clicks, and conversions across all major digital channels.",
            delay: 0.5,
            icon: Rocket // Icon for growth/launch
        },
        { 
            title: "Production & Print", 
            description: "High-quality physical materials that bring your digital brand into the tangible, physical world.",
            delay: 0.7,
            icon: Printer // Icon for physical/print
        },
    ];

  // Hero transitions
  const heroOpacity = useTransform(scrollY, [0, windowHeight * 0.5], [1, 0]);
  const heroY = useTransform(scrollY, [0, windowHeight * 0.5], [0, -120]);

  // Container transforms
  const containerWidth = useTransform(
    scrollY,
    [0, windowHeight * 0.3, windowHeight * 0.8, windowHeight * 1.3],
    ["100%", "100%", "80%", "100%"]
  );

  const containerBorderRadius = useTransform(
    scrollY,
    [0, windowHeight * 0.3, windowHeight * 0.8, windowHeight * 1.3],
    [0, 0, 32, 0]
  );

  const containerMarginTop = useTransform(
    scrollY,
    [0, windowHeight * 0.3, windowHeight * 0.8, windowHeight * 1.3],
    [0, 0, 100, 0]
  );

  const contentOpacity = useTransform(
    scrollY,
    [windowHeight * 0.4, windowHeight * 0.7],
    [0, 1]
  );

  const contentY = useTransform(
    scrollY,
    [windowHeight * 0.4, windowHeight * 0.7],
    [40, 0]
  );

useEffect(() => {
  const handleScroll = () => {
    if (!sectionContainerRef.current) return;
    
    const rect = sectionContainerRef.current.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = windowHeight;
    
    // When section enters viewport, start tracking scroll
    if (sectionTop <= windowHeight) {
      // Calculate how much we've scrolled past the section start
      const scrollDistance = windowHeight - sectionTop;
      // We need to scroll through 3x the window height to fully pass through
      const progress = scrollDistance / (sectionHeight * 3);
      setScrollProgress(Math.min(progress, 1));
    } else {
      setScrollProgress(0);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [windowHeight]);



const getLineOpacity = (lineIndex) => {
  const lineStart = lineIndex * 0.25;
  const lineEnd = lineStart + 0.35;
  
  if (scrollProgress < lineStart) return 0;
  if (scrollProgress > lineEnd) return 1;
  return (scrollProgress - lineStart) / (lineEnd - lineStart);
};

const getLineY = (lineIndex) => {
  const lineStart = lineIndex * 0.25;
  const lineEnd = lineStart + 0.35;
  
  if (scrollProgress < lineStart) return 30;
  if (scrollProgress > lineEnd) return 0;
  return 30 - (scrollProgress - lineStart) / (lineEnd - lineStart) * 30;
};

const lines = [
  "The Akaar Experience",
  "We don't just design — we solve problems.",
  "We don't just create — we communicate.",
  "We don't just deliver — we elevate."
];

const lineStartProgress = (index) => {
  // Each line starts appearing at different scroll progress
  return index * 0.25;
};

  return (
    <div className="w-full bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* ================= HERO ================= */}
      <motion.section
          style={{ opacity: heroOpacity, y: heroY }}
          className="h-screen w-full flex items-center justify-center fixed top-0 left-0 right-0 z-0 pointer-events-none bg-[#0f0f0f]"
      >
          <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="text-center px-4"
          >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-[#e5e5e5] tracking-wide drop-shadow-xl">
                  From Vision to Visibility
              </h1>
              <p className="text-sm md:text-lg text-gray-300 mt-4 max-w-xl mx-auto">
                  A full-stack creative & digital agency that blends design, technology, and strategy to build brands that win.
              </p>
              <div className="mt-12 md:mt-16"> 
                  <h2 className="text-xl md:text-3xl font-regular text-[#e5e5e5]">
                      We 
                      <TypewriterEffect words={ANIMATED_WORDS} /> 
                  </h2>
              </div>
          </motion.div>
      </motion.section>

      {/* ================= SCROLL CONTAINER START ================= */}

      {/* ================= TOP SERVICES STRIP (NEW) ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full bg-[#111] py-6 border-y border-white/5"
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-6 text-sm md:text-base text-gray-300">
          {["Branding", "Web Development", "Digital Marketing", "Production & Print"].map(
            (item, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-1 rounded-full bg-white/5 border border-white/10"
              >
                {item}
              </motion.span>
            )
          )}
        </div>
      </motion.div>


      <div className="relative z-10 flex justify-center pt-[100vh]">
        <motion.div
          ref={containerRef}
          style={{
            width: containerWidth,
            borderRadius: containerBorderRadius,
            marginTop: containerMarginTop,
          }}
          className="bg-[#141414] transition-all duration-700 shadow-2xl overflow-hidden"
        >
          {/* ================= MAIN CONTENT PART 1 ================= */}
          <motion.main style={{ opacity: contentOpacity, y: contentY }}>
            <div className="px-5 md:px-12 lg:px-20 pt-20 pb-28">
              {/* Brand Intro */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-gray-300 text-justify text-base md:text-lg max-w-2xl leading-relaxed mb-16"
              >
                Akaar Media transforms brands through clean design, modern development, and powerful digital strategy.
                We create visuals that move people and platforms that move businesses.
              </motion.p>

              {/* ================= SECTION 2 – VIDEOS ================= */}
              <div className="space-y-28">
                {videos.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.9, delay: i * 0.1 }}
                    className="rounded-3xl overflow-hidden border border-white/5 shadow-xl"
                  >
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-[320px] md:h-[450px] lg:h-[550px] object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.section
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="w-full bg-[#0a0a0a] text-white py-20" // Primary full-width dark background
>
  <div className="max-w-7xl mx-auto px-6 text-center"> {/* Unified Content Container */}
    
    {/* --- CLIENT LOGOS --- */}
    <h3 className="text-gray-300 text-lg mb-16 font-light tracking-wider">Trusted by brands across industries</h3>

    <div className="flex flex-wrap justify-center gap-10 lg:gap-18 sm:gap-6 md:gap-8 opacity-80 pb-20 border-b border-gray-800">
      {/* Ensure industryIcons is defined in your scope */}
      {industryIcons.map((item, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center text-gray-800 hover:text-[#006aff] transition duration-300" // Hover changed to blue accent
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          {/* Apply hover styling to the icon wrapper */}
          <div className="text-gray-600 hover:text-[#006aff] transition duration-300"> 
            {item.icon} 
          </div>
          <span className="mt-2 text-sm text-gray-400">{item.label}</span>
        </motion.div>
      ))}
    </div>
    {/* --- END: CLIENT LOGOS --- */}

    {/* --- WHAT WE DO SECTION (INTEGRATED) --- */}
    {/* Note: Removed the nested motion.section tag and used a div for cleaner structure */}
    <div className="w-full pt-20">
      
      {/* Main Header */}
      <motion.h2 
          className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter mb-4 text-white leading-tight text-left" 
          variants={itemVariants} 
      >
          WHAT WE DO
      </motion.h2>

      {/* Subtitle/Lead-in */}
      <motion.p 
          className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-16 max-w-4xl font-light leading-relaxed border-l-4 pl-6 text-left"
          style={{ borderColor: '#006aff' }}
          variants={itemVariants}
      >
          A full spectrum of creative and technical services designed to elevate your brand presence.
      </motion.p>

      {/* Service Cards Grid - Responsive layout */}
      <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-left"
          variants={containerVariants}
      >
          {services.map((service, i) => {
              const IconComponent = service.icon;
              return (
                  <motion.div
                      key={i}
                      variants={itemVariants}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      
                      // Card styling updated for corporate theme consistency
                      className={`p-6 bg-[#0f0f0f] rounded-xl border border-gray-800 h-full transition-all duration-300 ease-in-out cursor-pointer shadow-none 
                                   hover:border-[#006aff] hover:bg-[#0f0f0f] hover:shadow-2xl hover:shadow-[#006aff]/10`}
                  >
                      {/* Icon styled with the blue accent color */}
                      <IconComponent className={`w-8 h-8 mb-4`} style={{ color: '#006aff' }} />
                      
                      {/* H3 Title - Bold white for clean contrast */}
                      <h3 className={`text-xl font-semibold text-white mb-3`}>
                          {service.title}
                      </h3>
                      {/* Description - Subtle gray text */}
                      <p className="text-gray-400 text-base leading-relaxed">
                          {service.description}
                      </p>
                  </motion.div>
              );
          })}
      </motion.div>
    </div>
    {/* --- END: WHAT WE DO SECTION --- */}
    
    
    {/* --- TESTIMONIALS --- */}
    <div className="pt-20">
      <h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter mb-16 text-white leading-tight text-left" 
          variants={itemVariants} 
      >
          CLIENT TESTIMONIALS
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            // Background/Border updated for corporate black theme consistency
            className="p-6 rounded-2xl bg-[#0f0f0f] border border-gray-800 shadow-lg" 
          >
            {/* Star ratings */}
            <span className="text-yellow-400">
              <FaStar className="inline mr-1" />
              <FaStar className="inline mr-1" />
              <FaStar className="inline mr-1" />
              <FaStar className="inline mr-1" />
              <FaStar className="inline" />
            </span>
            
            <p className="text-gray-300 text-base mt-4 leading-relaxed font-light">
              “Akaar Media helped transform our brand presence. Stunning visuals and timely delivery.”
            </p>
            <p className="mt-4 text-white text-sm font-semibold">— Client Name</p>
          </motion.div>
        ))}
      </div>
    </div>
    {/* --- END: TESTIMONIALS --- */}
    
  </div>
</motion.section>
          </motion.main>
         
          <motion.div> 
              
              {/* ================= SECTION 3 – FULLSCREEN IMAGE ================= */}
              <motion.section
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 1 }}
                className="relative w-full h-[100vh]"
              >
                <img
                  src={section3Image}
                  className="w-full h-full object-cover"
                  alt=""
                />
                <div className="absolute inset-0 bg-black/40" />
              </motion.section>
{/* ================= SIMPLIFIED ON-VIEW ANIMATION SECTION CONTAINER (THE AKAAR EXPERIENCE) ================= */}
<div ref={sectionContainerRef} className="relative py-32 md:py-48 lg:py-64 bg-[#0a0a0a] border-b border-gray-800">
  
  {/* Standard Background with accent line */}
  <div className="absolute inset-0 w-full h-full">
    {/* Subtle accent line at the top */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#006aff] to-transparent opacity-30" />
  </div>

  {/* Text Content Container */}
  <div className="relative z-20 w-full flex flex-col items-center justify-center px-6 md:px-12">
    {/* Lines Container */}
    <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10">
      
      {/* MAIN TITLE - The Akaar Experience */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-tight" // Font style updated to 'extralight' for corporate sleekness
      >
        <span className="bg-clip-text text-transparent" 
              style={{ backgroundImage: 'linear-gradient(90deg, #ffffff, #006aff)' }}>
          THE AKAAR EXPERIENCE
        </span>
        <br />
      </motion.div>

      {/* SECOND LINE - We Don't Just Design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-xl md:text-3xl lg:text-4xl font-light tracking-wide text-gray-300" // Font size increased for impact
      >
        We Don't Just Design
      </motion.div>

      {/* SUB LINE - All benefits in one line */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true, amount: 0.5 }}
        className="text-base md:text-lg lg:text-xl font-light tracking-wide text-gray-400 max-w-2xl mx-auto"
      >
        We solve problems, communicate ideas <span className="text-[#006aff] font-normal">&</span> elevate brands
      </motion.div>

    </div>
  </div>
</div>
{/* ================= END SIMPLIFIED ON-VIEW ANIMATION SECTION CONTAINER ================= */}

{/* ================= SECTION 4 – BRAND MESSAGE (REDESIGNED) ================= */}
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="w-full px-5 md:px-12 lg:px-20 py-24 bg-[#0a0a0a] border-b border-gray-800"
>
  <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
    
    {/* TEXT CONTENT */}
    <div>
      <h2 className="text-3xl md:text-5xl leading-snug font-extralight text-white tracking-tighter">
        Everything a Brand Needs to{" "}
        <span className="font-semibold bg-white/10 px-2 py-1 rounded-lg text-[#006aff]"> 
          Stand Out
        </span>
      </h2>

      <p className="text-gray-400 mt-6 text-lg leading-relaxed font-light">
        From logos that speak louder than words to websites that define your **digital identity** — we engineer brands that move people.
      </p>

      <p className="mt-6 text-xl font-medium tracking-wide text-white">
        We{" "}
        <span className="text-[#006aff] hover:text-white transition duration-300">
          Design,
        </span>{" "}
        <span className="text-[#006aff] hover:text-white transition duration-300">
          Develop
        </span>{" "}
        &{" "}
        <span className="text-[#006aff] hover:text-white transition duration-300">
          Deliver
        </span>{" "}
        everything that gives your brand its true identity.
      </p>
    </div>

    {/* IMAGE CONTENT */}
    <div>
      <img
        src={section4Image}
        className="rounded-xl shadow-2xl border border-gray-800 transition duration-500 hover:shadow-[#006aff]/20"
        alt="Digital identity and branding concept visual"
      />
    </div>
  </div>
</motion.section>
{/* ================= END BRAND MESSAGE SECTION ================= */}

{/* ================= WHY CHOOSE US (REDESIGNED) ================= */}
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.9 }}
  className="w-full px-6 md:px-12 lg:px-20 py-24 bg-[#0a0a0a] border-b border-gray-800"
>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-6xl font-extralight text-white text-center mb-16 tracking-tighter">
      Why Brands Choose <span className="font-semibold text-[#006aff] bg-white/5 px-2 py-1 rounded-lg">Akaar Media</span>
    </h2>

  <div className="grid md:grid-cols-4 gap-8">
  {[
    { 
      icon: <FaBolt />, 
      title: "Fast Delivery", 
      description: "Quick turnaround without compromising quality." 
    },
    { 
      icon: <FaCheckCircle />, 
      title: "High Quality Work", 
      description: "Designs built with intention, clarity, and strategy." 
    },
    { 
      icon: <FaUsers />, 
      title: "Reliable Team", 
      description: "A dedicated relationship manager keeps everything on track." 
    },
    { 
      icon: <FaStar />, 
      title: "6+ Years Experience", 
      description: "Proven experience across industries and mediums." 
    },
  ].map((feature, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className="p-8 rounded-xl bg-[#0f0f0f] text-center border border-gray-800 transition duration-300 hover:border-[#006aff] hover:shadow-2xl hover:shadow-[#006aff]/10"
    >
      <div className="text-4xl text-[#006aff] mb-4 flex justify-center">
        {feature.icon}
      </div>
      <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
      {/* dynamically render the description here */}
      <p className="text-gray-400 text-sm leading-relaxed font-light">
        {feature.description}
      </p>
    </motion.div>
  ))}
</div>
  </div>
</motion.section>
{/* ================= END WHY CHOOSE US SECTION ================= */}
              
{/* ================= SEO CONTENT BLOCK (REDESIGNED) ================= */}
<motion.section
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="w-full px-6 md:px-12 lg:px-20 py-20 bg-[#0a0a0a]"
>
  <div className="max-w-7xl mx-auto">
    <h3 className="text-3xl md:text-5xl text-white font-light mb-8 tracking-tighter">
      Creative Solutions Designed for Modern Brands
    </h3>

    <p className="text-gray-400 leading-relaxed max-w-4xl mb-6 text-lg font-light border-l-4 pl-6"
       style={{ borderColor: '#006aff' }}>
      We help businesses grow through strategic design, high-performing web development, engaging content, and premium production. 
      Every brand has a story — our job is to make it unforgettable.
    </p>

    <p className="text-gray-400 leading-relaxed max-w-4xl text-lg font-light">
      Whether you're launching something new or elevating an existing identity, our process blends creativity, technology, and strategy 
      to ensure your brand stands strong in every space — digital or physical.
    </p>
  </div>
</motion.section>
{/* ================= END SEO CONTENT BLOCK ================= */}


              {/* ================= SECTION 5 – CAROUSEL ================= */}
              <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: `url(${blueBG})` }}
              >
                <div className="w-full max-w-6xl px-6">
                  <LiquidGlassCarousel
                    slides={carouselData}
                    autoPlayInterval={5000}
                    showNavigation
                    showDots
                  />
                </div>
              </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-full py-28 md:py-40 flex items-center justify-center px-6 md:px-12 lg:px-20 bg-[#0a0a0a] border-t border-gray-900"
        >
            {/* Subtle Blue Radial Glow Background */}
            <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 75% 10%, rgba(0, 102, 255, 0.1), transparent 50%)`,
                }}
            ></div>

            {/* CONTENT WRAPPER */}
            <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-16">

                {/* PUNCHLINE */}
                <div className="text-white max-w-lg md:text-left text-center">
                    <p className="text-[#006aff] text-sm font-semibold uppercase tracking-widest mb-3">
                        Ready to begin?
                    </p>
                    <h2 className="text-4xl md:text-6xl font-extralight tracking-tighter leading-snug">
                        Let’s Build Something 
                        <span className="font-bold bg-[#006aff]/10 text-[#006aff] px-2 py-1 rounded-lg ml-2 block sm:inline-block mt-2 sm:mt-0">
                            Unforgettable
                        </span>
                    </h2>

                    <p className="text-gray-400 mt-6 text-lg leading-relaxed font-light">
                        Tell us your idea. We’ll turn it into a high-performance experience that works, moves, and inspires. Our team is ready to deliver.
                    </p>
                </div>

                {/* MINIMAL DARK CONTACT FORM */}
                <div
                    className="
                      relative w-full max-w-md p-8 rounded-xl
                      bg-[#0f0f0f] border border-gray-800 shadow-2xl shadow-black/50
                    "
                >
                    <form className="flex flex-col gap-6">

                        {/* INPUT FIELDS */}
                        {["Name", "Email", "Project Budget (e.g., $5k+)", "Message"].map((field, i) => (
                            <div key={i} className="relative">
                                {field !== "Message" ? (
                                    <input
                                        type={field.includes("Email") ? "email" : "text"}
                                        placeholder={field}
                                        className="
                                            w-full bg-[#151515] text-white
                                            rounded-lg px-4 py-3 outline-none
                                            border border-gray-700 placeholder:text-gray-500
                                            transition-all duration-300
                                            focus:border-[#006aff] focus:ring-1 focus:ring-[#006aff]
                                        "
                                    />
                                ) : (
                                    <textarea
                                        placeholder={field}
                                        rows="4"
                                        className="
                                            w-full bg-[#151515] text-white
                                            rounded-lg px-4 py-3 outline-none
                                            border border-gray-700 placeholder:text-gray-500
                                            transition-all duration-300 resize-none
                                            focus:border-[#006aff] focus:ring-1 focus:ring-[#006aff]
                                        "
                                    ></textarea>
                                )}
                            </div>
                        ))}

                        {/* SUBMIT BUTTON - Solid Blue */}
                        <button
                            type="submit"
                            className="
                                mt-3 w-full py-3 text-white font-bold rounded-lg 
                                bg-[#006aff] border border-[#006aff]
                                hover:bg-[#005cdd] transition-all duration-300
                                shadow-lg shadow-[#006aff]/30
                            "
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </motion.section>

           
          </motion.div>
          {/* ================= END MAIN CONTENT PART 2 ================= */}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;