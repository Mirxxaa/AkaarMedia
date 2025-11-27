import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Target, Eye, ChevronDown, Users, FileText, CheckCircle, Package } from "lucide-react";
import { useRef, useEffect, useState } from "react";
// Import LogoCarousel from its separate file
import LogoCarousel from "../components/LogoCarousel";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 10,
    },
  },
};

// Data for the new support system section
const SUPPORT_TEAM = [
  { 
    name: "Relationship Management Team", 
    icon: Users,
    description: "Your dedicated point of contact — ensuring fast communication, smooth coordination, and on-time delivery." 
  },
  { 
    name: "Content Writing Experts", 
    icon: FileText,
    description: "Crafting clean, sharp copy for websites, campaigns, and branding." 
  },
  { 
    name: "Proofreading & Review Team", 
    icon: CheckCircle,
    description: "Ensuring every deliverable is polished, aligned, and error-free." 
  },
  { 
    name: "Print & Quality Control Officer", 
    icon: Package,
    description: "Guaranteeing premium output across all printed, packaged, or produced materials." 
  },
];

// 🛑 MISSING DATA ARRAY 1: CORE VALUES
const CORE_VALUES_LIST_WITH_ICONS = [
  { 
    title: "Clarity",
    description: "Everything we create must be easy to understand and visually meaningful.",
    iconName: "Target/Focus"
  },
  { 
    title: "Consistency",
    description: "Quality that looks the same across platforms, devices, and mediums.",
    iconName: "Scale/Balance"
  },
  { 
    title: "Creativity",
    description: "Ideas that are simple, modern, and impossible to ignore.",
    iconName: "Sparkle/Lightbulb"
  },
  { 
    title: "Reliability",
    description: "On-time delivery, transparent communication, and long-term support.",
    iconName: "Shield/Checkmark"
  },
  { 
    title: "Integrity",
    description: "We build trust by being honest, clear, and committed to your success.",
    iconName: "Handshake/Diamond"
  },
  { 
    title: "Innovation",
    description: "We continuously explore new design trends, tools, and technologies to stay ahead.",
    iconName: "Rocket/Feather"
  },
];

// 🛑 MISSING DATA ARRAY 2: CAPABILITIES LIST
const CAPABILITIES_LIST = [
  { 
    title: "Branding & Identity",
    description: "Logos, full brand systems, guidelines, packaging, marketing collateral.",
    accentColor: '#006aff'
  },
  { 
    title: "UI/UX Design",
    description: "Clean, intuitive, and conversion-focused digital experiences built using Figma & Framer.",
    accentColor: '#006aff'
  },
  { 
    title: "Web Development",
    description: "From landing pages to enterprise systems — responsive, fast, scalable.",
    accentColor: '#006aff'
  },
  { 
    title: "Digital Marketing",
    description: "Meta Ads, Google Ads, content creation, strategy, and analytics.",
    accentColor: '#006aff'
  },
  { 
    title: "Graphic & Motion Design",
    description: "Brand visuals, illustrations, animated content, promotional videos.",
    accentColor: '#006aff'
  },
  { 
    title: "Production & Print",
    description: "Signage, packaging, brochures, wall wraps, outdoor branding, indoor branding, and more.",
    accentColor: '#006aff'
  },
];

// 🛑 MISSING DATA ARRAY 3: STUDIO TOOLS
const STUDIO_TOOLS = [
  { name: 'Adobe AE', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Adobe_After_Effects_CC_icon.svg/2101px-Adobe_After_Effects_CC_icon.svg.png' },
  { name: 'Adobe AI', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Adobe_Illustrator_CC_icon.svg/2048px-Adobe_Illustrator_CC_icon.svg.png' },
  { name: 'Adobe PS', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/500px-Adobe_Photoshop_CC_icon.svg.png' },
  { name: 'Adobe PR', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Adobe_Premiere_Pro_CC_icon.svg/1051px-Adobe_Premiere_Pro_CC_icon.svg.png' },
  { name: 'Blender', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Blender_logo_no_text.svg/2503px-Blender_logo_no_text.svg.png' },
  { name: 'Figma', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1365px-Figma-logo.svg.png' },
  { name: 'Framer', icon: 'https://framerusercontent.com/assets/MadJ73ykiBPmXMK5j0iTVYDPACI.png' },
  { name: 'Node JS', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png' },
  { name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' },
  { name: 'WebFlow', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Webflow_logo_2023.svg' },
  { name: 'Python', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png' },
];


const AkaarMediaLogoShape = ({ size = 100, color = "currentColor" }) => {
// ... (Logo SVG code remains the same)
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 1080 1080" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        fill={color} 
        d="M1058.1,1036h0v-386.26h-386.27c0,213.33,172.94,386.26,386.26,386.26Z"
      />
      <polygon 
        fill={color} 
        points="21.89 800.42 21.89 1036.03 257.63 1036.03 1058.11 279.58 1058.11 43.97 822.5 43.97 21.89 800.42"
      />
    </svg>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const [currentProgress, setCurrentProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

// ... (Effect and Scroll Transformation logic remains the same) ...

  // Track progress for logging and debugging
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setCurrentProgress(latest);
      // console.log("Scroll Progress:", latest.toFixed(2));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Height of the sticky section, increased for better content pacing
  // 1500vh / 100 = 15x viewport height. Let's make it 3000vh for 3 content screens.
  const SECTION_2_HEIGHT = "3000vh";
  
  // --- Scroll Ranges Optimization ---
  // The scroll input (0 to 1) needs to be mapped to the content phases.
  // 0.00 - 0.10: Hero section exit (transition)
  // 0.10 - 0.20: Logo grows to full screen (Phase A)
  // 0.20 - 0.90: Content phases (Phase B)
  // 0.90 - 1.00: Exit animation

  // Phase A: Logo Growth
  // 0.10 (start growing) to 0.20 (full screen)
  const logoScale = useTransform(scrollYProgress, [0.08, 0.15, 0.20], [0.1, 0.6, 1.2]); // Controlled scale for visibility
  const logoOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.20, 0.22], [0, 1, 1, 0]); // Fade out after content starts

  // Phase B: Content Stagger (Dark Theme: #0f0f0f)
  // New, wider ranges for better pacing:
  const contentStart = 0.25;
  const contentPacing = 0.20; // 20% scroll distance per content section
  
  // Content 1: Story (Appears at 0.25, Fades out at 0.40)
  const contentOpacity1 = useTransform(scrollYProgress, 
    [contentStart, contentStart + 0.05, contentStart + contentPacing, contentStart + contentPacing + 0.05], 
    [0, 1, 1, 0]
  );
  
  // Content 2: Mission (Appears at 0.45, Fades out at 0.60)
  const contentOpacity2 = useTransform(scrollYProgress, 
    [contentStart + contentPacing, contentStart + contentPacing + 0.05, contentStart + (contentPacing * 2), contentStart + (contentPacing * 2) + 0.05], 
    [0, 1, 1, 0]
  );
  
  // Content 3: Vision (Appears at 0.65, Fades out at 0.80)
  const contentOpacity3 = useTransform(scrollYProgress, 
    [contentStart + (contentPacing * 2), contentStart + (contentPacing * 2) + 0.05, contentStart + (contentPacing * 3), contentStart + (contentPacing * 3) + 0.05], 
    [0, 1, 1, 0]
  );

  // Exit transition background color
  const bgColorProgress = useTransform(scrollYProgress, [0.85, 0.95], ["#0f0f0f", "#0f0f0f"]);


  const contentData = [
    {
      heading: "Our Story",
      icon: Sparkles,
      text: "Akaar Media began with one simple belief. Design isn’t decoration it’s communication. Today, we are a multidisciplinary team delivering branding, digital experiences, motion design, and marketing solutions to clients across industries.",
      opacity: contentOpacity1
    },
    {
      heading: "Our Mission",
      icon: Target,
      text: "To help brands communicate clearly through design, strategy, and technology.",
      opacity: contentOpacity2
    },
    {
      heading: "Our Vision",
      icon: Eye,
      text: "To be a trusted creative partner for modern businesses — delivering work that feels fresh, intentional, and unforgettable.",
      opacity: contentOpacity3
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      
      {/* ===== SECTION 1: HERO (Dark Theme) ===== */}
      <motion.section className="h-screen w-full flex flex-col items-center justify-center bg-[#0f0f0f] relative">
        <div className="text-center z-10 px-4 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-[#006aff] tracking-wide mb-2 sm:mb-4 uppercase"
          >
            About
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight"
          >
            Akaar Media
          </motion.h2>
          <motion.h3 className="text-gray-400 mt-12 text-md flex flex-col ">
            <span>A modern creative and digital agency </span> <span> built for brands that want clarity, impact, and growth.</span>
          </motion.h3>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" strokeWidth={1.5} />
        </motion.div>
      </motion.section>

      {/* ===== SECTION 2: STICKY SCROLL NARRATIVE (FIXED) ===== */}
      <motion.section
        data-nav-theme="dark" // Keep navigation theme dark
        style={{ backgroundColor: bgColorProgress, height: SECTION_2_HEIGHT }}
        className="relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#0f0f0f] px-4 sm:px-0">
          
          {/* Phase A: Growing Logo */}
          <motion.div
            style={{
              scale: logoScale,
              opacity: logoOpacity, // Fade out the logo when content starts
              position: "absolute",
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
              zIndex: 30,
            }}
          >
           <AkaarMediaLogoShape 
              size={1000}
              color="white" // Ensure logo is white on dark background
            />
          </motion.div>

          {/* Phase B: Narrative Content (Content is now centered and fully dark themed) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6 sm:p-12"
          >
            {/* Content Area - Centered and max-width added for responsiveness */}
            <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
              
              {contentData.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={idx}
                    style={{ opacity: section.opacity }}
                    // Position all content absolutely in the center
                    className="absolute inset-0 flex items-center justify-center text-center"
                  >
                    <div className="w-full max-w-2xl px-4">
                      {/* Icon and Heading */}
                      <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#006aff] flex-shrink-0 mb-4" strokeWidth={1.5} />
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tighter">
                          {section.heading}
                        </h3>
                      </div>

                      {/* Paragraph */}
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 font-light leading-relaxed max-w-xl mx-auto">
                        {section.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ===== STATIC SECTIONS START HERE ===== */}
      
      {/* ===== STATIC SECTION: CORE TEAMS (Existing Content) ===== */}
     <motion.section   className="w-full min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center py-24 sm:py-32">
        
      <motion.div 
          className="max-w-7xl w-full mx-auto p-8 md:p-16 lg:p-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants} 
      >
          
          {/* 1. MAIN HEADER */}
          <motion.h2 
              className="text-5xl sm:text-6xl lg:text-8xl font-light tracking-tighter mb-4 text-[#006aff] leading-tight" 
              variants={itemVariants} 
          >
              OUR TEAM
          </motion.h2>

          {/* 2. SUBTITLE */}
          <motion.p 
              className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl font-light leading-relaxed"
              variants={itemVariants}
          >
              A Team Built for Modern Brands
          </motion.p>

          {/* 3. CONTENT GRID */}
          <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16"
              variants={containerVariants}
          >
              
              {/* A. Web Development Team */}
              <motion.div 
                  className="p-6 border-l-4 border-[#006aff]/50 transition duration-300 hover:border-[#006aff] rounded-md"
                  variants={itemVariants}
              >
                  <h3 className="text-2xl sm:text-3xl font-normal mb-4 tracking-tight text-white"> 
                      Web Development Team
                  </h3>
                  <p className="text-gray-400 mb-6 text-base sm:text-lg font-light">
                      Front-end and back-end specialists building fast, secure, scalable digital platforms using:
                  </p>
                  <ul className="space-y-2 text-lg">
                      <li className="font-mono text-gray-200 font-light text-sm sm:text-base">
                          <span className="text-[#006aff] mr-2">/</span>React, Next.js
                      </li>
                      <li className="font-mono text-gray-200 font-light text-sm sm:text-base">
                          <span className="text-[#006aff] mr-2">/</span>Node.js, Python
                      </li>
                      <li className="font-mono text-gray-200 font-light text-sm sm:text-base">
                          <span className="text-[#006aff] mr-2">/</span>Modern JS libraries
                      </li>
                  </ul>
              </motion.div>

              {/* B. Creative Design Team */}
              <motion.div 
                  className="p-6 border-l-4 border-[#006aff]/50 transition duration-300 hover:border-[#006aff] rounded-md"
                  variants={itemVariants}
              >
                  <h3 className="text-2xl sm:text-3xl font-normal mb-4 tracking-tight text-white"> 
                      Creative Design Team
                  </h3>
                  <p className="text-gray-400 mb-6 text-base sm:text-lg font-light">
                      Designers specializing in:
                  </p>
                  <ul className="space-y-2 text-lg">
                      <li className="text-gray-200 font-light text-sm sm:text-base">
                          <span className="text-[#006aff] mr-2">&bull;</span>UI/UX
                      </li>
                      <li className="text-gray-200 font-light text-sm sm:text-base">
                          <span className="text-[#006aff] mr-2">&bull;</span>Brand Identity
                      </li>
                      <li className="text-gray-200 font-light text-sm sm:text-base">
                          <span className="text-[#006aff] mr-2">&bull;</span>Graphic Design
                      </li>
                      <li className="text-gray-200 font-light text-sm sm:text-base">
                          <span className="text-[#006aff] mr-2">&bull;</span>Motion Design, 3D Visualization
                      </li>
                  </ul>
              </motion.div>

          </motion.div>
      </motion.div>
    </motion.section>
    
    {/* ===== STATIC SECTION: SUPPORT SYSTEM (New Content) ===== */}
    <motion.section className="w-full bg-[#0f0f0f] text-white flex justify-center py-20 sm:py-28 border-t border-gray-800">
        <motion.div 
            className="max-w-7xl w-full mx-auto p-8 md:p-16 lg:p-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants} 
        >
            
            {/* Main Header */}
            <motion.h2 
                className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter mb-4 text-white leading-tight" 
                variants={itemVariants} 
            >
                OUR SUPPORT SYSTEM
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-16 max-w-4xl font-light leading-relaxed"
                variants={itemVariants}
            >
                Specialized teams dedicated to quality, communication, and execution.
            </motion.p>

            {/* Support Team Grid */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
            >
                {SUPPORT_TEAM.map((team, index) => {
                    const Icon = team.icon;
                    return (
                        <motion.div 
                            key={index}
                            className="p-6 bg-[#1a1a1a] rounded-xl border border-[#1a1a1a] transition duration-300 hover:border-[#006aff] flex flex-col justify-start h-full"
                            variants={itemVariants}
                        >
                            <Icon className="w-6 h-6 text-[#006aff] mb-4" strokeWidth={2} />
                            
                            <h3 className="text-xl sm:text-2xl font-normal mb-3 tracking-tight text-white leading-snug"> 
                                {team.name}
                            </h3>
                            
                            <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
                                {team.description}
                            </p>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    </motion.section>


     {/* ===== STATIC SECTION: TOOLS & TECH (Logo Carousel) ===== */}
     <motion.section className="pt-8 bg-[#0f0f0f] pb-16">
                <h2 className="text-center text-3xl text-gray-200 font-light mb-8">
                    Our Core Toolkit
                </h2>
                {/* 2. Render the carousel and pass the data via the 'logos' prop */}
                <LogoCarousel logos={STUDIO_TOOLS} />
            </motion.section>
      
    {/* ===== STATIC SECTION: CAPABILITIES ===== */}
     <motion.section className="w-full bg-[#0a0a0a] text-white flex justify-center py-20 sm:py-28">
        <motion.div 
            className="max-w-7xl w-full mx-auto p-8 md:p-16 lg:p-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants} 
        >
            
            {/* Main Header */}
            <motion.h2 
                className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter mb-4 text-white leading-tight" 
                variants={itemVariants} 
            >
                OUR CAPABILITIES
            </motion.h2>

            {/* Subtitle/Lead-in */}
            <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-16 max-w-4xl font-light leading-relaxed border-l-4 pl-6"
                style={{ borderColor: '#006aff' }}
                variants={itemVariants}
            >
                We offer a complete suite of services engineered for **corporate success** and **digital dominance**.
            </motion.p>

            {/* Capabilities List */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10"
                variants={containerVariants}
            >
                {CAPABILITIES_LIST.map((capability, index) => (
                    <motion.div 
                        key={index}
                        className="flex flex-col border-b border-gray-800 pb-5 transition duration-300 hover:border-[#006aff]"
                        variants={itemVariants}
                    >
                        <h3 className="text-2xl sm:text-3xl font-normal mb-2 tracking-tighter text-white leading-snug"> 
                            {capability.title}
                        </h3>
                        
                        <p className="text-gray-400 text-base font-light leading-relaxed">
                            {capability.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </motion.section>

    {/* ===== STATIC SECTION: CORE VALUES ===== */}
    <motion.section className="w-full bg-[#0a0a0a] text-white flex justify-center py-20 sm:py-28 border-t border-gray-800">
        <motion.div 
            className="max-w-7xl w-full mx-auto p-8 md:p-16 lg:p-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants} 
        >
            
            {/* Main Header */}
            <motion.h2 
                className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tighter mb-4 text-white leading-tight" 
                variants={itemVariants} 
            >
                OUR CORE VALUES
            </motion.h2>

            {/* Subtitle/Lead-in */}
            <motion.p 
                className="text-lg sm:text-xl lg:text-2xl text-gray-400 mb-16 max-w-4xl font-light leading-relaxed border-l-4 pl-6"
                style={{ borderColor: '#006aff' }}
                variants={itemVariants}
            >
                The principles that guide our work, define our commitment, and ensure your project’s success.
            </motion.p>

            {/* Core Values Grid */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
            >
                {CORE_VALUES_LIST_WITH_ICONS.map((value, index) => (
                    <motion.div 
                        key={index}
                        // Card styling: dark background, subtle border, sleek hover effect
                        className="p-8 bg-[#0f0f0f] rounded-xl border border-gray-800 transition duration-300 hover:border-[#006aff] hover:shadow-2xl hover:shadow-[#006aff]/10 flex flex-col justify-start h-full"
                        variants={itemVariants}
                        transition={{ duration: 0.5, delay: index * 0.1 }} 
                    >
                        {/* ICON PLACEHOLDER (Using the index number as you did) */}
                        <div className="w-8 h-8 text-[#006aff] mb-4 flex items-center justify-center border border-gray-700 rounded-lg">
                            <span className="text-sm font-semibold">
                                {index + 1}
                            </span>
                        </div>

                        {/* Value Title - Large and impactful */}
                        <h3 className="text-3xl font-semibold mb-4 tracking-tight text-white leading-snug"> 
                            {value.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-400 text-base font-light leading-relaxed">
                            {value.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    </motion.section>
      
    </div>
  );
}