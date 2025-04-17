import React from 'react';
import { Box, keyframes, useTheme } from '@mui/material';

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GradientAnimation: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(-45deg, 
          ${theme.palette.primary.dark} 0%,
          ${theme.palette.primary.main} 25%,
          ${theme.palette.primary.light} 50%,
          ${theme.palette.secondary.main} 75%,
          ${theme.palette.secondary.dark} 100%
        )`,
        backgroundSize: '400% 400%',
        animation: `${gradientShift} 15s ease infinite`,
        opacity: 0.8,
        zIndex: 0,
      }}
    />
  );
};

export default GradientAnimation; 