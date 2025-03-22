import React, { useState, useEffect, useRef } from 'react';
import headingImage from '../images/headingImage.png';
import centerVideo from '../images/titlevideo.mp4';

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
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500); // 500ms fade duration
    }, 6000); // change image every 6 seconds

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
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

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
        {/* TV Frame Container with sound toggle */}
        <div style={{
          position: 'relative', // Added for positioning the button
          backgroundColor: '#000',
          padding: '20px', // Simulates the TV bezel
          borderRadius: '15px',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)',
          marginBottom: '20px',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            style={{ width: '100%', height: '530px', display: 'block' }}
          >
            <source src={centerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Sound toggle button positioned at the bottom right */}
          <button
            onClick={toggleSound}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              border: 'none',
              backgroundColor: '#e01c2c',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>

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
          Explore insights about movies, TV series, and anime in the industry.
        </p>
        <p style={{
          fontSize: '1.5rem',
          margin: '10px 0'
        }}>
          Use the navigation menu to browse analytics.
        </p>
      </div>

      {/* Bottom images with fade transitions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        marginTop: '0px',
        marginBottom: '0px'
      }}>
        <FadingImage images={[t1, t2, t3]} width="200px" height="50px" />
        <FadingImage images={[k1, k2, k3]} width="200px" height="50px" />
        <FadingImage images={[s1, s2, s3]} width="200px" height="50px" />
      </div>
    </div>
  );
}

export default HomePage;
