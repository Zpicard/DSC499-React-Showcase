import React, { useEffect, useRef } from 'react';
import { Box, useTheme } from '@mui/material';

declare global {
  interface Window {
    mermaid: any;
  }
}

const MermaidDiagram: React.FC = () => {
  const theme = useTheme();
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMermaid = async () => {
      // Load Mermaid from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@9.4.3/dist/mermaid.min.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          themeVariables: {
            primaryColor: '#40B5AD',
            primaryTextColor: '#fff',
            primaryBorderColor: '#40B5AD',
            lineColor: '#40B5AD',
            secondaryColor: '#006064',
            tertiaryColor: '#0A1929'
          }
        });

        renderDiagram();
      };
    };

    const renderDiagram = async () => {
      if (mermaidRef.current && window.mermaid) {
        mermaidRef.current.innerHTML = '';
        const diagram = `
          erDiagram
            Departments {
              PK department_id
              department
            }
            Products {
              PK product_id
              product_name
              FK aisle_id
              FK department_id
            }
            Orders {
              PK order_id
              user_id
              eval_set
              order_number
              order_dow
              order_hour_of_day
              days_since_prior_order
            }
            "Order Products Train" {
              FK order_id
              FK product_id
              add_to_cart_order
              reordered
            }
            "Order Products Prior" {
              FK order_id
              FK product_id
              add_to_cart_order
              reordered
            }
            Aisles {
              PK aisle_id
              aisle
            }
            "Users (Hypothetical)" {
              PK user_id
              A01
              A02
              A03
            }

            Departments ||--o{ Products : contains
            Products }o--|| Aisles : belongs_to
            Orders ||--o{ "Order Products Train" : contains
            Orders ||--o{ "Order Products Prior" : contains
            Products ||--o{ "Order Products Train" : contains
            Products ||--o{ "Order Products Prior" : contains
        `;

        try {
          const { svg } = await window.mermaid.render('mermaid-diagram', diagram);
          mermaidRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
        }
      }
    };

    loadMermaid();

    return () => {
      // Cleanup script on unmount
      const script = document.querySelector('script[src*="mermaid"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Box
      ref={mermaidRef}
      sx={{
        background: 'transparent',
        borderRadius: '16px',
        p: 3,
        width: '100%',
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& svg': {
          maxWidth: '100%',
          height: 'auto',
          '& .er.entityBox': {
            fill: 'rgba(10, 25, 41, 0.7)',
            stroke: theme.palette.primary.main,
            rx: '8px',
            ry: '8px',
          },
          '& .er.entityLabel': {
            fill: theme.palette.common.white,
            'font-family': theme.typography.fontFamily,
            'font-weight': 600,
          },
          '& .er.attributeBoxOdd, & .er.attributeBoxEven': {
            fill: 'rgba(10, 25, 41, 0.4)',
          },
          '& .er.relationshipLine': {
            stroke: theme.palette.primary.main,
            'stroke-width': '2px',
          },
          '& .er.relationshipLabelBox': {
            fill: 'transparent',
          },
          '& .er.relationshipLabel': {
            fill: theme.palette.common.white,
            'font-family': theme.typography.fontFamily,
          },
        },
      }}
    />
  );
};

export default MermaidDiagram; 