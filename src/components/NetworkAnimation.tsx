import React, { useEffect, useRef } from 'react';
import { Box, useTheme, alpha } from '@mui/material';
import { alpha as muiAlpha } from '@mui/material/styles';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const NetworkAnimation: React.FC = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  
  // Define light navy blue color
  const lightNavyBlue = '#4A6FA5';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize points
    const initPoints = () => {
      const points: Point[] = [];
      // Increase the number of points by reducing the divisor
      const numPoints = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slower movement
          vy: (Math.random() - 0.5) * 0.3, // Slower movement
          size: Math.random() * 1.5 + 0.5, // Smaller points
        });
      }
      pointsRef.current = points;
    };
    initPoints();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with a slight fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create gradient background - nice light green
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#81c784'); // Light green at top
      gradient.addColorStop(1, '#66bb6a'); // Slightly darker light green at bottom
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      const points = pointsRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < points.length; i++) {
        const point = points[i];

        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 80; // Reduced mouse influence radius

        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (maxDistance - distance) / maxDistance;
          point.vx -= Math.cos(angle) * force * 0.3; // Reduced repel strength
          point.vy -= Math.sin(angle) * force * 0.3; // Reduced repel strength
        }

        // Draw connections
        for (let j = i + 1; j < points.length; j++) {
          const otherPoint = points[j];
          const dx = otherPoint.x - point.x;
          const dy = otherPoint.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100; // Reduced connection distance

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15; // Reduced opacity
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle = muiAlpha(lightNavyBlue, opacity);
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.stroke();
          }
        }

        // Draw point with glow effect
        const glowRadius = 2 * point.size; // Reduced glow radius
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, glowRadius
        );
        gradient.addColorStop(0, muiAlpha(lightNavyBlue, 0.6)); // Reduced glow opacity
        gradient.addColorStop(1, muiAlpha(lightNavyBlue, 0));
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw point core
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = muiAlpha(lightNavyBlue, 0.7); // Reduced point opacity
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.dark, 0.97)} 0%, 
          ${alpha(theme.palette.primary.main, 0.95)} 100%
        )`,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default NetworkAnimation; 