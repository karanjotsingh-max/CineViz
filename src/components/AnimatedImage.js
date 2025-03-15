import React, { useState, useEffect } from 'react';
// Import your images (replace these with your actual image paths)
import image1 from '../images/image1.webp';
import image2 from '../images/image2.webp';
import image3 from '../images/image3.webp';
import image4 from '../images/image4.webp';
import image5 from '../images/image5.webp';
import image6 from '../images/image6.webp';
import image7 from '../images/image7.webp';
import image8 from '../images/image8.webp';
import image9 from '../images/image9.webp';
import image10 from '../images/image10.webp';
import image11 from '../images/image11.webp';



// import image3 from './image3.webp';

function AnimatedImages() {
  // Array of images to cycle through
  const images = [image1, image2, image3, image5,image6, image4, image7,image8,image9,image10,image11];
  // current index in the images array
  const [index, setIndex] = useState(0);
  // visible flag controls opacity for fade effect
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer;
    if (visible) {
      // Display the current image for 2 seconds, then start fade-out
      timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
    } else {
      // Once faded out, wait 5 seconds, switch to the next image and fade in
      timer = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setVisible(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [visible, index, images.length]);

  return (
    <img 
      src={images[index]} 
      alt={`Animated ${index}`} 
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover', // Ensures the image covers the container even if its size varies
        display: 'block',
        opacity: visible ? 1 : 0,  // Smoothly fade in/out
        transition: 'opacity 1s ease',
        // Apply a composite CSS mask to fade out the top edge and top corners:
        maskImage: `
          radial-gradient(circle at top left, transparent 0%, black 20%),
          radial-gradient(circle at top right, transparent 0%, black 20%),
          linear-gradient(to bottom, transparent 0%, black 25%, black 20%)
        `,
        WebkitMaskImage: `
          radial-gradient(circle at top left, transparent 0%, black 20%),
          radial-gradient(circle at top right, transparent 0%, black 20%),
          linear-gradient(to bottom, transparent 0%, black 5%, black 100%)
        `,
        maskComposite: 'intersect',
        WebkitMaskComposite: 'destination-in'
      }}
    />
  );
}

export default AnimatedImages;
