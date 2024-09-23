import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import Header from './Header';
import Content from './Content';
import bikeImage from '../../img/bike.png';

const theme = createTheme({
  palette: {
    background: {
      default: '#1a1a1a',
    },
  },
});

const GradientBackground = styled('div')({
  width: '100vw',
  height: '100vh',
  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(26,26,26,1) 70%)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

const Folio = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GradientBackground />
      <Header />
      <Content bikeImage={bikeImage} />
    </ThemeProvider>
  );
};

export default Folio;

