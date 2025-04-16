import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  useTheme,
  alpha,
} from '@mui/material';
import { Element } from 'react-scroll';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DatasetIcon from '@mui/icons-material/Storage';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const LandingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Element name="overview">
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.95)} 0%, ${alpha(theme.palette.primary.main, 0.95)} 100%)`,
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url(/path/to/pattern.png)',
              opacity: 0.1,
              zIndex: 1,
            },
          }}
        >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 4,
            }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 800,
                    mb: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Market Basket
                  <br />
                  Analysis
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    fontWeight: 500,
                    mb: 4,
                    color: alpha(theme.palette.common.white, 0.9),
                  }}
                >
                  Unlock insights from your shopping data
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 2,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
                    boxShadow: `0 4px 14px ${alpha(theme.palette.secondary.main, 0.4)}`,
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.secondary.main})`,
                    },
                  }}
                >
                  Explore Analysis
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                {/* Add hero image or visualization here */}
              </Box>
            </Box>
          </Container>
        </Box>
      </Element>

      {/* Features Section */}
      <Element name="features">
        <Box sx={{ py: 12, backgroundColor: theme.palette.background.default }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 8,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Key Features
            </Typography>
            <Box sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
            }}>
              {[
                {
                  icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
                  title: 'Advanced Analytics',
                  description: 'Powerful analytical tools to understand shopping patterns',
                },
                {
                  icon: <DatasetIcon sx={{ fontSize: 40 }} />,
                  title: 'Rich Dataset',
                  description: 'Comprehensive Instacart market basket dataset',
                },
                {
                  icon: <TimelineIcon sx={{ fontSize: 40 }} />,
                  title: 'Predictive Insights',
                  description: 'Machine learning models for purchase prediction',
                },
                {
                  icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
                  title: 'Trend Analysis',
                  description: 'Identify emerging patterns and trends',
                },
              ].map((feature, index) => (
                <Paper
                  key={index}
                  elevation={0}
                  sx={{
                    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 2rem)', lg: '1 1 calc(25% - 3rem)' },
                    p: 4,
                    borderRadius: 4,
                    background: alpha(theme.palette.background.paper, 0.6),
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      color: theme.palette.primary.main,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: alpha(theme.palette.text.primary, 0.7),
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Container>
        </Box>
      </Element>

      {/* Dataset Section */}
      <Element name="dataset">
        <Box
          sx={{
            py: 12,
            backgroundColor: alpha(theme.palette.primary.main, 0.03),
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 8,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dataset Overview
            </Typography>
            {/* Add dataset visualization or information here */}
          </Container>
        </Box>
      </Element>

      {/* Analysis Section */}
      <Element name="analysis">
        <Box sx={{ py: 12, backgroundColor: theme.palette.background.default }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 8,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Analysis Results
            </Typography>
            {/* Add analysis results and visualizations here */}
          </Container>
        </Box>
      </Element>

      {/* About Section */}
      <Element name="about">
        <Box
          sx={{
            py: 12,
            backgroundColor: alpha(theme.palette.primary.main, 0.03),
          }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 8,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              About the Project
            </Typography>
            {/* Add project information and team details here */}
          </Container>
        </Box>
      </Element>
    </Box>
  );
};

export default LandingPage; 