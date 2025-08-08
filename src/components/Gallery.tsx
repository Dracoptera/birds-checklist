import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { GalleryImage } from '../data/birds';
import BirdImage from './BirdImage';

interface GalleryProps {
  images: GalleryImage[];
  onImageClick?: (image: GalleryImage) => void;
  height?: number;
}

const Gallery: React.FC<GalleryProps> = ({ 
  images, 
  onImageClick,
  height = 560 
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Galería
      </Typography>
      
             <Grid container spacing={2} justifyContent={images.length === 1 ? 'center' : 'flex-start'}>
         {images.map((image) => {
           // Create a mock bird object for the BirdImage component
           const mockBird = {
             id: `gallery-${image.id}`,
             commonName: image.title,
             englishName: '',
             scientificName: '',
             family: '',
             order: '',
             habitat: [],
             status: '🏠 residente' as const,
             commonness: 'común' as const,
             origin: 'autóctona' as const,
             imageUrl: image.imageUrl,
             ebirdEmbedUrl: image.ebirdEmbedUrl,
           };

           return (
             <Grid item xs={12} sm={6} md={images.length === 1 ? 8 : images.length === 2 ? 6 : 4} key={image.id}>
               <Card>
                 <Box sx={{ position: 'relative', height: image.cardHeight || 500 }}>
                   <BirdImage bird={mockBird} height="100%" compact={true} />
                 </Box>
                 <CardContent>
                   <Typography variant="h6" gutterBottom>
                     {image.title}
                   </Typography>
                   
                   {image.description && (
                     <Typography variant="body2" color="text.secondary" paragraph>
                       {image.description}
                     </Typography>
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

export default Gallery;
