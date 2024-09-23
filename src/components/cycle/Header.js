// components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  background: 'transparent',
  boxShadow: 'none',
});

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            野口祥生のポートフォリオ
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;

