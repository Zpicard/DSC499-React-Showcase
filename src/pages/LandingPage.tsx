import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  useTheme,
  alpha,
  keyframes,
  Divider,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Element, Link as ScrollLink } from 'react-scroll';
import { useSpring, animated, config } from '@react-spring/web';
import NetworkAnimation from '../components/NetworkAnimation';
import DataAnalysisAnimation from '../components/DataAnalysisAnimation';
import { useNavigate } from 'react-router-dom';
// Material Icons
import PythonIcon from '@mui/icons-material/Code';
import DataIcon from '@mui/icons-material/Storage';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SchoolIcon from '@mui/icons-material/School';
import StorageIcon from '@mui/icons-material/Storage';
import ApiIcon from '@mui/icons-material/Api';
import DatabaseIcon from '@mui/icons-material/DataObject';
import CloudIcon from '@mui/icons-material/Cloud';
import WebIcon from '@mui/icons-material/Web';
import CodeIcon from '@mui/icons-material/Code';
import DesignIcon from '@mui/icons-material/Brush';
import GitHubIcon from '@mui/icons-material/GitHub';
import ResponsiveIcon from '@mui/icons-material/Devices';
import DataScienceIcon from '@mui/icons-material/Psychology';

// Define the blink animation
const blink = {
  '0%': { opacity: 1 },
  '50%': { opacity: 0 },
  '100%': { opacity: 1 },
};

// Define a type for a skill
type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
  category?: string;
};

// Define a type for the skills data
type SkillsDataType = {
  [key: string]: {
    icon: React.ReactNode;
    color: string;
    skills: Skill[];
  };
};

// Update the skillsData constant with the proper type
const skillsData: SkillsDataType = {
  'Data Science': {
    icon: <DataScienceIcon />,
    color: '#00C853',
    skills: [
      { name: 'Python', icon: <PythonIcon />, color: '#3776AB' },
      { name: 'Jupyter Notebook', icon: <CodeIcon />, color: '#F37626' },
      { name: 'XGBoost', icon: <AnalyticsIcon />, color: '#FF6F00' },
      { name: 'LightGBM', icon: <AnalyticsIcon />, color: '#FF6F00' },
      { name: 'Random Forest', icon: <SchoolIcon />, color: '#F7931E' },
      { name: 'Scikit-Learn', icon: <SchoolIcon />, color: '#F7931E' },
      { name: 'NumPy', icon: <AnalyticsIcon />, color: '#013243' },
      { name: 'Data Visualization', icon: <VisibilityIcon />, color: '#2196F3' },
      { name: 'Seaborn', icon: <VisibilityIcon />, color: '#2196F3' },
      { name: 'MatPlotLib', icon: <VisibilityIcon />, color: '#2196F3' },
      { name: 'Pandas', icon: <DataIcon />, color: '#150458' }
    ]
  },
  'Software Engineering': {
    icon: <CodeIcon />,
    color: '#2196F3',
    skills: [
      { name: 'MySQL', icon: <DatabaseIcon />, color: '#4479A1' },
      { name: 'React', icon: <CodeIcon />, color: '#61DAFB' },
      { name: 'Material-UI', icon: <DesignIcon />, color: '#0081CB' },
      { name: 'UX', icon: <DesignIcon />, color: '#0081CB' },
      { name: 'Git', icon: <GitHubIcon />, color: '#181717' },
      { name: 'Web Development', icon: <WebIcon />, color: '#E91E63' },
      { name: 'JS', icon: <CodeIcon />, color: '#F7DF1E' },
      { name: 'TypeScript', icon: <CodeIcon />, color: '#3178C6' },
      { name: 'Cursor', icon: <CodeIcon />, color: '#3178C6' }
    ]
  }
};

// Combine all skills into one array for the carousel
const allSkills: Skill[] = [
  ...skillsData['Data Science'].skills.map(skill => ({ ...skill, category: 'Data Science' })),
  ...skillsData['Software Engineering'].skills.map(skill => ({ ...skill, category: 'Software Engineering' }))
];

const AnimBox = animated('div');

const SkillCard: React.FC<{
  skill: typeof allSkills[0];
  index: number;
  theme: any;
}> = ({ skill, index, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const springProps = useSpring({
    to: {
      transform: isHovered ? 'translateY(-8px)' : 'translateY(0px)',
    },
    config: config.wobbly
  });

  return (
    <AnimBox style={springProps}>
      <Box
        sx={{
          width: '160px',
          height: '160px',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          background: alpha('#0A1929', 0.6),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(skill.color, 0.3)}`,
          borderRadius: '20px',
          transition: 'all 0.3s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            background: alpha('#0A1929', 0.8),
            boxShadow: `0 8px 32px ${alpha(skill.color, 0.2)}`,
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box
          sx={{
            p: 1.5,
            borderRadius: '14px',
            background: alpha(skill.color, 0.1),
            color: skill.color,
            fontSize: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {skill.icon}
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: skill.color,
            fontWeight: 600,
            textAlign: 'center',
            fontSize: '0.9rem',
          }}
        >
          {skill.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: alpha(theme.palette.common.white, 0.7),
            textAlign: 'center',
          }}
        >
          {skill.category}
        </Typography>
      </Box>
    </AnimBox>
  );
};

const SkillsCarousel: React.FC<{ theme: any }> = ({ theme }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        gap: 3,
        overflowX: 'auto',
        px: 4,
        py: 6,
        cursor: isDragging ? 'grabbing' : 'grab',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha('#0A1929', 0.3),
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.5),
          borderRadius: '4px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.7),
          }
        },
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {allSkills.map((skill, index) => (
        <SkillCard key={skill.name} skill={skill} index={index} theme={theme} />
      ))}
    </Box>
  );
};

// Add this new component for the Google search animation
const GoogleSearchAnimation: React.FC<{ theme: any }> = ({ theme }) => {
  const [searchText, setSearchText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const searchQuery = "Skills and Technologies Used?";
  
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 1000;
    
    const timer = setTimeout(() => {
      if (isDeleting) {
        setSearchText(searchQuery.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
        
        if (currentIndex === 0) {
          setIsDeleting(false);
          setIsTyping(true);
        }
      } else {
        setSearchText(searchQuery.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
        
        if (currentIndex === searchQuery.length) {
          setIsDeleting(true);
          setIsTyping(false);
        }
      }
    }, isDeleting ? typingSpeed : (currentIndex === searchQuery.length ? pauseTime : typingSpeed));
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, searchQuery]);
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mb: 8,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderRadius: '50px',
          background: 'white',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            color: '#4285F4',
          }}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            />
          </svg>
        </Box>
        <Typography
          sx={{
            ml: 2,
            fontSize: '1.2rem',
            color: '#202124',
            fontFamily: 'Arial, sans-serif',
            width: '100%',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '2px',
              height: '20px',
              background: '#4285F4',
              animation: 'blink 1s step-end infinite',
            },
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 },
            },
          }}
        >
          {searchText}
        </Typography>
      </Box>
    </Box>
  );
};

// Create a new component for the skills showcase
const SkillsShowcase: React.FC<{ theme: any }> = ({ theme }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Group skills by category with proper typing
  const categorizedSkills: Record<string, Skill[]> = Object.entries(skillsData).reduce((acc, [category, data]) => {
    acc[category] = data.skills.map(skill => ({
      ...skill,
      category
    }));
    return acc;
  }, {} as Record<string, Skill[]>);
  
  return (
    <Box 
      sx={{ 
        width: '100%', 
        mt: 4,
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
      }}
    >
      {/* Browser header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          p: 1,
          background: alpha('#0A1929', 0.8),
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F56' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#FFBD2E' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#27C93F' }} />
        </Box>
        <Box 
          sx={{ 
            flex: 1, 
            mx: 2, 
            p: 1, 
            borderRadius: '20px', 
            background: alpha('#0A1929', 0.5),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            color: alpha(theme.palette.common.white, 0.7),
          }}
        >
          <Box sx={{ mr: 1, color: alpha(theme.palette.common.white, 0.5) }}>🔒</Box>
          skills.used.com
        </Box>
      </Box>
      
      {/* Browser content */}
      <Box sx={{ p: 3, background: alpha('#0A1929', 0.6) }}>
        {/* Skills grid */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' },
            gap: 2,
            width: '100%',
          }}
        >
          {Object.entries(categorizedSkills).map(([category, skills]) => (
            skills.map((skill) => (
              <Box
                key={skill.name}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: '12px',
                  background: alpha(theme.palette.primary.main, 0.1),
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  transition: 'all 0.3s ease',
                  transform: hoveredSkill === skill.name ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredSkill === skill.name 
                    ? `0 4px 16px ${alpha(theme.palette.primary.main, 0.2)}` 
                    : 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.15),
                  },
                }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontSize: '1.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1.5,
                    transition: 'all 0.3s ease',
                    transform: hoveredSkill === skill.name ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {skill.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.9),
                    fontWeight: 600,
                    textAlign: 'center',
                    mb: 0.5,
                    fontSize: '0.85rem',
                  }}
                >
                  {skill.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.5),
                    textAlign: 'center',
                    fontSize: '0.7rem',
                  }}
                >
                  {category}
                </Typography>
              </Box>
            ))
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [displayedText, setDisplayedText] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const navigate = useNavigate();
  const [selectedSkillType, setSelectedSkillType] = useState<string>('Data Science');

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

  const handleSkillTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSkillType: string,
  ) => {
    if (newSkillType !== null) {
      setSelectedSkillType(newSkillType);
    }
  };

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

      {/* Features Section */}
      <Box sx={{ 
        py: 10, 
        background: '#0A1929',
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
      }}>
        <Element name="features">
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: 'left',
                    mb: 6,
                    mt: 4,
                    fontWeight: 700,
                    color: 'white',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -10,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: theme.palette.primary.main,
                      borderRadius: '2px',
                    }
                  }}
                >
                  Objective
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.9)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  The objective of this project is to forecast human purchasing behavior on Instacart using machine learning models, enhanced through hyperparameter tuning and supported by thorough exploratory data analysis. A custom MySQL database was designed with defined schemas to store and query relevant data, with Python functions handling backend logic and data retrieval. To present the project interactively, a React-based website was developed and deployed via GitHub Pages, offering a dynamic showcase of the entire workflow.
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ 
                  position: 'relative',
                  height: '400px',
                  overflow: 'hidden',
                  background: 'transparent'
                }}>
                  <DataAnalysisAnimation />
                </Box>
              </Box>
            </Box>
          </Container>
        </Element>
      </Box>

      {/* Skills Section */}
      <Box sx={{ 
        py: 10, 
        background: '#0A1929',
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
      }}>
        <Element name="skills">
          <Container maxWidth="lg">
            <Typography
              variant="h2"
              sx={{
                textAlign: 'left',
                mb: 6,
                mt: 4,
                fontWeight: 700,
                color: 'white',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: theme.palette.primary.main,
                  borderRadius: '2px',
                }
              }}
            />

            {/* Skills Section */}
            <Box 
              sx={{ 
                mb: 6,
                p: 4,
                borderRadius: '16px',
                background: alpha('#40B5AD', 0.15),
                backdropFilter: 'blur(10px)',
                border: `1px solid ${alpha('#40B5AD', 0.3)}`,
                boxShadow: `0 8px 32px ${alpha('#40B5AD', 0.2)}`,
              }}
            >
              <GoogleSearchAnimation theme={theme} />
              <SkillsShowcase theme={theme} />
            </Box>
          </Container>
        </Element>
      </Box>
    </Box>
  );
};

export default LandingPage; 