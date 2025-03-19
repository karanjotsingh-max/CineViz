import React, { useState, useEffect } from 'react';
import headingImage from '../images/headingImage.png';

// Import all images for each column
import t1 from '../images/t1.png';
import t2 from '../images/t2.png';
import t3 from '../images/t3.png';
import k1 from '../images/k1.png';
import k2 from '../images/k2.png';
import k3 from '../images/k3.png';
import s1 from '../images/s1.png';
import s2 from '../images/s2.png';
import s3 from '../images/s3.png';

// Reusable component for fading image slideshow with fixed container size
function FadingImage({ images, width, height }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out
      setFade(false);
      // After fade-out, update the image index and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500); // 500ms fade duration (adjust as needed)
    }, 6000); // change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div style={{ width, height, overflow: 'hidden' }}>
      <img
        src={images[currentIndex]}
        alt="slideshow"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
    </div>
  );
}

function HomePage() {
  return (
    <div style={{
      backgroundColor: '#141414',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {/* Main content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px 0'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            marginRight: '10px',
            color: '#e01c2c'
          }}>
            Welcome to
          </h1>
          <img 
            src={headingImage} 
            alt="CineViz Logo" 
            style={{
              height: '4.5rem',
              width: 'auto'
            }}
          />
        </div>
        <p style={{
          fontSize: '1.5rem',
          margin: '10px 0'
        }}>
          Explore insights about Movies, TV series, and Anime trends in the entertainment industry.
        </p>
        <p style={{
          fontSize: '1.5rem',
          margin: '10px 0'
        }}>
          Use the navigation menu to browse through different categories.
        </p>
      </div>

{/* Bottom images with fade transitions */}
<div style={{
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '100%',
  marginTop: '0px', // space above the images
  marginBottom: '0px' // reduce this value to decrease the bottom margin
}}>
  <FadingImage images={[t1, t2, t3]} width="200px" height="50px" />
  <FadingImage images={[k1, k2, k3]} width="200px" height="50px" />
  <FadingImage images={[s1, s2, s3]} width="200px" height="50px" />
</div>

    </div>
  );
}

export default HomePage;
