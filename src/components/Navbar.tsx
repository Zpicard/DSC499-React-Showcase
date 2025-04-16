import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  alpha,
  Typography,
  Paper,
  Tooltip,
  Badge,
  Divider,
  Zoom,
  Fade,
  useScrollTrigger
} from '@mui/material';
import { Link as ScrollLink } from 'react-scroll';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DatasetIcon from '@mui/icons-material/Storage';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InfoIcon from '@mui/icons-material/Info';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import LinkIcon from '@mui/icons-material/Link';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('project');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const mainMenuItems = [
    { 
      text: 'Project', 
      icon: <TrendingUpIcon />,
      path: 'project',
      badge: 3,
      color: theme.palette.primary.main,
      secondaryIcon: <TimelineIcon />,
      description: 'Explore our forecasting models and results'
    },
    { 
      text: 'Data', 
      icon: <DatasetIcon />,
      path: 'data',
      badge: 0,
      color: theme.palette.secondary.main,
      secondaryIcon: <BarChartIcon />,
      description: 'Learn about our dataset and methodology'
    },
    { 
      text: 'About Me', 
      icon: <PersonIcon />,
      path: 'about',
      badge: 0,
      color: theme.palette.success.main,
      secondaryIcon: <SchoolIcon />,
      description: 'Get to know the developer behind this project'
    },
    { 
      text: 'References', 
      icon: <BookIcon />,
      path: 'references',
      badge: 0,
      color: theme.palette.warning.main,
      secondaryIcon: <LinkIcon />,
      description: 'View sources and resources used in this project'
    },
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={trigger ? 4 : 0}
      sx={{ 
        backgroundColor: trigger 
          ? alpha(theme.palette.background.default, 0.95)
          : 'transparent',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        borderBottom: trigger 
          ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
          : 'none',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Toolbar sx={{ justifyContent: 'center', py: 1.5, minHeight: '70px' }}>
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ color: theme.palette.text.primary }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: 0.5,
              }}
            >
              {mainMenuItems.map((item, index) => (
                <React.Fragment key={item.text}>
                  {index > 0 && (
                    <Divider 
                      orientation="vertical" 
                      flexItem 
                      sx={{ 
                        mx: 0.5, 
                        opacity: 0.15,
                        height: '30px',
                        alignSelf: 'center',
                      }} 
                    />
                  )}
                  <Box
                    sx={{
                      position: 'relative',
                      flex: 1,
                      maxWidth: '220px',
                    }}
                  >
                    <Button
                      component={ScrollLink}
                      to={item.path}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                      onClick={() => setActiveSection(item.path)}
                      onMouseEnter={() => setHoveredSection(item.path)}
                      onMouseLeave={() => setHoveredSection(null)}
                      sx={{
                        width: '100%',
                        height: '50px',
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '0.3px',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        color: activeSection === item.path 
                          ? item.color 
                          : theme.palette.text.primary,
                        backgroundColor: activeSection === item.path 
                          ? alpha(item.color, 0.08)
                          : 'transparent',
                        '&:hover': {
                          backgroundColor: alpha(item.color, 0.12),
                          transform: 'translateY(-2px)',
                          boxShadow: `0 4px 12px ${alpha(item.color, 0.15)}`,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          height: '2px',
                          background: `linear-gradient(90deg, ${item.color}, ${alpha(item.color, 0.5)})`,
                          opacity: activeSection === item.path ? 1 : 0,
                          transition: 'opacity 0.2s ease',
                        },
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1.5,
                        width: '100%',
                      }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}>
                          {item.icon}
                          {item.badge > 0 && (
                            <Badge 
                              badgeContent={item.badge} 
                              color="error" 
                              sx={{ 
                                position: 'absolute',
                                top: -6,
                                right: -6,
                                '& .MuiBadge-badge': {
                                  fontSize: '0.65rem',
                                  height: '16px',
                                  minWidth: '16px',
                                  borderRadius: '8px',
                                  fontWeight: 'bold',
                                }
                              }}
                            />
                          )}
                        </Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.95rem',
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Button>
                    
                    {/* Hover tooltip with description */}
                    <Zoom in={hoveredSection === item.path}>
                      <Paper
                        elevation={2}
                        sx={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          mt: 1,
                          p: 1.5,
                          borderRadius: 1.5,
                          minWidth: '180px',
                          background: alpha(theme.palette.background.paper, 0.98),
                          backdropFilter: 'blur(10px)',
                          border: `1px solid ${alpha(item.color, 0.15)}`,
                          zIndex: 10,
                          boxShadow: `0 4px 16px ${alpha(item.color, 0.1)}`,
                        }}
                      >
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1,
                          mb: 0.75,
                        }}>
                          {item.secondaryIcon}
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              fontWeight: 600,
                              color: item.color,
                              fontSize: '0.85rem',
                            }}
                          >
                            {item.text}
                          </Typography>
                        </Box>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: alpha(theme.palette.text.primary, 0.75),
                            fontSize: '0.8rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </Paper>
                    </Zoom>
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;