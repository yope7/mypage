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
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        const containerTop = rect.top;
        const containerHeight = rect.height;
        const viewportHeight = window.innerHeight;

        // コンテナが画面に入った時点からスクロール開始
        if (containerTop <= 0 && containerTop > -containerHeight) {
          const progress = -containerTop / containerHeight;
          setScrollPosition(Math.min(1, progress));
        } else if (containerTop > 0) {
          setScrollPosition(0);
        } else {
          setScrollPosition(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hobbies.length]);

  const totalWidth = hobbies.length * 50; // 各カードの幅が50%なので
  const scrollWidth = totalWidth - 100; // 100%は初期表示の2つのカード分

  return (
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
  );
};

export default ScrollControlledHobbies;