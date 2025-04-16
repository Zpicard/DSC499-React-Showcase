import React from 'react';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: 'rgba(10, 25, 47, 0.85)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(100, 255, 218, 0.1)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      {/* Key Metrics Section */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3,
        mb: 3
      }}>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '250px' }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Total Sales
            </Typography>
            <Typography variant="h4" color="primary">
              $124,563
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +12% from last month
            </Typography>
          </StyledPaper>
        </Box>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '250px' }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Orders
            </Typography>
            <Typography variant="h4" color="primary">
              1,234
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +8% from last month
            </Typography>
          </StyledPaper>
        </Box>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '250px' }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Average Order Value
            </Typography>
            <Typography variant="h4" color="primary">
              $98.45
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +5% from last month
            </Typography>
          </StyledPaper>
        </Box>
        <Box sx={{ flex: '1 1 calc(25% - 24px)', minWidth: '250px' }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Customer Satisfaction
            </Typography>
            <Typography variant="h4" color="primary">
              4.8/5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +0.2 from last month
            </Typography>
          </StyledPaper>
        </Box>
      </Box>

      {/* Charts and Products Section */}
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 3
      }}>
        {/* Charts Section */}
        <Box sx={{ flex: '1 1 calc(66.67% - 24px)', minWidth: '300px' }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Sales Trend
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Chart will be implemented here
              </Typography>
            </Box>
          </StyledPaper>
        </Box>

        {/* Top Products Section */}
        <Box sx={{ flex: '1 1 calc(33.33% - 24px)', minWidth: '250px' }}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>
              Top Products
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                Product list will be implemented here
              </Typography>
            </Box>
          </StyledPaper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard; 