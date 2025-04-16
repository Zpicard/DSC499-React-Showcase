import React from 'react';
import { Typography, Box } from '@mui/material';

const Predictions: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Predictions
      </Typography>
      <Typography variant="body1">
        Predictions dashboard content will be implemented here.
      </Typography>
    </Box>
  );
};

export default Predictions; 