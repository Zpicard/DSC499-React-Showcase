import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LandingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          pt: 8, // Add padding top to account for fixed navbar
        }}
      >
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 20px rgba(100, 255, 218, 0.3)`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100px',
              height: '4px',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
            }
          }}
        >
          Instacart Market Basket Analysis
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: theme.palette.text.secondary,
            maxWidth: '800px',
            mx: 'auto',
            opacity: 0.8,
          }}
        >
          Exploring patterns in 3 million grocery orders
        </Typography>
      </Box>
    </Container>
  );
};

export default LandingPage; 