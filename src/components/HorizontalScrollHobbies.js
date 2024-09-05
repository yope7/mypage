import React, { useRef } from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';

const HobbiesContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
});

const HobbiesTrack = styled(animated.div)({
  display: 'flex',
  height: '100%',
});

const HobbyCard = styled(Box)({
  flex: '0 0 100%',
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

const HorizontalScrollHobbies = ({ hobbies }) => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const containerRef = useRef(null);

  const bind = useDrag(({ active, movement: [mx], direction: [xDir], cancel }) => {
    if (active && Math.abs(mx) > 50) {
      const moveIndex = xDir > 0 ? -1 : 1;
      const newIndex = Math.min(Math.max(0, -Math.round(x.get() / window.innerWidth) + moveIndex), hobbies.length - 1);
      api.start({ x: -newIndex * window.innerWidth, immediate: false });
      cancel();
    }
  }, { axis: 'x', filterTaps: true, rubberband: true });

  return (
    <HobbiesContainer ref={containerRef}>
      <HobbiesTrack {...bind()} style={{ x }}>
        {hobbies.map((hobby, index) => (
          <HobbyCard key={index}>
            <HobbyImage src={hobby.image} alt={hobby.name} />
            <Typography variant="h4" gutterBottom>{hobby.name}</Typography>
            <Typography variant="body1">{hobby.description}</Typography>
          </HobbyCard>
        ))}
      </HobbiesTrack>
    </HobbiesContainer>
  );
};

export default HorizontalScrollHobbies;