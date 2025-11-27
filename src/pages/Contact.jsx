import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Instagram, Linkedin, Youtube, Send, ArrowRight } from 'lucide-react';

// --- Framer Motion Variants (Reusing your theme) ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 12,
        },
    },
};

// --- Contact Form Input Component (Unchanged) ---
const TextInput = ({ label, id, type = 'text', required = true, isTextArea = false }) => {
    const InputComponent = isTextArea ? 'textarea' : 'input';
    return (
        <motion.div className="mb-6" variants={itemVariants}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2">
                {label} {required ? '' : '(Optional)'}
            </label>
            <InputComponent
                id={id}
                name={id}
                type={type}
                required={required ? 'required' : undefined}
                rows={isTextArea ? 5 : undefined}
                className={`
                    w-full px-4 py-3 bg-[#1a1a1a] border border-gray-700 rounded-lg 
                    text-white text-base font-light placeholder-gray-500 
                    transition duration-300 focus:border-[#006aff] focus:ring-1 focus:ring-[#006aff]
                    ${isTextArea ? 'resize-y' : ''}
                `}
                placeholder={label}
            />
        </motion.div>
    );
};


// --- Main Contact Component ---
const Contact = () => {
  return (
    <motion.div 
        className="min-h-screen bg-[#0a0a0a] text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
    >
        {/* 1. Header Section */}
        <div className="pt-32 pb-16 px-8 max-w-7xl mx-auto">
            <motion.h1
                className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter mb-4 text-[#006aff] leading-tight"
                variants={itemVariants}
            >
                Let’s Build Something Exceptional
            </motion.h1>
            <motion.p
                className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-4xl font-light leading-relaxed"
                variants={itemVariants}
            >
                Tell us about your idea, brand, or project. Our team will guide you from concept to completion with clarity, creativity, and professionalism.
            </motion.p>
        </div>

        {/* 2. Main Content Grid (Form + Info) */}
        <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            
            {/* Left Column: Contact Form */}
            <div className="lg:col-span-2">
                <motion.h2 
                    className="text-3xl font-light text-white mb-8 border-b border-gray-800 pb-4"
                    variants={itemVariants}
                >
                    Project Inquiry
                </motion.h2>
                
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInput label="Full Name" id="name" required />
                        <TextInput label="Email Address" id="email" type="email" required />
                    </div>
                    <TextInput label="Company" id="company" required={false} />
                    <TextInput label="Project Details / Message" id="message" isTextArea required />

                    {/* Submit Button - MODIFIED FOR MINIMAL WIPE EFFECT */}
                    <motion.button
                        type="submit"
                        className="
                            relative w-full sm:w-auto mt-6 px-8 py-3 overflow-hidden
                            font-medium rounded-lg border border-white/50 text-white
                            transition-colors duration-500 cursor-pointer group
                            flex items-center justify-center
                        "
                        variants={itemVariants}
                    >
                        {/* The before pseudo-element creates the blue wipe effect */}
                        <span aria-hidden="true" className="
                            absolute inset-0 w-full h-full bg-[#006aff] 
                            transform translate-y-full transition-transform ease-in-out duration-500
                            group-hover:translate-y-0
                        "></span>

                        {/* Text and Icon container to stay on top */}
                        <span className="
                            relative z-10 transition-colors duration-500
                            flex items-center
                        ">
                            <Send className="w-5 h-5 mr-2" strokeWidth={2} />
                            Send Message
                        </span>
                    </motion.button>
                </form>

                {/* Form Note */}
                <motion.p className="text-sm text-gray-500 mt-6" variants={itemVariants}>
                    We typically respond within **24 hours**. For urgent queries, please contact us directly via email.
                </motion.p>
            </div>

            {/* Right Column: Direct Contact Info & Socials (Unchanged) */}
            <div className="lg:col-span-1">
                <motion.h2 
                    className="text-3xl font-light text-white mb-8 border-b border-gray-800 pb-4"
                    variants={itemVariants}
                >
                    Contact Details
                </motion.h2>

                {/* 3. Direct Contact Info */}
                <div className="space-y-6 mb-12">
                    <motion.div className="flex items-start" variants={itemVariants}>
                        <Mail className="w-5 h-5 text-[#006aff] mt-1 mr-4 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-400">Email</p>
                            <a href="mailto:contact@akaarmedia.com" className="text-lg text-white font-light hover:text-[#006aff] transition-colors">
                                contact@akaarmedia.com
                            </a>
                        </div>
                    </motion.div>

                    <motion.div className="flex items-start" variants={itemVariants}>
                        <MapPin className="w-5 h-5 text-[#006aff] mt-1 mr-4 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-400">Location</p>
                            <p className="text-lg text-white font-light">
                                Riyadh, Saudi Arabia
                            </p>
                        </div>
                    </motion.div>

                    <motion.div className="flex items-start" variants={itemVariants}>
                        <Clock className="w-5 h-5 text-[#006aff] mt-1 mr-4 flex-shrink-0" />
                        <div>
                            <p className="text-sm text-gray-400">Business Hours</p>
                            <p className="text-lg text-white font-light">
                                10 AM – 7 PM (Mon–Sat)
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* 4. Social Links */}
                <motion.h2 
                    className="text-3xl font-light text-white mb-6 border-b border-gray-800 pb-4"
                    variants={itemVariants}
                >
                    Follow Us
                </motion.h2>

                <motion.div className="flex space-x-6" variants={itemVariants}>
                    <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-[#006aff] transition-colors">
                        <Instagram className="w-6 h-6" />
                    </a>
                    <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-[#006aff] transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </a>
                    <a href="#" aria-label="YouTube" className="text-gray-500 hover:text-[#006aff] transition-colors">
                        <Youtube className="w-6 h-6" />
                    </a>
                </motion.div>
            </div>
        </div>

        {/* 5. Mini CTA Footer */}
        <motion.div 
            className="mt-16 py-12 bg-[#1a1a1a] border-t border-gray-800"
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
                <motion.p className="text-2xl font-light text-white mb-4 md:mb-0" variants={itemVariants}>
                    Ready to start your project? Let’s talk.
                </motion.p>
                <motion.a 
    href="#form" 
    className="
        relative px-8 py-3 overflow-hidden
        font-medium rounded-lg border border-white/50 text-white
        transition-colors duration-500 cursor-pointer group
        flex items-center justify-center
    "
    // Removed whileHover, whileTap, and transform animations
    variants={itemVariants} 
>
    {/* Blue Wipe Effect */}
    <span aria-hidden="true" className="
        absolute inset-0 w-full h-full bg-[#006aff] 
        transform translate-y-full transition-transform ease-in-out duration-500
        group-hover:translate-y-0
    "></span>

    {/* Content Layer */}
    <span className="
        relative z-10 transition-colors duration-500
        flex items-center text-base font-medium
    ">
        Get Personalized Quote
        <ArrowRight className="w-4 h-4 ml-2" />
    </span>
</motion.a>
            </div>
        </motion.div>

    </motion.div>
  );
};

export default Contact;