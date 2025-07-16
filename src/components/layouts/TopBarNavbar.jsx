import React from 'react';
import { motion } from 'framer-motion';

const TopBarNavbar = () => {
  const announcements = [
    "🎓 KASNEB",
    "🔥 KCSE PAST PAPERS",
    "📚 LESSON NOTES",
    "🌟 SCHEMES ",
    "🏆 CURRICULUM DESIGNS",
    "🏆 ASSESSMENTS",
    "🏆 LESSON PLANS",
    "🏆 RECORDS OF WORK",
  ];

  // Duplicate items for seamless looping
  const duplicatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-2 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ['0%', '-100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedAnnouncements.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center mx-8 text-white font-medium text-sm"
            >
              <span className="mr-2">•</span>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-blue-600 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-indigo-700 to-transparent z-10"></div>
    </div>
  );
};

export default TopBarNavbar;