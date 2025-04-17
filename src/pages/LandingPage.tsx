import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  useTheme,
  alpha,
  keyframes,
} from '@mui/material';
import { Element, Link as ScrollLink } from 'react-scroll';
import { useSpring, animated } from '@react-spring/web';
import NetworkAnimation from '../components/NetworkAnimation';
import { useNavigate } from 'react-router-dom';

// Define the blink animation
const blink = {
  '0%': { opacity: 1 },
  '50%': { opacity: 0 },
  '100%': { opacity: 1 },
};

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [displayedText, setDisplayedText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const navigate = useNavigate();

  // Typing animation effect
  useEffect(() => {
    const texts = [
      "Analyzing customer purchase patterns...",
      "Identifying product associations...",
      "Calculating reorder probabilities...",
      "Generating personalized recommendations..."
    ];
    let currentIndex = 0;
    let currentTextIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentText = texts[currentTextIndex];
      
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, currentIndex - 1));
        currentIndex--;
        typingSpeed = 50;
      } else {
        setDisplayedText(currentText.substring(0, currentIndex + 1));
        currentIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && currentIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        typingSpeed = 500; // Pause before starting next text
      }

      setTimeout(type, typingSpeed);
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animation */}
      <NetworkAnimation />

      {/* Hero Section */}
      <Element name="overview">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 8,
              width: '100%',
              position: 'relative',
              minHeight: '80vh',
            }}>
              <Box sx={{ 
                flex: 1,
                maxWidth: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100%',
                position: 'relative',
                zIndex: 2,
              }}>
                <Box sx={{ mb: 6 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      mb: 3,
                      fontFamily: "'Montserrat', sans-serif",
                      color: theme.palette.primary.main,
                      textShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
                      letterSpacing: '0.5px',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '4px',
                        background: theme.palette.primary.main,
                        borderRadius: '2px',
                      },
                    }}
                  >
                    Instacart Behavioral Forecasting
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { xs: '1.5rem', md: '2rem' },
                      fontWeight: 500,
                      color: alpha(theme.palette.common.white, 0.9),
                      fontFamily: "'Montserrat', sans-serif",
                      letterSpacing: '0.3px',
                      lineHeight: 1.4,
                    }}
                  >
                    A machine learning approach to understanding consumer purchase behavior on Instacart
                  </Typography>
                </Box>
                <Button
                  component={ScrollLink}
                  to="features"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    fontFamily: "'Montserrat', sans-serif",
                    background: theme.palette.primary.main,
                    boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.4)}`,
                    alignSelf: 'flex-start',
                    '&:hover': {
                      background: theme.palette.primary.dark,
                      boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.5)}`,
                    },
                  }}
                >
                  Explore Analysis
                </Button>
              </Box>
              <Box 
                sx={{ 
                  flex: 1, 
                  maxWidth: '50%',
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 1,
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    background: alpha('#0A1929', 0.7),
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha('#0A1929', 0.3)}`,
                    boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`,
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: '450px',
                    width: '100%',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '30px',
                      background: alpha('#0A1929', 0.8),
                      borderBottom: `1px solid ${alpha('#0A1929', 0.3)}`,
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '10px',
                      left: '15px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: theme.palette.error.main,
                      boxShadow: '20px 0 0 #ffbd2e, 40px 0 0 #27c93f',
                    }
                  }}
                >
                  <Box
                    sx={{
                      fontFamily: "'Fira Code', monospace",
                      fontSize: '1.2rem',
                      color: theme.palette.common.white,
                      mt: 4,
                      pl: 1,
                      position: 'relative',
                      '&::before': {
                        content: '">"',
                        position: 'absolute',
                        left: -15,
                        color: '#64B5F6',
                      }
                    }}
                  >
                    <span style={{ color: '#64B5F6' }}>{displayedText}</span>
                    <Box 
                      component="span"
                      sx={{ 
                        display: 'inline-block',
                        width: '10px',
                        height: '20px',
                        background: '#64B5F6',
                        marginLeft: '2px',
                        animation: `${blink} 1s step-end infinite`,
                      }}
                    />
                  </Box>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>
      </Element>

      {/* Navy Blue Section */}
      <Element name="features">
        <Box 
          sx={{ 
            py: 10, 
            background: '#0A1929', // Navy blue background
            color: 'white',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100px',
              background: 'linear-gradient(to bottom, rgba(10, 25, 41, 0), rgba(10, 25, 41, 1))',
              zIndex: 1,
            }
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                mb: 6,
                fontWeight: 700,
                color: 'white',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: theme.palette.primary.main,
                  borderRadius: '2px',
                }
              }}
            >
              Placeholder Title
            </Typography>
            
            {/* Content will be added here later */}
            <Box sx={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Content coming soon...
              </Typography>
            </Box>
          </Container>
        </Box>
      </Element>
    </Box>
  );
};

export default LandingPage; 