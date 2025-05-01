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
      name: 'Logistic Regression',
      code: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split

features = ['reordered_count', 'order_count', 'last_order_dow', 
            'last_order_hour', 'days_since_last_order']
X = train_features[features]
y = train_features['reordered']
X = X.fillna(0)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
model = LogisticRegression(max_iter=1000, random_state=42)
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")

# Print classification report
print("Classification Report:")
print(classification_report(y_test, y_pred))`,
      metrics: {
        accuracy: 0.9797,
        precision_0: 0.95,
        recall_0: 1.00,
        f1_0: 0.97,
        precision_1: 1.00,
        recall_1: 0.97,
        f1_1: 0.98,
        support_0: 518,
        support_1: 812,
      },
    },
    {
      name: 'Random Forest',
      code: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Define the features (X) and target (y)
X = train_features[['reorder_count', 'order_count', 'mean_order_hour', 'days_since_last_order']]
y = train_features['reordered']  # Target is the reordered column

# Split the data into training and testing sets for model evaluation
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the Random Forest classifier
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
rf_model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = rf_model.predict(X_test)

# Evaluate the model's accuracy
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print("Classification Report:")
print(classification_report(y_test, y_pred))`,
      metrics: {
        accuracy: 0.9852,
        precision_0: 0.97,
        recall_0: 1.00,
        f1_0: 0.98,
        precision_1: 1.00,
        recall_1: 0.97,
        f1_1: 0.99,
        support_0: 57,
        support_1: 78,
      },
      hyperparameters: {
        n_estimators: 100,
        random_state: 42,
      },
    },
    {
      name: 'XGBoost',
      code: `# XGBoost Classifier - Summarized Version

import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from Load_Data_From_SQL import create_connection, query_to_dataframe_for_users

# Load and preprocess data
connection = create_connection()
df = query_to_dataframe_for_users(connection, 1, 100)
df_prior = df[df['eval_set'] == 'prior']
df_train = df[df['eval_set'] == 'train']

# Feature engineering
prior_features = df_prior.groupby(['user_id', 'product_id']).agg(
    reorder_count=('reordered', 'sum'),
    order_count=('order_id', 'nunique'),
    mean_order_hour=('order_hour_of_day', 'mean'),
    days_since_last_order=('days_since_prior_order', 'mean')
).reset_index()

train_features = df_train.merge(prior_features, on=['user_id', 'product_id'], how='left')

# Prepare data for training
X = train_features[['reorder_count', 'order_count', 'mean_order_hour', 'days_since_last_order']]
y = train_features['reordered']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
dtrain = xgb.DMatrix(X_train, label=y_train)
dtest = xgb.DMatrix(X_test, label=y_test)

# Train XGBoost model
params = {
    'objective': 'binary:logistic',
    'eval_metric': 'logloss',
    'max_depth': 6,
    'learning_rate': 0.1,
    'subsample': 0.8,
    'colsample_bytree': 0.8
}
bst = xgb.train(params, dtrain, num_boost_round=100)

# Evaluate model
y_pred_prob = bst.predict(dtest)
y_pred = [1 if i > 0.5 else 0 for i in y_pred_prob]
print(f"Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print("Classification Report:")
print(classification_report(y_test, y_pred))`,
      metrics: {
        accuracy: 0.9852,
        precision_0: 0.97,
        recall_0: 1.00,
        f1_0: 0.98,
        precision_1: 1.00,
        recall_1: 0.97,
        f1_1: 0.99,
        support_0: 57,
        support_1: 78,
      },
      hyperparameters: {
        objective: 'binary:logistic',
        eval_metric: 'logloss',
        max_depth: 6,
        learning_rate: 0.1,
        subsample: 0.8,
        colsample_bytree: 0.8,
        num_boost_round: 100,
      },
    },
    {
      name: 'LightGBM',
      code: `import lightgbm as lgb
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
from Load_Data_From_SQL import create_connection, query_to_dataframe_for_users

# Establish SQL connection and load the dataset
connection = create_connection()
df = query_to_dataframe_for_users(connection, 1, 200)  # Fetching 200 samples

# Split dataset into prior and train sets
df_prior = df[df['eval_set'] == 'prior']
df_train = df[df['eval_set'] == 'train']

# Feature Engineering: Aggregate features from prior data
prior_features = df_prior.groupby(['user_id', 'product_id']).agg(
    reorder_count=('reordered', 'sum'),
    order_count=('order_id', 'nunique'),
    mean_order_hour=('order_hour_of_day', 'mean'),
    days_since_last_order=('days_since_prior_order', 'mean')
).reset_index()

# Merge aggregated features into the train dataset
train_features = df_train.merge(prior_features, on=['user_id', 'product_id'], how='left')

# Fill missing values (NaN) with 0 to prevent training issues
train_features.fillna(0, inplace=True)

# Define feature set (X) and target variable (y)
X = train_features[['reorder_count', 'order_count', 'mean_order_hour', 'days_since_last_order']]
y = train_features['reordered']

# Split into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the LightGBM Classifier with optimized hyperparameters
lgbm_model = lgb.LGBMClassifier(
    objective='binary',
    metric='binary_error',
    num_leaves=31,
    learning_rate=0.1,
    n_estimators=100,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

# Train the model
lgbm_model.fit(X_train, y_train)

# Make predictions
y_pred = lgbm_model.predict(X_test)

# Calculate and print accuracy score
accuracy = accuracy_score(y_test, y_pred)
print(f"\nTotal Model Accuracy: {accuracy:.4f}")

# Print classification report
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Plot feature importance
plt.figure(figsize=(10, 6))
lgb.plot_importance(lgbm_model, max_num_features=10, importance_type='split')
plt.title("Feature Importance - LightGBM")
plt.show()`,
      metrics: {
        accuracy: 0.9887,
        precision_0: 0.97,
        recall_0: 1.00,
        f1_0: 0.98,
        precision_1: 1.00,
        recall_1: 0.98,
        f1_1: 0.99,
        support_0: 94,
        support_1: 172,
      },
      hyperparameters: {
        objective: 'binary',
        metric: 'binary_error',
        num_leaves: 31,
        learning_rate: 0.1,
        n_estimators: 100,
        subsample: 0.8,
        colsample_bytree: 0.8,
        random_state: 42,
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
                        label={`Accuracy: ${model.metrics.accuracy}`}
                        color="primary"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`Precision (0): ${model.metrics.precision_0}`}
                        color="secondary"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`Recall (0): ${model.metrics.recall_0}`}
                        color="info"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`F1 (0): ${model.metrics.f1_0}`}
                        color="success"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`Precision (1): ${model.metrics.precision_1}`}
                        color="secondary"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`Recall (1): ${model.metrics.recall_1}`}
                        color="info"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`F1 (1): ${model.metrics.f1_1}`}
                        color="success"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`Support (0): ${model.metrics.support_0}`}
                        color="warning"
                        sx={{ width: '30%', minWidth: '120px' }}
                      />
                      <MetricChip
                        label={`Support (1): ${model.metrics.support_1}`}
                        color="warning"
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
              Achieved the highest accuracy of 0.9887 with balanced precision and recall across both classes, demonstrating superior classification performance and generalization capabilities.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default ModelPerformance; 