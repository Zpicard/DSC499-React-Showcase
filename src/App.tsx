import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import PageLayout from './components/PageLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Predictions from './pages/Predictions';

// Placeholder components for the new pages
const DatasetPage = () => (
  <div style={{ padding: '100px 20px 20px', color: 'white', textAlign: 'center' }}>
    <h1>Dataset Page</h1>
    <p>This page will contain information about the Instacart dataset.</p>
  </div>
);

const ReferencesPage = () => (
  <div style={{ padding: '100px 20px 20px', color: 'white', textAlign: 'center' }}>
    <h1>References</h1>
    <p>This page will list all references used in the project.</p>
  </div>
);

const AcknowledgementsPage = () => (
  <div style={{ padding: '100px 20px 20px', color: 'white', textAlign: 'center' }}>
    <h1>Acknowledgements</h1>
    <p>This page will acknowledge all contributors and resources used.</p>
  </div>
);

const AboutMePage = () => (
  <div style={{ padding: '100px 20px 20px', color: 'white', textAlign: 'center' }}>
    <h1>About Me</h1>
    <p>This page will contain information about the project creator.</p>
  </div>
);

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#64ffda',
      light: '#9effff',
      dark: '#14cba8',
    },
    secondary: {
      main: '#7000FF',
      light: '#a64dff',
      dark: '#3d00b3',
    },
    background: {
      default: '#0a192f',
      paper: '#112240',
    },
    text: {
      primary: '#e6f1ff',
      secondary: '#8892b0',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/dashboard"
            element={
              <PageLayout
                title="Dashboard"
                subtitle="Welcome to your Instacart Analytics Dashboard"
              >
                <Dashboard />
              </PageLayout>
            }
          />
          <Route
            path="/analytics"
            element={
              <PageLayout
                title="Analytics"
                subtitle="Deep dive into your sales data and trends"
              >
                <Analytics />
              </PageLayout>
            }
          />
          <Route
            path="/predictions"
            element={
              <PageLayout
                title="Predictions"
                subtitle="AI-powered sales forecasting and insights"
              >
                <Predictions />
              </PageLayout>
            }
          />
          <Route path="/dataset" element={<DatasetPage />} />
          <Route path="/references" element={<ReferencesPage />} />
          <Route path="/acknowledgements" element={<AcknowledgementsPage />} />
          <Route path="/about" element={<AboutMePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 