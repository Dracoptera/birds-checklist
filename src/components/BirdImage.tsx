import React from 'react';
import { Box, Typography } from '@mui/material';
import { Image as ImageIcon } from '@mui/icons-material';
import { Bird } from '../data/uruguayBirds';
import EbirdEmbed from './EbirdEmbed';

interface BirdImageProps {
  bird: Bird;
  height?: number | string;
  showPlaceholder?: boolean;
}

const BirdImage: React.FC<BirdImageProps> = ({ 
  bird, 
  height = 315, 
  showPlaceholder = true 
}) => {
  // Priority: eBird embed > regular image > placeholder
  if (bird.ebirdEmbedUrl) {
    return <EbirdEmbed embedUrl={bird.ebirdEmbedUrl} height={height} />;
  }

  if (bird.imageUrl) {
    return (
      <Box
        sx={{
          height,
          backgroundImage: `url(${bird.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      />
    );
  }

  if (!showPlaceholder) return null;
  
  return (
    <Box
      sx={{
        height,
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #ccc',
      }}
    >
      <ImageIcon sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        Sin imagen
      </Typography>
      <Typography variant="caption" color="text.secondary" align="center">
        {bird.commonName}
      </Typography>
    </Box>
  );
};

export default BirdImage; 