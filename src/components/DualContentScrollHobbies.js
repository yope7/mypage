import React, { useRef, useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const HobbiesContainer = styled(Box)({
  position: 'sticky',
  top: 0,
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
});

const HobbiesTrack = styled(Box)({
  display: 'flex',
  height: '100%',
  transition: 'transform 0.1s linear',
});

const HobbyCard = styled(Box)({
  flex: '0 0 50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  boxSizing: 'border-box',
});

const HobbyImage = styled('img')({
  width: '60%',
  height: 'auto',
  marginBottom: '20px',
});

const ScrollControlledHobbies = ({ hobbies }) => {
  const containerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (e) => {
      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;

      if (containerTop <= 0 && containerTop > -containerHeight) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          document.body.style.overflow = 'hidden';
        }

        const progress = -containerTop / containerHeight;
        scrollPositionRef.current = Math.min(1, Math.max(0, progress));
        container.style.setProperty('--scroll-progress', scrollPositionRef.current);
      } else {
        if (isScrollingRef.current) {
          isScrollingRef.current = false;
          document.body.style.overflow = '';
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hobbies.length]);



  const totalWidth = hobbies.length * 50; // 各カードの幅が50%なので
  const scrollWidth = totalWidth - 100; // 100%は初期表示の2つのカード分

  return (
    <div ref={containerRef} className="scroll-controlled-hobbies">a
 
    <Box style={{ height: `${200}vh` }}>
      <HobbiesContainer ref={containerRef}>
        <HobbiesTrack style={{ transform: `translateX(${-scrollPosition * scrollWidth}%)` }}>
          {hobbies.map((hobby, index) => (
            <HobbyCard key={index}>
              <HobbyImage src={hobby.image} alt={hobby.name} />
              <Typography variant="h4" gutterBottom>{hobby.name}</Typography>
              <Typography variant="body1">{hobby.description}</Typography>
            </HobbyCard>
          ))}
        </HobbiesTrack>
      </HobbiesContainer>
    </Box>
    </div>
  );
};

export default ScrollControlledHobbies;