import React from 'react';
import { Box, keyframes, useTheme, alpha } from '@mui/material';

const shift = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }
  50% {
    transform: translateX(-20px) translateY(-20px);
  }
  100% {
    transform: translateX(0) translateY(0);
  }
`;

const PatternAnimation: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Base gradient background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, 
            ${alpha(theme.palette.primary.dark, 0.95)} 0%, 
            ${alpha(theme.palette.primary.main, 0.90)} 50%,
            ${alpha(theme.palette.secondary.dark, 0.85)} 100%
          )`,
          zIndex: 0,
        }}
      />
      
      {/* Animated pattern overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          left: -50,
          right: -50,
          bottom: -50,
          opacity: 0.4,
          background: `
            linear-gradient(90deg, ${alpha(theme.palette.common.white, 0.1)} 1px, transparent 1px) 0 0 / 20px 20px,
            linear-gradient(0deg, ${alpha(theme.palette.common.white, 0.1)} 1px, transparent 1px) 0 0 / 20px 20px,
            radial-gradient(circle, ${alpha(theme.palette.primary.light, 0.2)} 2px, transparent 2px) 0 0 / 40px 40px
          `,
          animation: `${shift} 20s ease-in-out infinite`,
          zIndex: 1,
        }}
      />

      {/* Additional floating elements */}
      {[...Array(3)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: alpha(theme.palette.primary.light, 0.1),
            filter: 'blur(40px)',
            animation: `${shift} ${15 + index * 5}s ease-in-out infinite`,
            top: `${20 + index * 30}%`,
            left: `${10 + index * 25}%`,
            zIndex: 1,
          }}
        />
      ))}
    </Box>
  );
};

export default PatternAnimation; 