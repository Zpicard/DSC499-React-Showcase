import React from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { keyframes } from '@mui/system';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';

// Define floating animations
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const float2 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(-5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const float3 = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-25px) rotate(3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const FloatingElements: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Floating Analytics Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          opacity: 0.15,
          animation: `${float} 6s ease-in-out infinite`,
          color: theme.palette.primary.light,
        }}
      >
        <AnalyticsIcon sx={{ fontSize: 60 }} />
      </Box>

      {/* Floating Trending Up Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '15%',
          opacity: 0.12,
          animation: `${float2} 7s ease-in-out infinite`,
          color: theme.palette.primary.main,
        }}
      >
        <TrendingUpIcon sx={{ fontSize: 50 }} />
      </Box>

      {/* Floating Bar Chart Icon */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '20%',
          opacity: 0.1,
          animation: `${float3} 8s ease-in-out infinite`,
          color: theme.palette.primary.dark,
        }}
      >
        <BarChartIcon sx={{ fontSize: 45 }} />
      </Box>

      {/* Floating Pie Chart Icon */}
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '25%',
          opacity: 0.08,
          animation: `${float} 9s ease-in-out infinite`,
          color: theme.palette.primary.light,
        }}
      >
        <PieChartIcon sx={{ fontSize: 40 }} />
      </Box>

      {/* Floating Timeline Icon */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '10%',
          opacity: 0.15,
          animation: `${float2} 7.5s ease-in-out infinite`,
          color: theme.palette.primary.main,
        }}
      >
        <TimelineIcon sx={{ fontSize: 55 }} />
      </Box>
    </Box>
  );
};

export default FloatingElements; 