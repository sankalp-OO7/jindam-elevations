import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Building2,
  MapPin,
  Calendar,
  Award,
  Sparkles,
  ChevronRight,
  Grid3x3,
  List,
  X,
} from "lucide-react";

// Project data with Nanded locations and local images
const projects = [
  {
    id: 1,
    title: "Pradipta Interprises",
    category: "ACP Solutions",
    location: "Vazirabad, Nanded",
    image: "/projects/1.webp",
    description:
      "Premium ACP cladding for 5-story commercial building with modern architectural design",
    year: "2024",
    area: "25,000 sq.ft",
    client: "Sai Developers",
    tags: ["Commercial", "ACP", "Modern Design"],
  },
  {
    id: 2,
    title: "Hotel Manju Palace",
    category: "Glass Glazing",
    location: "Shivaji Nagar, Nanded",
    image: "/projects/2.webp",
    description:
      "Full facade glass glazing with energy-efficient panels and thermal insulation",
    year: "2023",
    area: "40,000 sq.ft",
    client: "Royal Constructions",
    tags: ["Residential", "Glass", "Luxury"],
  },
  {
    id: 3,
    title: "Aromas Veg Biryani",
    category: "Exterior Composite",
    location: "MIDC Area, Nanded",
    image: "/projects/3.webp",
    description:
      "Complete exterior transformation with composite panels and weather-resistant finish",
    year: "2024",
    area: "30,000 sq.ft",
    client: "Tech Solutions Pvt Ltd",
    tags: ["Corporate", "Composite", "Sustainable"],
  },
  {
    id: 4,
    title: "Niramay Bal Rugnalay",
    category: "ACP Solutions",
    location: "Taroda Road, Nanded",
    image: "/projects/4.webp",
    description:
      "Contemporary ACP design with custom color finishes and LED integration",
    year: "2023",
    area: "50,000 sq.ft",
    client: "City Mall Group",
    tags: ["Retail", "ACP", "Contemporary"],
  },
  {
    id: 5,
    title: "Raj Line",
    category: "Custom Solutions",
    location: "Station Road, Nanded",
    image: "/projects/5.webp",
    description:
      "Bespoke exterior design with mixed materials and architectural lighting",
    year: "2022",
    area: "35,000 sq.ft",
    client: "Grand Hospitality",
    tags: ["Hospitality", "Custom", "Premium"],
  },
  {
    id: 6,
    title: "Gajanan Hospital",
    category: "Glass Glazing",
    location: "Vishnupuri, Nanded",
    image: "/projects/6.webp",
    description:
      "Modern glazing system for enhanced natural lighting and energy efficiency",
    year: "2024",
    area: "45,000 sq.ft",
    client: "Vidya Educational Trust",
    tags: ["Education", "Glazing", "Eco-Friendly"],
  },
];

const categories = [
  "All Projects",
  "ACP Solutions",
  "Glass Glazing",
  "Exterior Composite",
  "Custom Solutions",
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProjects =
    activeCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Animation Variants
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.03,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  };

  const imageHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.15,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const overlayVariants = {
    rest: { opacity: 0.6 },
    hover: {
      opacity: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  const textRevealVariants = {
    rest: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.3,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.05, 0.03, 0.05],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      {/* Hero Section with Parallax */}

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px), repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      {/* Animated Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="rgb(248, 250, 252)"
          />
        </motion.svg>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Filter Section with View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-12"
        >
          {/* View Mode Toggle */}
          <div className="flex justify-end mb-6">
            <div className="inline-flex items-center gap-2 p-1 bg-white rounded-lg shadow-md border border-slate-200">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-all ${
                  viewMode === "list"
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-900/30"
                    : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <motion.span
                  initial={false}
                  animate={{
                    scale: activeCategory === cat ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {cat}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                : "space-y-6"
            }
          >
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer ${
                  viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <motion.div variants={cardHoverVariants}>
                  {/* Image Container */}
                  <div
                    className={`relative overflow-hidden ${
                      viewMode === "list"
                        ? "sm:w-1/3 h-64 sm:h-auto"
                        : "h-64 sm:h-72"
                    }`}
                  >
                    <motion.img
                      variants={imageHoverVariants}
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Animated Overlay */}
                    <motion.div
                      variants={overlayVariants}
                      className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"
                    />

                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="absolute top-4 left-4 z-10"
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium"
                      >
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                        {project.category}
                      </motion.span>
                    </motion.div>

                    {/* Year Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="absolute top-4 right-4 z-10"
                    >
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium"
                      >
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {project.year}
                      </motion.span>
                    </motion.div>

                    {/* Hover Overlay Content */}
                    <motion.div
                      variants={textRevealVariants}
                      className="absolute inset-0 flex items-center justify-center z-20"
                    >
                      <div className="text-center text-white space-y-2">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 360, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center"
                        >
                          <ChevronRight className="w-8 h-8" />
                        </motion.div>
                        <div className="text-sm font-medium">View Details</div>
                      </div>
                    </motion.div>

                    {/* Bottom Info on Image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white z-10">
                      <motion.h3
                        className="text-lg sm:text-xl font-bold mb-2 line-clamp-2"
                        whileHover={{ x: 4 }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 mb-2"
                      >
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                        {project.location}
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div
                    className={`p-4 sm:p-6 ${
                      viewMode === "list"
                        ? "sm:w-2/3 flex flex-col justify-between"
                        : ""
                    }`}
                  >
                    <div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 text-sm mb-4 line-clamp-2"
                      >
                        {project.description}
                      </motion.p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIdx) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + tagIdx * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="text-xs sm:text-sm text-slate-500">
                        <span className="font-semibold text-slate-700">
                          {project.area}
                        </span>
                      </div>
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex items-center gap-1 text-slate-900 font-medium text-xs sm:text-sm"
                      >
                        Explore
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header Image */}
              <div className="relative h-64 sm:h-96 overflow-hidden rounded-t-3xl">
                <motion.img
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                  >
                    {selectedProject.title}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center gap-2 text-slate-200"
                  >
                    <MapPin className="w-4 h-4" />
                    {selectedProject.location}
                  </motion.div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-6 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl"
                >
                  <div>
                    <div className="text-xs sm:text-sm text-slate-600 mb-1">
                      Category
                    </div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">
                      {selectedProject.category}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-slate-600 mb-1">
                      Year
                    </div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">
                      {selectedProject.year}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-slate-600 mb-1">
                      Area
                    </div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">
                      {selectedProject.area}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm text-slate-600 mb-1">
                      Client
                    </div>
                    <div className="font-semibold text-slate-900 text-sm sm:text-base">
                      {selectedProject.client}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Project Overview
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, idx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-full text-sm font-medium shadow-lg"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">
                        Quality Craftsmanship
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        This project showcases our commitment to excellence in
                        exterior design solutions. Every detail was carefully
                        planned and executed to ensure the highest standards of
                        quality, durability, and aesthetic appeal.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mt-16 sm:mt-24 pb-16 sm:pb-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Testimonial/Quote Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 sm:p-12 md:p-16 text-white"
          >
            {/* Animated Background Pattern */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)",
              }}
            />

            <div className="relative z-10 text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full mb-6 shadow-2xl"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight"
              >
                "At Jindam Elevations, we don't just build exteriors,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  we craft impressions
                </span>
                "
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400" />
                <div className="text-slate-400 font-medium">
                  Vinay Vyankatesh Jindam
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12"
          >
            {[
              {
                icon: Building2,
                value: "500+",
                label: "Projects Completed",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Calendar,
                value: "10+",
                label: "Years Experience",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Award,
                value: "100%",
                label: "Client Satisfaction",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Sparkles,
                value: "24/7",
                label: "Support Available",
                color: "from-orange-500 to-red-500",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + idx * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color}`}
                  />

                  <div className="relative z-10">
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${stat.color} rounded-xl mb-4 shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.4 + idx * 0.1,
                      }}
                      className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2"
                    >
                      {stat.value}
                    </motion.div>

                    <div className="text-sm sm:text-base text-slate-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Timeline Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 sm:mt-24"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4"
              >
                Our Journey of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Excellence
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-slate-600 max-w-2xl mx-auto text-lg"
              >
                Over a decade of transforming architectural visions into reality
                across Nanded
              </motion.p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-500 rounded-full" />

              <div className="space-y-12">
                {[
                  {
                    year: "2013",
                    title: "Foundation",
                    description:
                      "Jindam Elevations was established with a vision to transform building exteriors",
                  },
                  {
                    year: "2016",
                    title: "Expansion",
                    description:
                      "Expanded services to include advanced glass glazing solutions",
                  },
                  {
                    year: "2019",
                    title: "Innovation",
                    description:
                      "Introduced cutting-edge composite paneling technologies",
                  },
                  {
                    year: "2024",
                    title: "Leadership",
                    description:
                      "Recognized as Nanded's premier exterior design specialist",
                  },
                ].map((milestone, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className={`flex items-center gap-8 ${
                      idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col md:flex-row`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`flex-1 ${
                        idx % 2 === 0 ? "md:text-right" : "md:text-left"
                      } text-center md:text-left`}
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-slate-600">
                          {milestone.description}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 flex-shrink-0"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-2xl border-4 border-white">
                        <motion.span
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {milestone.year.slice(-2)}
                        </motion.span>
                      </div>
                    </motion.div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Closing Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 sm:mt-24 text-center"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Every Project Tells a Story
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              From concept to completion, we pour our expertise, passion, and
              dedication into every square foot. These projects represent more
              than just buildings—they're landmarks of trust, quality, and
              innovation throughout Nanded.
            </p>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3,
              }}
              className="flex items-center justify-center gap-2 mt-8"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
