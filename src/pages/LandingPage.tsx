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
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  Tab,
  Tabs,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
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
import DatabaseSchema from '../components/DatabaseSchema';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import ModelPerformance from '../components/ModelPerformance';

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

// Add this new component for the tabbed sections
const DataProcessingTabs: React.FC<{ theme: any }> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  return (
    <Box
      sx={{
        py: 10,
        background: `linear-gradient(135deg, ${alpha('#40B5AD', 0.1)} 0%, ${alpha('#0A1929', 0.05)} 100%)`,
        backdropFilter: 'blur(10px)',
        borderRadius: '0',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 6,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80%',
              height: '1px',
              background: alpha('#0A1929', 0.1),
            }
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="data processing tabs"
              sx={{
                position: 'relative',
                '& .MuiTabs-indicator': {
                  backgroundColor: '#0A1929',
                  height: 3,
                  borderRadius: '3px',
                  transition: 'all 0.3s ease',
                },
                '& .MuiTab-root': {
                  color: alpha('#0A1929', 0.7),
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  minWidth: 200,
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  padding: '12px 24px',
                  borderRadius: '8px 8px 0 0',
                  margin: '0 8px',
                  '&:hover': {
                    color: '#0A1929',
                    backgroundColor: alpha('#0A1929', 0.05),
                  },
                  '&.Mui-selected': {
                    color: '#0A1929',
                    fontWeight: 700,
                    backgroundColor: alpha('#0A1929', 0.05),
                  },
                },
              }}
            >
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: activeTab === 0 ? alpha('#0A1929', 0.1) : 'transparent',
                        color: activeTab === 0 ? '#0A1929' : alpha('#0A1929', 0.7),
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
                        <path d="M7 12H9V17H7V12Z" fill="currentColor"/>
                        <path d="M11 7H13V17H11V7Z" fill="currentColor"/>
                        <path d="M15 9H17V17H15V9Z" fill="currentColor"/>
                      </svg>
                    </Box>
                    <span>Data Cleaning Pipeline</span>
                  </Box>
                } 
              />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: activeTab === 1 ? alpha('#0A1929', 0.1) : 'transparent',
                        color: activeTab === 1 ? '#0A1929' : alpha('#0A1929', 0.7),
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor"/>
                        <path d="M7 7H9V9H7V7Z" fill="currentColor"/>
                        <path d="M11 7H13V9H11V7Z" fill="currentColor"/>
                        <path d="M15 7H17V9H15V7Z" fill="currentColor"/>
                        <path d="M7 11H9V13H7V11Z" fill="currentColor"/>
                        <path d="M11 11H13V13H11V11Z" fill="currentColor"/>
                        <path d="M15 11H17V13H15V11Z" fill="currentColor"/>
                        <path d="M7 15H9V17H7V15Z" fill="currentColor"/>
                        <path d="M11 15H13V17H11V15Z" fill="currentColor"/>
                        <path d="M15 15H17V17H15V15Z" fill="currentColor"/>
                      </svg>
                    </Box>
                    <span>ETL Pipeline</span>
                  </Box>
                } 
              />
            </Tabs>
          </Box>
          
          {/* Data Cleaning Pipeline Tab */}
          {activeTab === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: '#0A1929',
                  borderRadius: '16px',
                  border: `1px solid ${alpha('#fff', 0.1)}`,
                  width: '100%',
                  maxWidth: '1000px',
                  margin: '0 auto',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'white',
                      borderRadius: '2px',
                    }
                  }}
                >
                  Data Cleaning Pipeline
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                  }}
                >
                  Our data preprocessing pipeline ensures data quality and consistency through systematic cleaning procedures. 
                  We convert CSV data to JSON format for better structure, remove special characters for standardization, 
                  and implement robust null value handling. This clean, structured data foundation enables efficient 
                  database operations and accurate predictive modeling. The pipeline includes handling missing values, 
                  removing duplicates, standardizing text data, and ensuring data type consistency across all datasets.
                </Typography>
              </Paper>
              <Box sx={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 4,
                justifyContent: 'center',
              }}>
                <Box sx={{ flex: 1, maxWidth: '600px' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      background: alpha('#1E1E1E', 0.95),
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        px: 2,
                        py: 1.5,
                        background: alpha('#0A1929', 0.8),
                        borderBottom: `1px solid ${alpha('#0A1929', 0.2)}`,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#FF5F56',
                          }}
                        />
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#FFBD2E',
                          }}
                        />
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#27C93F',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: alpha(theme.palette.common.white, 0.7),
                          ml: 2,
                          fontWeight: 500,
                        }}
                      >
                        Text Cleaning
                      </Typography>
                    </Box>
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.9rem',
                      }}
                    >
                      {`import pandas as pd
import re


file_path = 'products.csv' 
df = pd.read_csv(file_path)


def remove_special_characters(text):
    
    return re.sub(r'[^a-zA-Z0-9\\s]', '', text)


df['product_name'] = df['product_name'].apply(remove_special_characters)


cleaned_file_path = 'products_cleaned.csv'  # Change this to your desired output path
df.to_csv(cleaned_file_path, index=False)

print("Special characters removed and saved to", cleaned_file_path)`}
                    </SyntaxHighlighter>
                  </Paper>
                </Box>
                <Box sx={{ flex: 1, maxWidth: '600px' }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      background: alpha('#1E1E1E', 0.95),
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        px: 2,
                        py: 1.5,
                        background: alpha('#0A1929', 0.8),
                        borderBottom: `1px solid ${alpha('#0A1929', 0.2)}`,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#FF5F56',
                          }}
                        />
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#FFBD2E',
                          }}
                        />
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            background: '#27C93F',
                          }}
                        />
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: alpha(theme.palette.common.white, 0.7),
                          ml: 2,
                          fontWeight: 500,
                        }}
                      >
                        Convert to JSON
                      </Typography>
                    </Box>
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        fontSize: '0.9rem',
                      }}
                    >
                      {`#Convert to JSON for faulty upload of data
import pandas as pd


file_path = 'CSVSourceData/products_cleaned.csv' 
df = pd.read_csv(file_path)


json_data = df.to_json(orient='records')


with open('products_cleaned_JSON.json', 'w') as json_file:
    json_file.write(json_data)

print("Data successfully converted to JSON format.")`}
                    </SyntaxHighlighter>
                  </Paper>
                </Box>
              </Box>
            </Box>
          )}
          
          {/* ETL Pipeline Tab */}
          {activeTab === 1 && (
            <Box sx={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: '#0A1929',
                  borderRadius: '16px',
                  border: `1px solid ${alpha('#fff', 0.1)}`,
                  width: '100%',
                  maxWidth: '1000px',
                  margin: '0 auto',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    letterSpacing: '-0.02em',
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: 'white',
                      borderRadius: '2px',
                    }
                  }}
                >
                  ETL Pipeline
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.1rem',
                    maxWidth: '1200px',
                    margin: '0 auto',
                  }}
                >
                  Our ETL (Extract, Transform, Load) pipeline efficiently manages the data flow from MySQL database to pandas DataFrames. 
                  The extraction process begins with secure database connections using environment variables for credentials. 
                  We implement robust error handling and connection management to ensure data integrity. The transformation phase 
                  includes complex SQL queries that join multiple tables (orders, products, aisles, departments) to create comprehensive 
                  datasets for machine learning. The pipeline features a flexible user-based data extraction system, allowing for 
                  customizable data sampling based on user IDs. This structured approach enables efficient data processing while 
                  maintaining security and scalability for large-scale analysis.
                </Typography>
              </Paper>

              {/* Code Snippets Row */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 4,
              }}>
                {/* Database Connection Code */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    background: alpha('#1E1E1E', 0.95),
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1.5,
                      background: alpha('#0A1929', 0.8),
                      borderBottom: `1px solid ${alpha('#0A1929', 0.2)}`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FF5F56',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FFBD2E',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#27C93F',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: alpha(theme.palette.common.white, 0.7),
                        ml: 2,
                        fontWeight: 500,
                      }}
                    >
                      Database Connection & Query Execution
                    </Typography>
                  </Box>
                  <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.9rem',
                    }}
                  >
                    {`import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os
import pandas as pd

# Load credentials from .env file
load_dotenv('SQL_PW.env')
user_from_envfile = os.getenv("SQL_User")
pw_from_envfile = os.getenv("SQL_Pass")

# Create connection to MySQL Database
def create_connection():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            user=user_from_envfile,
            password=pw_from_envfile,
            database='orders_prediction_db'
        )
        if connection.is_connected():
            print("Successfully connected to the MySQL database")
        return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None

# Method for executing query
def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        results = cursor.fetchall()
        for row in results:
            print(row)
    except Error as e:
        print(f"Error executing query: {e}")`}
                  </SyntaxHighlighter>
                </Paper>
                
                {/* Data Transformation Code */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 0,
                    background: alpha('#1E1E1E', 0.95),
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 1.5,
                      background: alpha('#0A1929', 0.8),
                      borderBottom: `1px solid ${alpha('#0A1929', 0.2)}`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FF5F56',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FFBD2E',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#27C93F',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: alpha(theme.palette.common.white, 0.7),
                        ml: 2,
                        fontWeight: 500,
                      }}
                    >
                      Data Transformation & Loading
                    </Typography>
                  </Box>
                  <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.9rem',
                    }}
                  >
                    {`# METHOD TO CREATE BASIS FOR ML ALGORITHMS PULLING FROM SQL with editable number of users
def query_to_dataframe_for_users(connection, start_user_id, end_user_id):
    cursor = connection.cursor()
    try:
        query = f"""
        SELECT 
            o.user_id,
            o.order_id,
            o.order_number,
            o.eval_set,
            COALESCE(op.product_id, ot.product_id) AS product_id,
            COALESCE(op.reordered, ot.reordered) AS reordered,
            o.order_dow,
            o.order_hour_of_day,
            o.days_since_prior_order,
            p.product_name,
            p.aisle_id,
            p.department_id,
            a.aisle AS aisle_name,
            d.department AS department_name
        FROM orders o
        LEFT JOIN order_products_prior op 
            ON o.order_id = op.order_id 
            AND o.eval_set = 'prior'
        LEFT JOIN order_products_train ot 
            ON o.order_id = ot.order_id 
            AND o.eval_set = 'train'
        LEFT JOIN products p 
            ON COALESCE(op.product_id, ot.product_id) = p.product_id
        LEFT JOIN aisles a 
            ON p.aisle_id = a.aisle_id
        LEFT JOIN departments d 
            ON p.department_id = d.department_id
        WHERE o.user_id BETWEEN {start_user_id} AND {end_user_id}
          AND (o.eval_set = 'prior' OR o.eval_set = 'train')
        ORDER BY o.user_id, o.order_number, product_id;
        """
        cursor.execute(query)
        columns = [col[0] for col in cursor.description]
        rows = cursor.fetchall()
        return pd.DataFrame(rows, columns=columns)
    except Error as e:
        print(f"Error executing query: {e}")
        return None

# Example usage:
connection = create_connection()
if connection:
    # Specify user range (e.g., user IDs from 1 to 10)
    df = query_to_dataframe_for_users(connection, 1, 10)
    print(df.head())  # Display first few rows of the resulting dataframe
    connection.close()`}
                  </SyntaxHighlighter>
                </Paper>
              </Box>
              
              {/* Features Cards Row */}
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
                gap: 4,
              }}>
                {/* Database Functions Card */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    background: '#0A1929',
                    borderRadius: '16px',
                    border: `1px solid ${alpha('#fff', 0.1)}`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                      background: '#0A1929',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: alpha('#fff', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    1
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Database Functions
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#fff', 0.9),
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#fff',
                          mt: 1,
                        }}
                      />
                      Created multiple Python functions to establish and manage connections to local MySQL database
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#fff', 0.9),
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#fff',
                          mt: 1,
                        }}
                      />
                      Implemented functions for querying random samples from large tables for EDA
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#fff', 0.9),
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#fff',
                          mt: 1,
                        }}
                      />
                      Developed comprehensive query functions to extract complete datasets
                    </Typography>
                  </Box>
                </Paper>
                
                {/* Data Transformation Card */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    background: '#0A1929',
                    borderRadius: '16px',
                    border: `1px solid ${alpha('#fff', 0.1)}`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                      background: '#0A1929',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: alpha('#fff', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    2
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Data Transformation
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#fff', 0.9),
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#fff',
                          mt: 1,
                        }}
                      />
                      Built transformation functions to convert MySQL query results into pandas DataFrames
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#fff', 0.9),
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#fff',
                          mt: 1,
                        }}
                      />
                      Implemented efficient data processing for large-scale analysis
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: alpha('#fff', 0.9),
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: '#fff',
                          mt: 1,
                        }}
                      />
                      Ensured data integrity through robust error handling
                    </Typography>
                  </Box>
                </Paper>
                
                {/* Technology Stack Card */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    background: '#0A1929',
                    borderRadius: '16px',
                    border: `1px solid ${alpha('#fff', 0.1)}`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                      background: '#0A1929',
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: alpha('#fff', 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    3
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Technology Stack
                  </Typography>
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    flex: 1,
                  }}>
                    <Box
                      sx={{
                        p: 2,
                        background: alpha('#fff', 0.1),
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: alpha('#fff', 0.15),
                          transform: 'translateY(-3px)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#fff',
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#fff' }}>
                        mysql.connector
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        background: alpha('#fff', 0.1),
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: alpha('#fff', 0.15),
                          transform: 'translateY(-3px)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#fff',
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#fff' }}>
                        dotenv
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        background: alpha('#fff', 0.1),
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: alpha('#fff', 0.15),
                          transform: 'translateY(-3px)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#fff',
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#fff' }}>
                        os
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        p: 2,
                        background: alpha('#fff', 0.1),
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: alpha('#fff', 0.15),
                          transform: 'translateY(-3px)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#fff',
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#fff' }}>
                        pandas
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

const MLApproachSection: React.FC<{ theme: any }> = ({ theme }) => {
  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            mb: 6,
            color: theme.palette.text.primary,
          }}
        >
          Machine Learning Approach
        </Typography>

        {/* User Order Pattern Table */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: 'white',
            borderRadius: '8px',
            mb: 4,
            overflowX: 'auto'
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#E3F2FD',
                    padding: '8px',
                    minWidth: '100px',
                    color: 'black',
                    fontWeight: 'bold'
                  }}
                >
                  Order number
                </TableCell>
                {[...Array(10)].map((_, i) => (
                  <TableCell 
                    key={i} 
                    align="center"
                    sx={{ 
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#E3F2FD',
                      padding: '8px',
                      minWidth: '40px',
                      color: 'black',
                      fontWeight: 'bold'
                    }}
                  >
                    {i + 1}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { user: 'User A', pattern: ['p', 'p', 'p', 'p', 'p', 'tr', '', '', '', ''] },
                { user: 'User B', pattern: ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'tr', ''] },
                { user: 'User C', pattern: ['p', 'p', 'p', 'p', 'p', 'p', 'te', '', '', ''] },
                { user: 'User D', pattern: ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'tr'] }
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell 
                    sx={{ 
                      border: '1px solid #e0e0e0',
                      backgroundColor: '#FFF9C4',
                      padding: '8px',
                      fontWeight: 'normal',
                      color: 'black'
                    }}
                  >
                    {row.user}
                  </TableCell>
                  {row.pattern.map((cell, j) => (
                    <TableCell 
                      key={j} 
                      align="center"
                      sx={{ 
                        border: '1px solid #e0e0e0',
                        backgroundColor: cell === 'tr' ? '#E8F5E9' : 
                                       cell === 'te' ? '#FFF3E0' : 
                                       cell === 'p' ? '#F5F5F5' : 'white',
                        padding: '8px',
                        color: 'black'
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Dataset Structure Table */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: 'white',
            borderRadius: '8px',
            mb: 4,
            overflowX: 'auto'
          }}
        >
          {/* Column Headers */}
          <Box sx={{ display: 'flex', mb: 2, borderBottom: '1px solid #e0e0e0', pb: 2 }}>
            <Box sx={{ width: '200px', pr: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.875rem' }}>
                Primary Key
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.7)', display: 'block' }}>
                (products from prior orders)
              </Typography>
            </Box>
            <Box sx={{ flex: 1, px: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.875rem' }}>
                Predictor variables - X
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(0,0,0,0.7)', display: 'block' }}>
                (based on prior orders)
              </Typography>
            </Box>
            <Box sx={{ width: '100px', px: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.875rem' }}>
                train/test
              </Typography>
            </Box>
            <Box sx={{ width: '120px', px: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.875rem' }}>
                Future order
              </Typography>
            </Box>
            <Box sx={{ width: '100px', pl: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'black', fontWeight: 'bold', fontSize: '0.875rem' }}>
                Response Y
              </Typography>
            </Box>
          </Box>

          {/* Data Table */}
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#BBDEFB', padding: '8px', fontWeight: 'bold', color: 'black' }}>user_id</TableCell>
                <TableCell sx={{ backgroundColor: '#BBDEFB', padding: '8px', fontWeight: 'bold', color: 'black' }}>product_id</TableCell>
                <TableCell sx={{ backgroundColor: '#C8E6C9', padding: '8px', fontWeight: 'bold', color: 'black' }}>...</TableCell>
                <TableCell sx={{ backgroundColor: '#FFE0B2', padding: '8px', fontWeight: 'bold', color: 'black' }}>eval_set</TableCell>
                <TableCell sx={{ backgroundColor: '#E1BEE7', padding: '8px', fontWeight: 'bold', color: 'black' }}>order_id</TableCell>
                <TableCell sx={{ backgroundColor: '#FFCDD2', padding: '8px', fontWeight: 'bold', color: 'black' }}>reordered</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                { user: 1, product: 196, eval: 'train', order: 1187899, reordered: 1 },
                { user: 1, product: 10258, eval: 'train', order: 1187899, reordered: 1 },
                { user: 1, product: 10326, eval: 'train', order: 1187899, reordered: 0 },
                { user: 1, product: 12427, eval: 'train', order: 1187899, reordered: 0 },
                { user: 1, product: 13032, eval: 'train', order: 1187899, reordered: 0 },
                { user: 1, product: 13176, eval: 'train', order: 1187899, reordered: 0 },
                { user: 1, product: 14084, eval: 'train', order: 1187899, reordered: 0 },
                { user: 2, product: 14084, eval: 'test', order: 2125869, reordered: 0 },
                { user: 2, product: 25133, eval: 'test', order: 2125869, reordered: 0 }
              ].map((row, i) => (
                <TableRow key={i}>
                  <TableCell sx={{ backgroundColor: '#BBDEFB', padding: '8px', color: 'black' }}>{row.user}</TableCell>
                  <TableCell sx={{ backgroundColor: '#BBDEFB', padding: '8px', color: 'black' }}>{row.product}</TableCell>
                  <TableCell sx={{ backgroundColor: '#C8E6C9', padding: '8px', color: 'black' }}>...</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFE0B2', padding: '8px', color: 'black' }}>{row.eval}</TableCell>
                  <TableCell sx={{ backgroundColor: '#E1BEE7', padding: '8px', color: 'black' }}>{row.order}</TableCell>
                  <TableCell sx={{ backgroundColor: '#FFCDD2', padding: '8px', color: 'black' }}>{row.reordered}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Data Pipeline Section */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 4,
              color: theme.palette.text.primary,
            }}
          >
            Data Pipeline Architecture
          </Typography>

          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}>
            {/* Dynamic Data Retrieval */}
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  background: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: '12px',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StorageIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Dynamic Data Retrieval
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  A custom Python function interfaces with a MySQL database to enable flexible data extraction. Users can define specific ranges, allowing for dynamic querying tailored to different analysis scopes.
                </Typography>
              </Paper>
            </Box>

            {/* Feature Extraction */}
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  background: alpha(theme.palette.secondary.main, 0.05),
                  borderRadius: '12px',
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AnalyticsIcon sx={{ color: theme.palette.secondary.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Feature Extraction
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  Key behavioral, product-related, and temporal features—such as order frequency and time—are extracted from the database to form the foundation of the dataset.
                </Typography>
              </Paper>
            </Box>

            {/* Order-Product Integration */}
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  background: alpha(theme.palette.success.main, 0.05),
                  borderRadius: '12px',
                  border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DataIcon sx={{ color: theme.palette.success.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Order-Product Integration
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  Order data is joined with product metadata to uncover purchasing patterns, establishing relationships critical for accurate forecasting.
                </Typography>
              </Paper>
            </Box>

            {/* Contextual Enrichment */}
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  background: alpha(theme.palette.info.main, 0.05),
                  borderRadius: '12px',
                  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ApiIcon sx={{ color: theme.palette.info.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Contextual Enrichment
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  Additional attributes from related tables (e.g., aisles and departments) are merged to provide richer context and a more holistic feature set.
                </Typography>
              </Paper>
            </Box>

            {/* ML-Ready Structuring */}
            <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: alpha(theme.palette.warning.main, 0.05),
                  borderRadius: '12px',
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon sx={{ color: theme.palette.warning.main, mr: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ML-Ready Structuring
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                  The final dataset is cleaned and organized for machine learning, transforming the extracted variables into powerful predictors for future product demand.
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Feature Engineering Section */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 4,
              color: theme.palette.text.primary,
            }}
          >
            Feature Engineering & Selection
          </Typography>

          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: { xs: 0, md: '50%' },
              top: 0,
              bottom: 0,
              width: '2px',
              background: alpha(theme.palette.primary.main, 0.3),
              transform: 'translateX(-50%)',
            }
          }}>
            {/* Data Splitting */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 3,
              position: 'relative',
            }}>
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pr: { md: 3 },
                textAlign: { md: 'right' }
              }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: alpha('#0A1929', 0.8),
                    borderRadius: '12px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { md: 'flex-end' } }}>
                    <StorageIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                      Data Splitting Strategy
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    The dataset is strategically split into prior orders and predictive orders. This separation ensures that features are derived exclusively from historical data, maintaining the integrity of our predictive modeling approach.
                  </Typography>
                </Paper>
              </Box>
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pl: { md: 3 },
                display: { xs: 'none', md: 'block' }
              }} />
            </Box>

            {/* Feature Weights */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 3,
              position: 'relative',
            }}>
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pr: { md: 3 },
                display: { xs: 'none', md: 'block' }
              }} />
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pl: { md: 3 }
              }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: alpha('#0A1929', 0.8),
                    borderRadius: '12px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AnalyticsIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                      Key Feature Identification
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    Critical features are identified and weighted based on their predictive power, including order day of week, aisle ID, days since prior order, and other temporal and categorical variables that influence purchasing behavior.
                  </Typography>
                </Paper>
              </Box>
            </Box>

            {/* Feature Creation */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 3,
              position: 'relative',
            }}>
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pr: { md: 3 },
                textAlign: { md: 'right' }
              }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: alpha('#0A1929', 0.8),
                    borderRadius: '12px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { md: 'flex-end' } }}>
                    <DataIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                      Feature Creation Strategy
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    All features are engineered from prior orders, ensuring that our model learns from historical patterns rather than the target "train-set" orders we aim to predict.
                  </Typography>
                </Paper>
              </Box>
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pl: { md: 3 },
                display: { xs: 'none', md: 'block' }
              }} />
            </Box>

            {/* Feature Categories */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 3,
              position: 'relative',
            }}>
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pr: { md: 3 },
                display: { xs: 'none', md: 'block' }
              }} />
              <Box sx={{ 
                width: { xs: '100%', md: '50%' },
                pl: { md: 3 }
              }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    background: alpha('#0A1929', 0.8),
                    borderRadius: '12px',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ApiIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                      Feature Categories
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    Two main categories of features are created: Frequency Features (capturing purchase patterns) and Temporal Features (tracking time-based behaviors), providing a comprehensive view of customer purchasing habits.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
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
                      bottom: -8,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: '#0A1929',
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
                  bottom: -8,
                  left: 0,
                  width: '100%',
                  height: '4px',
                  background: '#0A1929',
                  borderRadius: '2px',
                }
              }}
            >
              Skills
            </Typography>

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

      {/* Database Schema Section */}
      <Element name="database">
        <Box sx={{ 
          py: 10, 
          background: '#0A1929',
          color: 'white',
          position: 'relative',
        }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: 0.35 }}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: 'left',
                    mb: 4,
                    mt: 4,
                    fontWeight: 700,
                    color: 'white',
                    position: 'relative',
                    display: 'inline-block',
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: '#0A1929',
                      borderRadius: '2px',
                    }
                  }}
                >
                  MySQL Database Design
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.9)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                    maxWidth: '90%'
                  }}
                >
                  The database schema is designed to facilitate data organization, provide clear visualization of cardinality and relationships between tables, support debugging and troubleshooting efforts, and enable predictive analytics modeling through efficient data structure.
                </Typography>
              </Box>
              <Box sx={{ flex: 0.65 }}>
                <Box sx={{ 
                  position: 'relative',
                  height: '700px',
                  overflow: 'visible',
                  background: 'transparent',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  transform: 'scale(0.85)',
                  transformOrigin: 'top left',
                  mt: -4,
                  ml: -4
                }}>
                  <DatabaseSchema />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Element>

      <Box sx={{ 
        background: alpha('#40B5AD', 0.15),
        backdropFilter: 'blur(10px)',
        width: '100%',
        margin: 0,
        padding: 0,
      }}>
        <Element name="data-processing">
          <DataProcessingTabs theme={theme} />
        </Element>
      </Box>

      {/* Exploratory Data Analysis Section */}
      <Box sx={{ 
        py: 10, 
        background: '#0A1929',
        color: 'white',
        position: 'relative',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
          }}>
            <Box sx={{ width: '100%', textAlign: 'center', maxWidth: '1000px' }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    background: 'white',
                    borderRadius: '2px',
                  }
                }}
              >
                Exploratory Data Analysis
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  mb: 3,
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                Our exploratory data analysis process involves comprehensive data visualization and statistical analysis 
                to uncover patterns, trends, and insights in the grocery sales data. We utilize various visualization 
                techniques including order patterns, product popularity, and department analysis to understand 
                the relationships between different variables. This analysis helps identify key factors influencing 
                customer behavior and guides our feature engineering process for the predictive models.
              </Typography>
            </Box>
            
            {/* Visualization Gallery */}
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              gap: 4,
            }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                  textAlign: 'center',
                }}
              >
                Key Visualizations
              </Typography>
              
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 3,
                width: '100%',
              }}>
                {/* Order Counts by Day of Week */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: alpha('#1E1E1E', 0.3),
                    '&:hover': {
                      transform: 'scale(1.02)',
                      '& .overlay': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <img 
                    src={process.env.PUBLIC_URL + "/images/visualizations/OrderCountsByDayOfTheWeek.png"} 
                    alt="Order Counts by Day of Week" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '10px',
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
                        mb: 1,
                      }}
                    >
                      Order Counts by Day of Week
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        textAlign: 'center',
                      }}
                    >
                      Distribution of orders across different days of the week
                    </Typography>
                  </Box>
                </Box>
                
                {/* Top 10 Aisles */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: alpha('#1E1E1E', 0.3),
                    '&:hover': {
                      transform: 'scale(1.02)',
                      '& .overlay': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <img 
                    src={process.env.PUBLIC_URL + "/images/visualizations/Top10AsilesWithHighestNumberOfProducts.png"} 
                    alt="Top 10 Aisles" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '10px',
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
                        mb: 1,
                      }}
                    >
                      Top 10 Aisles
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        textAlign: 'center',
                      }}
                    >
                      Most popular aisles based on product count
                    </Typography>
                  </Box>
                </Box>

                {/* Top 10 Most Frequently Purchased Products */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: alpha('#1E1E1E', 0.3),
                    '&:hover': {
                      transform: 'scale(1.02)',
                      '& .overlay': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <img 
                    src={process.env.PUBLIC_URL + "/images/visualizations/Top10MostFrequentlyPurchasesProducts.png"} 
                    alt="Top 10 Products" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '10px',
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
                        mb: 1,
                      }}
                    >
                      Top 10 Products
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        textAlign: 'center',
                      }}
                    >
                      Most frequently purchased products in the dataset
                    </Typography>
                  </Box>
                </Box>

                {/* Order Frequency by Department */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    aspectRatio: '16/9',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: alpha('#1E1E1E', 0.3),
                    '&:hover': {
                      transform: 'scale(1.02)',
                      '& .overlay': {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  <img 
                    src={process.env.PUBLIC_URL + "/images/visualizations/OrderFrequencyByDepartment.png"} 
                    alt="Order Frequency by Department" 
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '10px',
                    }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'white',
                        fontWeight: 600,
                        textAlign: 'center',
                        mb: 1,
                      }}
                    >
                      Order Frequency by Department
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        textAlign: 'center',
                      }}
                    >
                      Distribution of orders across different departments
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            {/* Code Examples */}
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' }, 
              gap: 4,
              justifyContent: 'center',
              mt: 4,
            }}>
              <Box sx={{ flex: 1, maxWidth: '600px' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    background: alpha('#1E1E1E', 0.95),
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      px: 2,
                      py: 1.5,
                      background: alpha('#0A1929', 0.8),
                      borderBottom: `1px solid ${alpha('#0A1929', 0.2)}`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FF5F56',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FFBD2E',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#27C93F',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: alpha(theme.palette.common.white, 0.7),
                        ml: 2,
                        fontWeight: 500,
                      }}
                    >
                      Order Counts by Day of Week
                    </Typography>
                  </Box>
                  <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.9rem',
                    }}
                  >
                    {`#Visualize order counts on different days
orders_by_dow = orders_df['order_dow'].value_counts().sort_index()
sns.set(style="darkgrid", palette="pastel")
plt.figure(figsize=(12, 7))
ax = sns.lineplot(x=orders_by_dow.index, y=orders_by_dow.values, marker="o", color="deepskyblue", linewidth=3)
peak_day = orders_by_dow.idxmax()
plt.plot(peak_day, orders_by_dow[peak_day], marker="o", markersize=12, color="crimson", label="Peak Day")
plt.title("Order Counts by Day of the Week", fontsize=18, fontweight="bold", color="black")
plt.xlabel("Day of the Week", fontsize=14, color="black")
plt.ylabel("Order Count", fontsize=14, color="black")
plt.xticks(ticks=range(7), labels=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], rotation=45, fontsize=12)
plt.yticks(fontsize=12)
plt.legend(["Order Trend", "Peak Day"], loc="upper left", fontsize=12, frameon=True, shadow=True, fancybox=True)
plt.grid(visible=True, color="gray", linestyle="--", linewidth=0.5, alpha=0.7)
plt.tight_layout()
plt.show()`}
                  </SyntaxHighlighter>
                </Paper>
              </Box>
              <Box sx={{ flex: 1, maxWidth: '600px' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    background: alpha('#1E1E1E', 0.95),
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                      px: 2,
                      py: 1.5,
                      background: alpha('#0A1929', 0.8),
                      borderBottom: `1px solid ${alpha('#0A1929', 0.2)}`,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FF5F56',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#FFBD2E',
                        }}
                      />
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          background: '#27C93F',
                        }}
                      />
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: alpha(theme.palette.common.white, 0.7),
                        ml: 2,
                        fontWeight: 500,
                      }}
                    >
                      Order Frequency by Department
                    </Typography>
                  </Box>
                  <SyntaxHighlighter
                    language="python"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      padding: '1.5rem',
                      background: 'transparent',
                      fontSize: '0.9rem',
                    }}
                  >
                    {`# Merge prior orders and departments to see order frequency by dept.
merged_df = pd.merge(order_products_prior_df, products_df, on='product_id')
merged_df = pd.merge(merged_df, departments_df, on='department_id')

dept_order_counts = merged_df['department'].value_counts().sort_values(ascending=False)

dept_order_df = pd.DataFrame(dept_order_counts).reset_index()
dept_order_df.columns = ['Department', 'Order Frequency']

sns.set(style="white")
plt.figure(figsize=(12, 8))

heatmap_data = dept_order_df.pivot_table(index='Department', values='Order Frequency', aggfunc='sum')
ax = sns.heatmap(heatmap_data, annot=True, fmt=".0f", cmap="YlGnBu", cbar=True, linewidths=1, linecolor="black")

ax.set_title("Order Frequency by Department", fontsize=18, fontweight="bold", color="black")
ax.set_xlabel("Order Frequency", fontsize=14, color="black")
ax.set_ylabel("Department", fontsize=14, color="black")

plt.tight_layout()
plt.show()`}
                  </SyntaxHighlighter>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <MLApproachSection theme={theme} />
      <ModelPerformance />
    </Box>
  );
};

export default LandingPage; 