import React from 'react';
import { Box } from '@mui/material';

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
  return (
    <Box
      sx={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
        ...(compact && {
          '& iframe': {
            transform: 'scale(0.85)',
            transformOrigin: 'top left',
            width: '117.6%', // 100% / 0.85 to compensate for scale
            height: '117.6%', // 100% / 0.85 to compensate for scale
          }
        })
      }}
    >
      <iframe
        src={embedUrl}
        height={height}
        width={width}
        frameBorder="0"
        allowFullScreen
        style={{
          border: 'none',
          borderRadius: '4px',
        }}
        title="eBird Bird Image"
      />
    </Box>
  );
};

export default EbirdEmbed; 