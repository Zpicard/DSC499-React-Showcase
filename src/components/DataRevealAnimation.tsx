import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, alpha } from '@mui/material';

const dataSnippets = [
  {
    label: 'Most Popular Items',
    data: ['Bananas: 92%', 'Strawberries: 87%', 'Yogurt: 85%', 'Apples: 82%']
  },
  {
    label: 'Peak Shopping Hours',
    data: ['2-4 PM: 35%', '4-6 PM: 28%', '10-12 PM: 22%']
  },
  {
    label: 'Common Pairs',
    data: ['Milk + Cereal', 'Bread + Eggs', 'Coffee + Cream']
  },
  {
    label: 'Reorder Rate',
    data: ['Weekly: 45%', 'Biweekly: 30%', 'Monthly: 25%']
  }
];

const DataRevealAnimation: React.FC = () => {
  const theme = useTheme();
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const revealInterval = setInterval(() => {
      if (isRevealing) {
        setVisibleItems(prev => {
          if (prev.length < dataSnippets[currentSnippet].data.length) {
            return [...prev, prev.length];
          }
          setIsRevealing(false);
          return prev;
        });
      } else {
        setVisibleItems([]);
        setCurrentSnippet((prev) => (prev + 1) % dataSnippets.length);
        setIsRevealing(true);
      }
    }, isRevealing ? 800 : 2000);

    return () => clearInterval(revealInterval);
  }, [currentSnippet, isRevealing]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.dark, 0.97)} 0%, 
          ${alpha(theme.palette.primary.main, 0.95)} 100%
        )`,
        color: 'white',
        fontFamily: "'Fira Code', monospace",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: theme.palette.primary.light,
          textAlign: 'center',
          opacity: 0.9,
        }}
      >
        {dataSnippets[currentSnippet].label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'flex-start',
          minHeight: '200px',
          position: 'relative',
        }}
      >
        {dataSnippets[currentSnippet].data.map((item, index) => (
          <Typography
            key={index}
            variant="h6"
            sx={{
              fontFamily: "'Fira Code', monospace",
              opacity: visibleItems.includes(index) ? 1 : 0,
              transform: visibleItems.includes(index) ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'all 0.5s ease',
              color: alpha(theme.palette.common.white, 0.9),
              display: 'flex',
              alignItems: 'center',
              '&::before': {
                content: '">>"',
                color: theme.palette.primary.light,
                marginRight: 2,
                opacity: 0.7,
              }
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default DataRevealAnimation; 