import React from 'react';
import { Box, Paper, Typography, Tooltip, alpha, useTheme } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';
import LinkIcon from '@mui/icons-material/Link';

interface TableField {
  name: string;
  type: 'PK' | 'FK' | 'field';
}

interface TableInfo {
  name: string;
  fields: TableField[];
  position: { x: number; y: number };
}

interface Connection {
  from: string;
  to: string;
  relationship: 'one-to-many' | 'many-to-one';
}

// Update table positions to ensure all relationships are visible
const tables: TableInfo[] = [
  {
    name: 'Departments',
    fields: [
      { name: 'department_id', type: 'PK' },
      { name: 'department', type: 'field' },
    ],
    position: { x: 50, y: 80 }
  },
  {
    name: 'Products',
    fields: [
      { name: 'product_id', type: 'PK' },
      { name: 'product_name', type: 'field' },
      { name: 'aisle_id', type: 'FK' },
      { name: 'department_id', type: 'FK' },
    ],
    position: { x: 400, y: 80 }
  },
  {
    name: 'Orders',
    fields: [
      { name: 'order_id', type: 'PK' },
      { name: 'user_id', type: 'FK' },
      { name: 'order_number', type: 'field' },
      { name: 'order_dow', type: 'field' },
      { name: 'order_hour_of_day', type: 'field' },
      { name: 'days_since_prior_order', type: 'field' },
    ],
    position: { x: 400, y: 300 }
  },
  {
    name: 'Order Products Train',
    fields: [
      { name: 'order_id', type: 'FK' },
      { name: 'product_id', type: 'FK' },
      { name: 'add_to_cart_order', type: 'field' },
      { name: 'reordered', type: 'field' },
    ],
    position: { x: 750, y: 80 }
  },
  {
    name: 'Order Products Prior',
    fields: [
      { name: 'order_id', type: 'FK' },
      { name: 'product_id', type: 'FK' },
      { name: 'add_to_cart_order', type: 'field' },
      { name: 'reordered', type: 'field' },
    ],
    position: { x: 750, y: 300 }
  },
  {
    name: 'Aisles',
    fields: [
      { name: 'aisle_id', type: 'PK' },
      { name: 'aisle', type: 'field' },
    ],
    position: { x: 50, y: 300 }
  },
  {
    name: 'Users (Hypothetical)',
    fields: [
      { name: 'user_id', type: 'PK' },
      { name: 'name', type: 'field' },
      { name: 'email', type: 'field' },
    ],
    position: { x: 50, y: 520 }
  },
];

const connections: Connection[] = [
  { from: 'Departments', to: 'Products', relationship: 'one-to-many' },
  { from: 'Products', to: 'Aisles', relationship: 'many-to-one' },
  { from: 'Orders', to: 'Order Products Train', relationship: 'one-to-many' },
  { from: 'Orders', to: 'Order Products Prior', relationship: 'one-to-many' },
  { from: 'Products', to: 'Order Products Train', relationship: 'one-to-many' },
  { from: 'Products', to: 'Order Products Prior', relationship: 'one-to-many' },
];

const TableCard: React.FC<{ table: TableInfo }> = ({ table }) => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        background: alpha('#0A1929', 0.9),
        backdropFilter: 'blur(10px)',
        borderRadius: '6px',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
        width: '250px',
        boxShadow: `0 2px 10px ${alpha('#000', 0.15)}`,
        position: 'absolute',
        left: table.position.x,
        top: table.position.y,
        zIndex: 1,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        }
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: 500,
          mb: 2,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          pb: 1,
          fontSize: '0.95rem',
          letterSpacing: '0.5px',
        }}
      >
        {table.name}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
        {table.fields.map((field) => (
          <Box
            key={field.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: alpha(theme.palette.common.white, 0.85),
              p: 0.5,
              fontSize: '0.85rem',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: alpha(theme.palette.common.white, 1),
                background: alpha(theme.palette.primary.main, 0.1),
                borderRadius: '4px',
              }
            }}
          >
            {field.type === 'PK' && (
              <Tooltip title="Primary Key">
                <KeyIcon sx={{ color: theme.palette.warning.main, fontSize: '0.9rem' }} />
              </Tooltip>
            )}
            {field.type === 'FK' && (
              <Tooltip title="Foreign Key">
                <LinkIcon sx={{ color: theme.palette.info.main, fontSize: '0.9rem' }} />
              </Tooltip>
            )}
            {field.type === 'field' && (
              <Box sx={{ width: '0.9rem' }} />
            )}
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {field.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

// Refined connection line with thinner lines
const ConnectionLine: React.FC<{
  from: { x: number, y: number };
  to: { x: number, y: number };
  relationship: string;
}> = ({ from, to, relationship }) => {
  const theme = useTheme();
  
  // Calculate midpoint for relationship label
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  
  return (
    <g>
      {/* White background for better visibility */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="white"
        strokeWidth={4}
        strokeOpacity={0.5}
      />
      
      {/* Main connection line - straight and clear */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={theme.palette.primary.main}
        strokeWidth={2}
        strokeDasharray="5,5"
      />
      
      {/* Arrow at the end */}
      <path
        d={`M ${to.x - 10} ${to.y - 5} L ${to.x} ${to.y} L ${to.x - 10} ${to.y + 5}`}
        stroke={theme.palette.primary.main}
        strokeWidth={2}
        fill="white"
      />
      
      {/* Relationship label with white background */}
      <rect
        x={midX - 15}
        y={midY - 10}
        width={30}
        height={20}
        fill="white"
        rx={3}
      />
      
      <text
        x={midX}
        y={midY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={theme.palette.primary.main}
        fontSize="10px"
        fontWeight="bold"
      >
        {relationship === 'one-to-many' ? '1:N' : 'N:1'}
      </text>
    </g>
  );
};

const DatabaseSchema: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      position: 'relative', 
      minHeight: '700px',
      width: '100%',
      overflow: 'visible'
    }}>
      {/* SVG for connections - must be first and full size */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '1200px',
          height: '800px',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        {connections.map((connection, index) => {
          const fromTable = tables.find(t => t.name === connection.from);
          const toTable = tables.find(t => t.name === connection.to);
          
          if (!fromTable || !toTable) return null;
          
          // Adjust positions to account for card center
          const fromX = fromTable.position.x + 125;
          const fromY = fromTable.position.y + 75;
          const toX = toTable.position.x + 125;
          const toY = toTable.position.y + 75;
          
          return (
            <ConnectionLine
              key={`${connection.from}-${connection.to}-${index}`}
              from={{ x: fromX, y: fromY }}
              to={{ x: toX, y: toY }}
              relationship={connection.relationship}
            />
          );
        })}
      </svg>

      {/* Tables */}
      {tables.map((table) => (
        <TableCard key={table.name} table={table} />
      ))}
    </Box>
  );
};

export default DatabaseSchema; 