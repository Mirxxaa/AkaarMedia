import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Zap, Palette, Code, Target, Video, Printer, Search, Lightbulb,  Shield, Send, Users, Briefcase, CheckCircle, Clock,  Layers, Globe, Package} from "lucide-react";


// Reusing your existing variants for a consistent effect
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
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
            damping: 15,
            duration: 0.6
        },
    },
};

// --- DATA ---
const SERVICE_CATEGORIES = [
    {
        title: "Branding & Identity",
        icon: Palette,
        description: [
            "We build visual identities that tell your story and set you apart.",
            "Logos, complete brand systems, packaging, guidelines, marketing materials — everything your brand needs to look consistent and professional."
        ],
        image: "https://images.unsplash.com/photo-1633533452148-a9657d2c9a5f?q=80&w=3731&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "UI/UX Design",
        icon: Zap,
        description: [
            "From wireframes to polished interfaces — we create digital experiences that feel intuitive, clean, and conversion-focused.",
            "Built using Figma & Framer for seamless collaboration and execution."
        ],
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Web Development",
        icon: Code,
        description: [
            "High-performance websites engineered for speed, stability, and scalability.",
            "We develop using the latest technologies: React, Next.js, Node.js, Python, JavaScript, Webflow, and custom solutions tailored to your business."
        ],
        image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Digital Marketing",
        icon: Target,
        description: [
            "Grow your brand with effective strategies and performance-driven campaigns.",
            "Meta Ads, Google Ads, content creation, funnel optimization, analytics, and complete digital presence management."
        ],
        image: "https://images.unsplash.com/photo-1686061593269-420785fb8fa0?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Graphic & Motion Design",
        icon: Video,
        description: [
            "From everyday social content to high-quality animated visuals — we design media that grabs attention and communicates fast.",
            "Brand visuals, illustrations, motion graphics, reels, explainer videos, and 3D animations."
        ],
        image: "https://images.unsplash.com/photo-1666728451779-85c0bc53d2ef?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title: "Print & Production",
        icon: Printer,
        description: [
            "Premium print and production services for brands that want to make an impact offline.",
            "Signage, packaging, wall wraps, indoor & outdoor branding, brochures, display stands, and more — backed by strict QC and delivery standards."
        ],
        image: "https://images.unsplash.com/photo-1663433567177-9f94be0bff4c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
];

const PROCESS_STEPS = [
    {
        title: "Discovery",
        icon: Search,
        description: "We deep-dive into your brand, audience, and goals to build a clear project scope and strategy roadmap."
    },
    {
        title: "Concept & Strategy",
        icon: Lightbulb,
        description: "Developing core creative concepts, wireframes, mood boards, and the technical architecture for approval."
    },
    {
        title: "Design & Development",
        icon: Code,
        description: "The core build phase: executing UI/UX design, front-end coding, backend engineering, or brand asset creation."
    },
    {
        title: "Review & Quality Control",
        icon: Shield,
        description: "Rigorously testing the product, proofreading all content, and applying final pixel-perfect adjustments."
    },
    {
        title: "Delivery & Support",
        icon: Send,
        description: "Launch, deployment, full handover of assets/code, and post-launch technical support and maintenance."
    },
];
const REASONS = [
    {
        title: "Integrated In-House Team",
        description: "A cohesive unit of developers, designers, animators, and writers working under one roof for seamless execution.",
        icon: Users,
    },
    {
        title: "Dedicated Management",
        description: "Your project is overseen by a dedicated relationship manager, ensuring transparent communication and smooth coordination.",
        icon: Briefcase,
    },
    {
        title: "Rigorously Vetted Quality",
        description: "An integrated proofreading and review pipeline ensures every deliverable is polished, accurate, and pixel-perfect.",
        icon: CheckCircle,
    },
    {
        title: "Efficiency & Fast Delivery",
        description: "Our optimized process and skilled team allow us to meet ambitious deadlines without compromising quality.",
        icon: Clock,
    },
    {
        title: "Modern Tech Stack",
        description: "We utilize the latest frameworks (Next.js, React, Figma, etc.) to build fast, scalable, and future-proof solutions.",
        icon: Zap,
    },
    {
        title: "End-to-End Solutions",
        description: "Comprehensive service offering, covering everything from initial brand strategy to final marketing and print production.",
        icon: Layers,
    },
    {
        title: "Diverse Experience",
        description: "Proven multi-industry experience means we understand diverse market demands and can tailor strategies for specific sectors.",
        icon: Globe,
    },
    {
        title: "Unified Service Pipeline",
        description: "Solutions that link brand, web, marketing, and print for a completely unified, high-impact presence.",
        icon: Package,
    },
];

// --- SECTION 2 IMPLEMENTATION: Smooth Scroll-Triggered Text Reveal (FIXED FOR MOBILE SCROLLING) ---
const ScrollTextRevealSection = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const totalCategories = SERVICE_CATEGORIES.length;

    // Separate array for image-only layers
    const imageLayers = SERVICE_CATEGORIES.map((service, index) => {
        const startRange = index / totalCategories;
        const endRange = (index + 1) / totalCategories;
        
        const fadeStart = startRange + 0.05;
        const fadeEnd = endRange - 0.05;
        
        const opacity = useTransform(
            scrollYProgress,
            [startRange, fadeStart, fadeEnd, endRange],
            [0, 1, 1, 0]
        );

        return (
            <motion.img
                key={`bg-${index}`}
                style={{ opacity }}
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
        );
    });

    // Array for text layers
    const textLayers = SERVICE_CATEGORIES.map((service, index) => {
        const Icon = service.icon;
        
        const startRange = index / totalCategories;
        const endRange = (index + 1) / totalCategories;
        
        const fadeStart = startRange + 0.02;
        const fadeEnd = endRange - 0.02;
        
        const opacity = useTransform(
            scrollYProgress,
            [startRange, fadeStart, fadeEnd, endRange],
            [0, 1, 1, 0]
        );

        const y = useTransform(
            scrollYProgress, 
            [startRange, fadeStart, fadeEnd, endRange], 
            [15, 0, 0, -15]
        );

        return (
            <motion.div
                key={service.title}
                className="absolute inset-y-0 left-0 w-full max-w-4xl flex items-center p-8 sm:p-12 md:p-16 lg:p-20 z-20"
            >
                <motion.div
                    style={{ opacity, y }}
                    className="max-w-xl"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0 mt-1">
                            <Icon className="w-8 h-8 text-[#006aff]" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                            {service.title}
                        </h3>
                    </div>
                    
                    <div className="space-y-4 mt-8 border-l border-[#006aff]/50 pl-6">
                        {service.description.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-base sm:text-lg md:text-xl text-gray-200 font-light leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <motion.button // Changed to motion.button to allow Framer Motion props
                        className="mt-10 px-6 py-3 bg-[#006aff] text-white text-base font-medium rounded transition-all duration-300 hover:bg-white hover:text-[#006aff] shadow-lg hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log(`Learn More about ${service.title}`)}
                    >
                        Learn More
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    });

    return (
        // FIXED: Using style to dynamically set height ensures it works on mobile
        <div ref={sectionRef} style={{ height: `${totalCategories * 100}vh` }} className="relative">
            {/* FIXED: Added w-full to the sticky container for mobile stability */}
            <div className="sticky top-0 h-screen w-full bg-[#0f0f0f] overflow-hidden">
                
                {/* 1. Background Image Layers (fades in/out) */}
                <div className="absolute inset-0 z-0">
                    {imageLayers}
                </div>

                {/* 2. Black Gradient Overlay (z-10) */}
                <div 
                    className="absolute inset-0 z-10"
                    style={{ 
                        background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.0) 80%, rgba(0,0,0,0) 100%)'
                    }}
                ></div>

                {/* 3. Text Layers (fades in/out, z-20) */}
                <div className="relative z-20 w-full h-full">
                    {textLayers}
                </div>
            </div>
        </div>
    );
};

// --- MAIN SERVICES COMPONENT ---
export default function Services() {
  
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      
      {/* =========================================
          SECTION 1: HERO
      ========================================= */}
      <motion.section className="h-screen w-full flex flex-col items-center justify-center relative z-30">
        <div className="text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-xs sm:text-sm md:text-base font-light text-[#006aff] tracking-[0.2em] mb-6 uppercase"
          >
            Our Services
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter leading-[1.1] mb-8"
          >
            Solutions designed to <br className="hidden md:block" /> grow your brand.
          </motion.h2>

          <motion.h3 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 0.4 }}
             className="text-gray-400 text-lg sm:text-xl md:text-2xl font-light max-w-3xl leading-relaxed"
          >
            We combine design, development, strategy, and production to deliver seamless end-to-end brand experiences.
          </motion.h3>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-[#006aff]" strokeWidth={1.5} />
        </motion.div>
      </motion.section>

      {/* =========================================
          SECTION 2: SCROLL-REVEAL TEXT CAROUSEL
      ========================================= */}
      <ScrollTextRevealSection />

      {/* =========================================
          SECTION 3: HOW WE WORK (Next Step)
      ========================================= */}
<motion.section 
            className="w-full min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center py-24 sm:py-32"
        >
            <motion.div 
                className="max-w-7xl w-full mx-auto p-8 md:p-16 lg:p-24"
                initial="hidden" 
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants} 
            >
                
                <motion.h2 
                    className="text-5xl sm:text-6xl lg:text-8xl font-light tracking-tighter mb-4 text-[#006aff] leading-tight" 
                    variants={itemVariants} 
                >
                    HOW WE WORK
                </motion.h2>

                <motion.p 
                    className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-20 max-w-4xl font-light leading-relaxed"
                    variants={itemVariants}
                >
                    A clean, five-step process designed for clarity, efficiency, and impactful results.
                </motion.p>

                <div className="relative">
                    
                    <div className="absolute left-[20px] top-0 h-full w-[2px] bg-gray-800 lg:left-1/2 lg:transform lg:-translate-x-1/2"></div>

                    {PROCESS_STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const stepNumber = index + 1;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, amount: 0.4 }}
                                variants={itemVariants}
                                className={`flex mb-20 relative w-full ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}
                            >
                                
                                <div className={`
                                    absolute left-[12px] top-0 
                                    lg:absolute lg:left-1/2 lg:top-0 lg:transform lg:-translate-x-1/2 
                                    flex items-center justify-center 
                                    w-8 h-8 lg:w-12 lg:h-12 
                                    rounded-full bg-[#0f0f0f] border-2 border-[#006aff] z-10 
                                `}>
                                    <Icon className="w-4 h-4 text-[#006aff] lg:w-5 lg:h-5" strokeWidth={2} /> 
                                </div>
                                
                                <div className={`
                                    max-w-full pl-16 
                                    lg:w-[45%] lg:max-w-[45%] lg:pl-0 
                                    lg:order-1 
                                `}>
                                    <div className={`
                                        ${!isEven ? 'lg:pl-10 lg:text-right' : ''}
                                        ${isEven ? 'lg:pr-10 lg:text-left' : ''}
                                    `}>
                                        <h3 className="text-3xl font-normal mb-3 tracking-tight text-white leading-snug">
                                            {stepNumber}. {step.title} 
                                        </h3>
                                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.section>

        {/* Why Choose us  */}
                    <motion.section 
            className="w-full min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center py-24 sm:py-32"
        >
            <motion.div 
                className="max-w-7xl w-full mx-auto p-8 md:p-16 lg:p-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants} 
            >
                
                <motion.h2 
                    className="text-5xl sm:text-6xl lg:text-8xl font-light tracking-tighter mb-4 text-white leading-tight" 
                    variants={itemVariants} 
                >
                    <span className="text-[#006aff]">OUR</span> EDGE
                </motion.h2>

                <motion.p 
                    className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-16 max-w-4xl font-light leading-relaxed border-l-4 border-gray-800 pl-6"
                    variants={itemVariants}
                >
                    What sets us apart is our commitment to integrated excellence and uncompromised quality.
                </motion.p>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    variants={containerVariants}
                >
                    {REASONS.map((reason, index) => {
                        const Icon = reason.icon;
                        return (
                            <motion.div 
                                key={index}
                                className="p-6 bg-[#0f0f0f] rounded-xl border border-gray-800 transition duration-300 hover:border-[#006aff] hover:shadow-xl hover:shadow-[#006aff]/10 flex flex-col justify-start h-full"
                                variants={itemVariants}
                            >
                                <div className="flex items-center mb-4">
                                    <Icon className="w-6 h-6 text-[#006aff] mr-3 flex-shrink-0" strokeWidth={1.5} />
                                    <h3 className="text-xl font-normal tracking-tight text-white leading-snug"> 
                                        {reason.title}
                                    </h3>
                                </div>
                                
                                <p className="text-gray-400 text-sm font-light leading-relaxed mt-2">
                                    {reason.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </motion.section>
    </div>
  );
}