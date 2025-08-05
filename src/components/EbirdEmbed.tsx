import React from 'react';
import { Box } from '@mui/material';

interface EbirdEmbedProps {
  embedUrl: string;
  height?: number | string;
  width?: number | string;
}

const EbirdEmbed: React.FC<EbirdEmbedProps> = ({ 
  embedUrl, 
  height = 415, 
  width = '100%' 
}) => {
  return (
    <Box
      sx={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1,
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