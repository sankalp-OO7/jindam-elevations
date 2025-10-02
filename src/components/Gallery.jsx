"use client"; // This component must run on the client due to state, effects, and framer-motion

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight, Download } from "lucide-react";

// Define the 8 images as requested: 1.webp to 8.webp, with titles.
const galleryImages = [
  { id: 1, src: "/gallery/1.webp", title: "Modern Facade Design" },
  { id: 2, src: "/gallery/2.webp", title: "Sleek Glass Glazing" },
  { id: 3, src: "/gallery/3.webp", title: "Composite Panel Work" },
  { id: 4, src: "/gallery/4.webp", title: "Detailed ACP Cladding" },
  { id: 5, src: "/gallery/5.webp", title: "Premium Residential Finish" },
  { id: 6, src: "/gallery/6.webp", title: "Commercial Entryway" },
  { id: 7, src: "/gallery/7.webp", title: "Innovative Structure" },
  { id: 8, src: "/gallery/8.webp", title: "Architectural Excellence" },
  { id: 9, src: "/gallery/9.webp", title: "High-Rise Balcony Railing" },
  { id: 10, src: "/gallery/10.webp", title: "Intricate Window Framing" },
  { id: 11, src: "/gallery/11.webp", title: "Industrial Warehouse Exterior" },
  { id: 12, src: "/gallery/12.webp", title: "Bespoke Office Partition" },
  { id: 13, src: "/gallery/13.webp", title: "Custom Sunshade Louvers" }, // New addition
  { id: 14, src: "/gallery/14.webp", title: "Perforated Metal Screens" }, // New addition
  { id: 15, src: "/gallery/15.webp", title: "Modern Hospital Cladding" }, // New addition
  { id: 16, src: "/gallery/16.webp", title: "Interior Glass Wall System" }, // New addition
];
// --- Framer Motion Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.8, y: 20 },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// --- Gallery Item Component with Hover Effect ---
const GalleryItem = ({ image, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer aspect-[4/6]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(image)}
    >
      {/* Image Container with Parallax Hover */}
      <motion.div
        className="w-full h-full"
        style={{
          perspective: 1000,
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            // Tilt the image slightly on hover for a pseudo-3D parallax effect
            rotateX: isHovered ? "2deg" : "0deg",
            rotateY: isHovered ? "2deg" : "0deg",
          }}
        />
      </motion.div>

      {/* Overlay for Title and Zoom Icon */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
        <motion.h3
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white text-lg font-bold drop-shadow-md"
        >
          {image.title}
        </motion.h3>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full text-white"
        >
          <ZoomIn className="w-5 h-5" />
        </motion.div>
      </div>

      {/* Sweet Border Effect */}
      <div className="absolute inset-0 rounded-xl pointer-events-none border-4 border-transparent group-hover:border-blue-500 transition-all duration-300"></div>
    </motion.div>
  );
};

// --- Main Gallery Component ---
export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Helper function to find the index of the selected image
  const getIndex = (image) =>
    galleryImages.findIndex((img) => img.id === image.id);

  // Navigation handlers
  const goToNext = () => {
    const currentIndex = getIndex(selectedImage);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[nextIndex]);
  };

  const goToPrev = () => {
    const currentIndex = getIndex(selectedImage);
    const prevIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[prevIndex]);
  };

  // Keyboard navigation for modal
  React.useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") goToNext();
      if (event.key === "ArrowLeft") goToPrev();
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-slate-900 tracking-tight"
        >
          Our <span className="text-blue-600">Project Gallery</span> ✨
        </motion.h2>

        {/* Image Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {galleryImages.map((image) => (
            <GalleryItem
              key={image.id}
              image={image}
              onClick={setSelectedImage}
            />
          ))}
        </motion.div>
      </div>

      {/* --- Full-Screen Modal Viewer --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image area
              className="relative max-w-5xl w-full h-full max-h-[90vh] flex flex-col items-center justify-center"
            >
              {/* Modal Image */}
              <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage.id} // Key ensures re-animation on navigation
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={selectedImage.src}
                    alt={selectedImage.title}
                    className="object-contain max-w-full max-h-full"
                    style={{
                      width: "auto", // Override fixed size to respect aspect ratio
                      height: "auto",
                    }}
                  />
                </AnimatePresence>

                {/* Image Title */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-center">
                  <h3 className="text-white text-xl font-semibold">
                    {selectedImage.title}
                  </h3>
                </div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors"
                  aria-label="Close Gallery"
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Download Button */}
                <a
                  href={selectedImage.src}
                  download
                  onClick={(e) => e.stopPropagation()} // Prevent modal close
                  className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-colors"
                  aria-label="Download Image"
                >
                  <Download className="w-5 h-5" />
                </a>

                {/* Navigation Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors hidden sm:flex"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors hidden sm:flex"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// How to integrate this into your CareerPage.jsx
// export default function CareerPage() {
//   return (
//     <main>
//       {/* ... existing CareerPage content ... */}
//       <GalleryPage /> // <-- Add the gallery here
//       {/* ... existing CareerPage content ... */}
//     </main>
//   );
// }
