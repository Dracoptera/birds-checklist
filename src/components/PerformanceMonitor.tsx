import React, { useState, useEffect } from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface PerformanceMetrics {
  totalImages: number;
  loadedImages: number;
  cachedImages: number;
  renderTime: number;
  memoryUsage?: number;
}

interface PerformanceMonitorProps {
  metrics: PerformanceMetrics;
  isVisible?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  metrics, 
  isVisible = false 
}) => {
  if (!isVisible) return null;

  const loadingProgress = metrics.totalImages > 0 
    ? Math.round((metrics.loadedImages / metrics.totalImages) * 100) 
    : 0;

  const cacheHitRate = metrics.totalImages > 0 
    ? Math.round((metrics.cachedImages / metrics.totalImages) * 100) 
    : 0;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: 2,
        borderRadius: 2,
        zIndex: 1000,
        minWidth: 200,
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        Performance Monitor
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Chip 
          label={`Images: ${metrics.loadedImages}/${metrics.totalImages}`}
          size="small"
          color={loadingProgress === 100 ? 'success' : 'warning'}
        />
        
        <Chip 
          label={`Cache: ${cacheHitRate}%`}
          size="small"
          color={cacheHitRate > 50 ? 'success' : 'default'}
        />
        
        <Chip 
          label={`Render: ${metrics.renderTime}ms`}
          size="small"
          color={metrics.renderTime < 100 ? 'success' : 'warning'}
        />
        
        {metrics.memoryUsage && (
          <Chip 
            label={`Memory: ${Math.round(metrics.memoryUsage / 1024 / 1024)}MB`}
            size="small"
            color="info"
          />
        )}
      </Box>
    </Box>
  );
};

export default PerformanceMonitor;
