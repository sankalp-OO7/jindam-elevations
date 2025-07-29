"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// Animated text component for letter-by-letter animation
const AnimatedText = ({ text, className, delay = 0 }) => {
  const letters = text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block"
          whileHover={{
            scale: 1.05,
            color: "#2563eb",
            transition: { duration: 0.3 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 3D Card component with hover effects
const Card3D = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    
    setMousePosition({ x: rotateY, y: rotateX });
  };

  return (
    <motion.div
      ref={ref}
      className={`transform-gpu perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovered ? mousePosition.y : 0,
        rotateY: isHovered ? mousePosition.x : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className="relative"
        animate={{
          z: isHovered ? 30 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Floating particles component
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 12;
  const particles = Array.from({ length: particleCount }, (_, i) => i);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            y: [null, -100, null],
            x: [null, Math.random() * 100 - 50, null],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Owner Portrait Component
const OwnerPortrait = () => (
  <motion.div
    className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    {/* Avatar placeholder with professional styling */}
    <motion.div
      className="w-full h-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.div
        className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        VJ
      </motion.div>
    </motion.div>
    
    {/* Glowing ring effect */}
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-blue-400/30"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
);

// Experience Timeline Component
const ExperienceStats = () => {
  const stats = [
    { number: "10+", label: "Years Experience", icon: "🏆" },
    { number: "500+", label: "Projects Completed", icon: "🏢" },
    { number: "100%", label: "Client Satisfaction", icon: "⭐" },
    { number: "24/7", label: "Support Available", icon: "🔧" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
        >
          <motion.div
            className="text-2xl mb-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
          >
            {stat.icon}
          </motion.div>
          <motion.div
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 10, 
              delay: 1.5 + index * 0.2 
            }}
          >
            {stat.number}
          </motion.div>
          <div className="text-xs sm:text-sm text-gray-600 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Expertise Areas Component
const ExpertiseAreas = () => {
  const expertise = [
    { title: "ACP Solutions", desc: "Premium Aluminium Composite Paneling", color: "from-blue-500 to-cyan-500" },
    { title: "Glass Glazing", desc: "Modern glazing systems & facades", color: "from-green-500 to-emerald-500" },
    { title: "Exterior Design", desc: "Complete facade transformation", color: "from-purple-500 to-pink-500" },
    { title: "Custom Solutions", desc: "Tailored architectural finishes", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8">
      {expertise.map((item, index) => (
        <motion.div
          key={item.title}
          className="relative p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-lg overflow-hidden group"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 2 + index * 0.2 }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 15px 35px -5px rgba(0, 0, 0, 0.1)"
          }}
        >
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />
          <motion.div
            className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs font-semibold rounded-full mb-3`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 2.2 + index * 0.2 }}
          >
            {item.title}
          </motion.div>
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -20]);
  const y2 = useTransform(scrollY, [0, 300], [0, -40]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
  };

  return (
    <motion.section
      ref={containerRef}
      id="about"
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: isMobile ? 
          `linear-gradient(135deg, #fef7ed 0%, #fed7aa 25%, #fdba74 50%, #fb923c 75%, #f97316 100%)` :
          `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
          rgba(251, 146, 60, 0.08) 0%, 
          rgba(249, 115, 22, 0.05) 25%, 
          rgba(234, 88, 12, 0.03) 50%, 
          transparent 70%),
          linear-gradient(135deg, 
          #fef7ed 0%, 
          #fed7aa 25%, 
          #fdba74 50%, 
          #fb923c 75%, 
          #f97316 100%)`,
      }}
    >
      {/* Animated Background Elements */}
      <FloatingParticles />
      
      {/* Geometric shapes in background - hidden on mobile for performance */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute top-20 right-20 w-24 h-24 border-2 border-orange-200/40 rounded-lg rotate-45"
            animate={{
              rotate: [45, 135, 45],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ y: y1 }}
          />
          
          <motion.div
            className="absolute bottom-32 left-32 w-16 h-16 bg-gradient-to-r from-red-100/60 to-orange-100/60 rounded-full backdrop-blur-sm"
            animate={{
              x: [-10, 10, -10],
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ y: y2 }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/60 rounded-full text-sm font-medium text-orange-700 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
            About Jindam Elevations
          </motion.div>

          <AnimatedText
            text="Meet Our Founder"
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-800 via-orange-700 to-red-800 mb-4 leading-tight"
            delay={0.5}
          />
          
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: "8rem" } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* Left Column - Owner Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card3D>
              <div className="text-center lg:text-left">
                <OwnerPortrait />
                
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.5 }}
                >
                  <AnimatedText
                    text="Vinay Vyankatesh Jindam"
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 mb-2"
                    delay={1.8}
                  />
                  
                  <motion.p
                    className="text-lg sm:text-xl text-orange-600 font-semibold mb-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 2.5 }}
                  >
                    Founder & Owner
                  </motion.p>
                  
                  <motion.div
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-full text-sm font-medium text-green-700"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, delay: 2.8 }}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    Leading Since 2013
                  </motion.div>
                </motion.div>
              </div>
            </Card3D>

            {/* Experience Stats */}
            <ExperienceStats />
          </motion.div>

          {/* Right Column - Company Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card3D>
              <motion.div
                className="p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-xl"
                whileHover={!isMobile ? {
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  borderColor: "rgba(249, 115, 22, 0.3)",
                } : {}}
              >
                <motion.h3
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Our Story
                </motion.h3>
                
                <motion.div
                  className="space-y-4 text-gray-700 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <p className="text-sm sm:text-base lg:text-lg">
                    <strong className="text-orange-600">Jindam Elevations</strong> is a trusted name in exterior design solutions, specializing in <strong className="text-blue-600">Aluminium Composite Paneling (ACP)</strong>, <strong className="text-indigo-600">Exterior Composite Paneling</strong>, and <strong className="text-purple-600">Glass Glazing</strong>. With over a decade of hands-on experience, we help bring architectural visions to life by enhancing the exteriors of commercial and residential buildings with precision, durability, and style.
                  </p>
                  
                  <p className="text-sm sm:text-base lg:text-lg">
                    Our expertise lies in transforming building facades using high-quality ACP sheets, offering modern aesthetics along with long-lasting protection. We collaborate closely with architects, engineers, builders, and business owners to deliver custom exterior finishes for new shops, buildings, and commercial complexes.
                  </p>
                  
                  <motion.div
                    className="relative p-4 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 rounded-r-lg mt-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 italic">
                      "At Jindam Elevations, we don't just build exteriors, we craft impressions"
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Card3D>

            {/* Expertise Areas */}
            <ExpertiseAreas />
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <motion.p
            className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 3.3 }}
          >
            Ready to transform your building's exterior? Let's create something extraordinary together.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 3.6 }}
          >
            <motion.button
              className="relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl overflow-hidden group shadow-lg"
              whileHover={!isMobile ? { 
                scale: 1.05,
                boxShadow: "0 20px 40px -12px rgba(249, 115, 22, 0.4)"
              } : {}}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10 flex items-center justify-center">
                <span>Get Started Today</span>
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 group"
              whileHover={!isMobile ? { 
                scale: 1.05,
                borderColor: "#ea580c",
                color: "#c2410c",
                backgroundColor: "#fff7ed"
              } : {
                borderColor: "#ea580c",
                color: "#c2410c",
                backgroundColor: "#fff7ed"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center justify-center">
                Contact Us
                <motion.span
                  className="ml-2 transform group-hover:rotate-90 transition-transform duration-300"
                >
                  ✦
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}