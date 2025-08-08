import React from 'react';
import {
  Box,
  Typography,
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
  height = 560 
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Variaciones
      </Typography>
      
      <Grid container spacing={2}>
        {variations.map((variation) => {
          // Create a mock bird object for the BirdImage component
          const mockBird = {
            id: `variation-${variation.id}`,
            commonName: variation.name,
            englishName: '',
            scientificName: '',
            family: '',
            order: '',
            habitat: [],
            status: '🏠 residente' as const,
            commonness: 'común' as const,
            origin: 'autóctona' as const,
            imageUrl: variation.imageUrl,
            ebirdEmbedUrl: variation.ebirdEmbedUrl,
          };

          return (
                         <Grid item xs={12} sm={6} md={variations.length === 2 ? 6 : 4} key={variation.id}>
               <Card sx={{ height: '100%' }}>
                                   <Box sx={{ position: 'relative' }}>
                    <BirdImage bird={mockBird} height={500} compact={true} />
                  </Box>
                 <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {variation.name}
                  </Typography>
                  
                  {variation.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {variation.description}
                    </Typography>
                  )}

                  {variation.characteristics && variation.characteristics.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Características:
                      </Typography>
                      <Grid container spacing={1}>
                        {variation.characteristics.map((characteristic, index) => (
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
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BirdVariations; 