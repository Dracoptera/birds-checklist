import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Grid,
} from '@mui/material';
import { BirdVariation } from '../data/uruguayBirds';
import BirdImage from './BirdImage';

interface BirdVariationsProps {
  variations: BirdVariation[];
  onVariationChange?: (variation: BirdVariation) => void;
  height?: number;
}

const BirdVariations: React.FC<BirdVariationsProps> = ({ 
  variations, 
  onVariationChange,
  height = 300 
}) => {
  const [selectedVariation, setSelectedVariation] = useState<BirdVariation>(variations[0]);

  const handleVariationChange = (event: React.SyntheticEvent, newValue: number) => {
    const variation = variations[newValue];
    setSelectedVariation(variation);
    onVariationChange?.(variation);
  };

  // Create a mock bird object for the BirdImage component
  const mockBird = {
    id: 'variation',
    commonName: selectedVariation.name,
    scientificName: '',
    family: '',
    order: '',
    habitat: [],
    status: 'resident' as const,
    commonness: 'común' as const,
    imageUrl: selectedVariation.imageUrl,
    ebirdEmbedUrl: selectedVariation.ebirdEmbedUrl,
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Variaciones
      </Typography>
      
      <Tabs 
        value={variations.findIndex(v => v.id === selectedVariation.id)} 
        onChange={handleVariationChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {variations.map((variation) => (
          <Tab 
            key={variation.id} 
            label={variation.name}
            sx={{ minWidth: 'auto' }}
          />
        ))}
      </Tabs>

      <Card sx={{ mb: 2 }}>
        <BirdImage bird={mockBird} height={height} compact={false} />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {selectedVariation.name}
          </Typography>
          
          {selectedVariation.description && (
            <Typography variant="body2" color="text.secondary" paragraph>
              {selectedVariation.description}
            </Typography>
          )}

          {selectedVariation.characteristics && selectedVariation.characteristics.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Características:
              </Typography>
              <Grid container spacing={1}>
                {selectedVariation.characteristics.map((characteristic, index) => (
                  <Grid item key={index}>
                    <Chip 
                      label={characteristic} 
                      size="small" 
                      variant="outlined"
                      color="primary"
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default BirdVariations; 