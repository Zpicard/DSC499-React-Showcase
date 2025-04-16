import React, { ReactNode } from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: { xs: 10, sm: 12 },
        pb: 6,
        background: `linear-gradient(180deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: `radial-gradient(circle at 20% 30%, rgba(100, 255, 218, 0.05) 0%, transparent 50%), 
                       radial-gradient(circle at 80% 70%, rgba(100, 255, 218, 0.05) 0%, transparent 50%)`,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            mb: 6,
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 60,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${theme.palette.secondary.main}, transparent)`,
            },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.text.primary}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: `0 0 20px rgba(100, 255, 218, 0.2)`,
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: 'rgba(17, 34, 64, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(100, 255, 218, 0.1)',
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default PageLayout; 