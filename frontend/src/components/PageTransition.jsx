import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  // To create a "book flip" effect, we set the origin to the left edge (like the spine of a book)
  // The page starts flipped up (90 degrees), flips down to 0, and then flips back to -90 on exit.
  
  const variants = {
    initial: {
      rotateY: 90,
      opacity: 0,
      filter: 'blur(10px)',
    },
    animate: {
      rotateY: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
      }
    },
    exit: {
      rotateY: -90,
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.6,
        ease: [0.7, 0, 0.84, 0],
      }
    }
  };

  return (
    <div style={{
      perspective: '2000px', // Adds depth to the 3D flip
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <motion.div 
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ 
          width: '100%', 
          flexGrow: 1, 
          transformOrigin: 'left center', // This makes it flip like a book from the left edge
          backfaceVisibility: 'hidden'
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;
