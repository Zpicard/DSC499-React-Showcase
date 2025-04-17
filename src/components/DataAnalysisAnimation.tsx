import React, { useEffect, useRef, useState } from 'react';

interface ComputerPart {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  rotation: number;
  scale: number;
  speed: number;
  direction: number;
  isHovered: boolean;
}

const DataAnalysisAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [computerParts, setComputerParts] = useState<ComputerPart[]>([]);
  
  // Modern color palette
  const colors = {
    background: '#0A1929', // Navy blue background
    monitor: '#27C93F', // Green
    screen: '#0A1929', // Navy blue
    keyboard: '#27C93F', // Green
    mouse: '#27C93F', // Green
    cable: '#27C93F', // Green
    highlight: 'rgba(39, 201, 63, 0.8)',
    text: '#FFFFFF'
  };
  
  // Initialize canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateDimensions = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Initialize computer parts
    const initComputerParts = () => {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2 - 150; // Move everything up to align with design
      
      const parts: ComputerPart[] = [
        // Monitor
        {
          id: 'monitor',
          x: centerX,
          y: centerY - 100,
          width: 300,
          height: 200,
          color: colors.monitor,
          rotation: 0,
          scale: 1,
          speed: 0.001,
          direction: 1,
          isHovered: false
        },
        // Screen
        {
          id: 'screen',
          x: centerX,
          y: centerY - 100,
          width: 280,
          height: 180,
          color: colors.screen,
          rotation: 0,
          scale: 1,
          speed: 0.001,
          direction: 1,
          isHovered: false
        },
        // Monitor stand
        {
          id: 'stand',
          x: centerX,
          y: centerY + 20,
          width: 40,
          height: 80,
          color: colors.monitor,
          rotation: 0,
          scale: 1,
          speed: 0.001,
          direction: 1,
          isHovered: false
        },
        // Base
        {
          id: 'base',
          x: centerX,
          y: centerY + 80,
          width: 120,
          height: 20,
          color: colors.monitor,
          rotation: 0,
          scale: 1,
          speed: 0.001,
          direction: 1,
          isHovered: false
        },
        // Keyboard
        {
          id: 'keyboard',
          x: centerX - 150,
          y: centerY + 120,
          width: 200,
          height: 60,
          color: colors.keyboard,
          rotation: 0,
          scale: 1,
          speed: 0.002,
          direction: 1,
          isHovered: false
        },
        // Mouse
        {
          id: 'mouse',
          x: centerX + 150,
          y: centerY + 120,
          width: 40,
          height: 60,
          color: colors.mouse,
          rotation: 0,
          scale: 1,
          speed: 0.003,
          direction: 1,
          isHovered: false
        },
        // Cables
        {
          id: 'cable1',
          x: centerX - 100,
          y: centerY + 150,
          width: 10,
          height: 100,
          color: colors.cable,
          rotation: 0,
          scale: 1,
          speed: 0.001,
          direction: 1,
          isHovered: false
        },
        {
          id: 'cable2',
          x: centerX + 100,
          y: centerY + 150,
          width: 10,
          height: 100,
          color: colors.cable,
          rotation: 0,
          scale: 1,
          speed: 0.001,
          direction: 1,
          isHovered: false
        }
      ];
      
      setComputerParts(parts);
    };
    
    // Mouse event handlers for interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      // Check if mouse is over any part
      if (isVisible) {
        let found = false;
        
        computerParts.forEach(part => {
          const isOver = isPointInRect(x, y, part);
          if (isOver && !part.isHovered) {
            setHoveredPart(part.id);
            found = true;
          }
        });
        
        if (!found && hoveredPart) {
          setHoveredPart(null);
        }
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      if (hoveredPart) {
        setSelectedPart(hoveredPart);
      }
    };
    
    const handleMouseUp = () => {
      setSelectedPart(null);
    };
    
    const handleMouseLeave = () => {
      setHoveredPart(null);
      setSelectedPart(null);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Helper function to check if a point is inside a rectangle
    const isPointInRect = (x: number, y: number, part: ComputerPart) => {
      const halfWidth = part.width / 2;
      const halfHeight = part.height / 2;
      
      return (
        x >= part.x - halfWidth &&
        x <= part.x + halfWidth &&
        y >= part.y - halfHeight &&
        y <= part.y + halfHeight
      );
    };
    
    // Animation loop
    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (time: number) => {
      if (!ctx || !canvas) return;
      
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // Clear canvas
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      if (isVisible) {
        // Update computer parts
        const updatedParts = computerParts.map(part => {
          // Apply gentle movement
          let newRotation = part.rotation + part.speed * part.direction;
          
          // Change direction if rotation exceeds limits
          if (Math.abs(newRotation) > 0.05) {
            part.direction *= -1;
            newRotation = part.rotation + part.speed * part.direction;
          }
          
          // Apply gentle scaling
          let newScale = part.scale;
          if (part.id === hoveredPart) {
            newScale = 1.1;
          } else if (part.id === selectedPart) {
            newScale = 1.2;
          } else {
            newScale = 1 + Math.sin(time * 0.001) * 0.02;
          }
          
          return {
            ...part,
            rotation: newRotation,
            scale: newScale,
            isHovered: part.id === hoveredPart
          };
        });
        
        setComputerParts(updatedParts);
        
        // Draw computer parts
        updatedParts.forEach(part => {
          ctx.save();
          
          // Translate to part position
          ctx.translate(part.x, part.y);
          
          // Apply rotation
          ctx.rotate(part.rotation);
          
          // Apply scale
          ctx.scale(part.scale, part.scale);
          
          // Draw part
          ctx.fillStyle = part.isHovered ? colors.highlight : part.color;
          
          // Draw different shapes based on part type
          switch (part.id) {
            case 'monitor':
              // Monitor frame
              ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
              ctx.strokeStyle = '#FFFFFF';
              ctx.lineWidth = 2;
              ctx.strokeRect(-part.width / 2, -part.height / 2, part.width, part.height);
              break;
              
            case 'screen':
              // Screen
              ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
              
              // Draw some "data" on the screen
              ctx.fillStyle = '#27C93F';
              ctx.font = '12px Arial';
              ctx.textAlign = 'center';
              
              // Draw some lines to represent data
              for (let i = 0; i < 5; i++) {
                const y = -part.height / 2 + 30 + i * 30;
                const width = 100 + Math.sin(time * 0.001 + i) * 50;
                ctx.fillRect(-width / 2, y, width, 10);
              }
              
              // Draw some text
              ctx.fillStyle = '#FFFFFF';
              ctx.font = '14px Arial';
              ctx.fillText('Data Analysis', 0, -part.height / 2 + 20);
              break;
              
            case 'stand':
              // Monitor stand
              ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
              break;
              
            case 'base':
              // Base
              ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
              break;
              
            case 'keyboard':
              // Keyboard
              ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
              
              // Draw keys
              ctx.fillStyle = '#0A1929';
              const keySize = 15;
              const keySpacing = 20;
              const keysPerRow = 10;
              const rows = 3;
              
              for (let row = 0; row < rows; row++) {
                for (let col = 0; col < keysPerRow; col++) {
                  const keyX = -part.width / 2 + 20 + col * keySpacing;
                  const keyY = -part.height / 2 + 15 + row * keySpacing;
                  ctx.fillRect(keyX, keyY, keySize, keySize);
                }
              }
              break;
              
            case 'mouse':
              // Mouse
              ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
              
              // Draw mouse button
              ctx.fillStyle = '#0A1929';
              ctx.fillRect(-part.width / 4, -part.height / 2 + 5, part.width / 2, 5);
              break;
              
            case 'cable1':
            case 'cable2':
              // Cables
              ctx.fillRect(-part.width / 2, -part.height / 2, part.width, part.height);
              
              // Draw cable connector
              ctx.fillStyle = '#0A1929';
              ctx.fillRect(-part.width, -part.height / 2, part.width * 2, part.width * 2);
              break;
          }
          
          ctx.restore();
        });
        
        // Draw connections between parts
        ctx.strokeStyle = colors.cable;
        ctx.lineWidth = 3;
        
        // Connect monitor to stand
        const monitor = updatedParts.find(p => p.id === 'monitor');
        const stand = updatedParts.find(p => p.id === 'stand');
        
        if (monitor && stand) {
          ctx.beginPath();
          ctx.moveTo(monitor.x, monitor.y + monitor.height / 2);
          ctx.lineTo(stand.x, stand.y - stand.height / 2);
          ctx.stroke();
        }
        
        // Connect stand to base
        const base = updatedParts.find(p => p.id === 'base');
        
        if (stand && base) {
          ctx.beginPath();
          ctx.moveTo(stand.x, stand.y + stand.height / 2);
          ctx.lineTo(base.x, base.y - base.height / 2);
          ctx.stroke();
        }
        
        // Connect keyboard to base
        const keyboard = updatedParts.find(p => p.id === 'keyboard');
        
        if (keyboard && base) {
          ctx.beginPath();
          ctx.moveTo(keyboard.x + keyboard.width / 2, keyboard.y - keyboard.height / 2);
          ctx.lineTo(base.x - base.width / 3, base.y);
          ctx.stroke();
        }
        
        // Connect mouse to base
        const mouse = updatedParts.find(p => p.id === 'mouse');
        
        if (mouse && base) {
          ctx.beginPath();
          ctx.moveTo(mouse.x - mouse.width / 2, mouse.y - mouse.height / 2);
          ctx.lineTo(base.x + base.width / 3, base.y);
          ctx.stroke();
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Intersection Observer for scroll detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            
            // Initialize computer parts
            initComputerParts();
            
            // Stop observing after animation starts
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // Lower threshold to make it more sensitive
    );
    
    // Start observing
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Initialize computer parts immediately to ensure they're created
    initComputerParts();
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, isVisible, computerParts, hoveredPart, selectedPart]);
  
  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: colors.background,
        marginTop: '-100px', // Move the entire component up
        zIndex: 1, // Ensure it's above other elements
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute', // Position absolutely to ensure it covers the container
          top: 0,
          left: 0,
        }}
      />
    </div>
  );
};

export default DataAnalysisAnimation; 