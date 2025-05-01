import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Chip,
  Collapse,
  IconButton,
  useTheme,
  alpha,
  Container,
  Fade,
  Grow,
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`model-tabpanel-${index}`}
      aria-labelledby={`model-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const PerformanceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(12px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
    background: alpha(theme.palette.background.paper, 0.85),
  },
}));

const MetricChip = styled(Chip)(({ theme }) => ({
  height: '48px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

const ModelPerformance: React.FC = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    linear: false,
    randomForest: false,
    xgboost: false,
    lightgbm: false,
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleExpandClick = (model: string) => {
    setExpanded({ ...expanded, [model]: !expanded[model] });
  };

  const models = [
    {
      name: 'Linear Regression',
      code: `from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_absolute_error, mean_squared_error

# Initialize and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
r2 = r2_score(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
rmse = mean_squared_error(y_test, y_pred, squared=False)`,
      metrics: {
        r2: 0.75,
        mae: 0.45,
        rmse: 0.62,
      },
    },
    {
      name: 'Random Forest',
      code: `from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10]
}

# Initialize and train the model with grid search
model = RandomForestRegressor(random_state=42)
grid_search = GridSearchCV(model, param_grid, cv=5, scoring='r2')
grid_search.fit(X_train, y_train)

# Get best model and make predictions
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)`,
      metrics: {
        r2: 0.82,
        mae: 0.38,
        rmse: 0.55,
      },
      hyperparameters: {
        n_estimators: 200,
        max_depth: 20,
        min_samples_split: 5,
      },
    },
    {
      name: 'XGBoost',
      code: `import xgboost as xgb
from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.2]
}

# Initialize and train the model with grid search
model = xgb.XGBRegressor(random_state=42)
grid_search = GridSearchCV(model, param_grid, cv=5, scoring='r2')
grid_search.fit(X_train, y_train)

# Get best model and make predictions
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)`,
      metrics: {
        r2: 0.85,
        mae: 0.35,
        rmse: 0.48,
      },
      hyperparameters: {
        n_estimators: 300,
        max_depth: 5,
        learning_rate: 0.1,
      },
    },
    {
      name: 'LightGBM',
      code: `import lightgbm as lgb
from sklearn.model_selection import GridSearchCV

# Define parameter grid
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.2]
}

# Initialize and train the model with grid search
model = lgb.LGBMRegressor(random_state=42)
grid_search = GridSearchCV(model, param_grid, cv=5, scoring='r2')
grid_search.fit(X_train, y_train)

# Get best model and make predictions
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)`,
      metrics: {
        r2: 0.87,
        mae: 0.32,
        rmse: 0.45,
      },
      hyperparameters: {
        n_estimators: 300,
        max_depth: 7,
        learning_rate: 0.1,
      },
    },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        py: 8,
        background: `linear-gradient(180deg, ${alpha(
          theme.palette.background.default,
          0.8
        )} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
        backdropFilter: 'blur(10px)',
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component={motion.h2}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{
            mb: 6,
            textAlign: 'center',
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textShadow: `0 2px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
          }}
        >
          Model Performance & Tuning
        </Typography>

        <Paper
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          sx={{
            background: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(12px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              '& .MuiTab-root': {
                color: theme.palette.text.secondary,
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                },
                '&:hover': {
                  color: theme.palette.primary.main,
                  background: alpha(theme.palette.primary.main, 0.05),
                },
              },
            }}
          >
            {models.map((model, index) => (
              <Tab
                key={model.name}
                label={model.name}
                id={`model-tab-${index}`}
                aria-controls={`model-tabpanel-${index}`}
                icon={
                  index === 0 ? (
                    <CodeIcon />
                  ) : index === 1 ? (
                    <SpeedIcon />
                  ) : index === 2 ? (
                    <TuneIcon />
                  ) : (
                    <StarIcon />
                  )
                }
                iconPosition="start"
              />
            ))}
          </Tabs>

          {models.map((model, index) => (
            <TabPanel key={model.name} value={value} index={index}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 3,
                  p: 3,
                }}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  sx={{ flex: 1, minWidth: { xs: '100%', md: '45%' } }}
                >
                  <PerformanceCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <CodeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" color="primary">
                        Training Code
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        position: 'relative',
                        '& pre': {
                          margin: 0,
                          borderRadius: 2,
                          boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
                        },
                      }}
                    >
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          padding: '16px',
                        }}
                      >
                        {model.code}
                      </SyntaxHighlighter>
                    </Box>
                  </PerformanceCard>
                </Box>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  sx={{ flex: 1, minWidth: { xs: '100%', md: '45%' } }}
                >
                  <PerformanceCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SpeedIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" color="primary">
                        Performance Metrics
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}
                    >
                      <MetricChip
                        label={`R²: ${model.metrics.r2}`}
                        color="primary"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`MAE: ${model.metrics.mae}`}
                        color="secondary"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`RMSE: ${model.metrics.rmse}`}
                        color="info"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                    </Box>

                    {model.hyperparameters && (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 3,
                            cursor: 'pointer',
                            p: 1,
                            borderRadius: 1,
                            '&:hover': {
                              background: alpha(theme.palette.primary.main, 0.05),
                            },
                          }}
                          onClick={() =>
                            handleExpandClick(model.name.toLowerCase().replace(' ', ''))
                          }
                        >
                          <TuneIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="subtitle1" color="primary">
                            Hyperparameters
                          </Typography>
                          <IconButton
                            sx={{
                              transform: expanded[
                                model.name.toLowerCase().replace(' ', '')
                              ]
                                ? 'rotate(180deg)'
                                : 'rotate(0)',
                              transition: 'transform 0.3s',
                              ml: 'auto',
                            }}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Box>
                        <Collapse
                          in={expanded[model.name.toLowerCase().replace(' ', '')]}
                        >
                          <Box
                            sx={{
                              mt: 2,
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 1,
                            }}
                          >
                            {Object.entries(model.hyperparameters).map(
                              ([key, value]) => (
                                <Chip
                                  key={key}
                                  label={`${key}: ${value}`}
                                  sx={{
                                    m: 0.5,
                                    background: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    '&:hover': {
                                      background: alpha(theme.palette.primary.main, 0.2),
                                    },
                                  }}
                                />
                              )
                            )}
                          </Box>
                        </Collapse>
                      </>
                    )}
                  </PerformanceCard>
                </Box>
              </Box>
            </TabPanel>
          ))}
        </Paper>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          sx={{ mt: 6, textAlign: 'center' }}
        >
          <Paper
            sx={{
              p: 4,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.1
              )} 0%, ${alpha(theme.palette.primary.main, 0.2)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              borderRadius: 3,
              display: 'inline-block',
              boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.15)}`,
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.2)}`,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <StarIcon
                sx={{
                  fontSize: 32,
                  color: theme.palette.primary.main,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              />
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                Best Performing Model: LightGBM
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                color: theme.palette.text.secondary,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Achieved the highest R² score of 0.87 with optimized hyperparameters,
              demonstrating superior predictive power and generalization capabilities.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ModelPerformance; 