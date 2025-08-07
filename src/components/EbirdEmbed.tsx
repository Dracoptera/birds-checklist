import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface EbirdEmbedProps {
  embedUrl: string;
  height?: number | string;
  width?: number | string;
  compact?: boolean;
}

const EbirdEmbed: React.FC<EbirdEmbedProps> = ({ 
  embedUrl, 
  height = 400, 
  width = '100%',
  compact = true
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [embedUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(compact && {
          '& iframe': {
            transform: 'scale(0.95)',
            transformOrigin: 'center center',
            width: '105.3%', // 100% / 0.95 to compensate for scale
            height: '105.3%', // 100% / 0.95 to compensate for scale
            objectFit: 'contain',
          }
        })
      }}
    >
      {isLoading && (
        <CircularProgress size={40} />
      )}
      <iframe
        src={embedUrl}
        height="100%"
        width="100%"
        frameBorder="0"
        allowFullScreen
        style={{
          border: 'none',
          borderRadius: '4px',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
        title="eBird Bird Image"
        onLoad={handleIframeLoad}
      />
    </Box>
  );
};

export default EbirdEmbed; 