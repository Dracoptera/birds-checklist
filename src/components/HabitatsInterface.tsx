import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
} from '@mui/material';

const HabitatsInterface: React.FC = () => {
  const habitats = [
    { name: 'ciudad', emoji: '🏙️', description: 'Áreas urbanas y suburbanas' },
    { name: 'monte', emoji: '🌲', description: 'Bosques y áreas forestales' },
    { name: 'pradera', emoji: '🌿', description: 'Campos abiertos y pastizales' },
    { name: 'sierra', emoji: '🌄', description: 'Zonas montañosas y serranías' },
    { name: 'bañado', emoji: '💧', description: 'Humedales y áreas acuáticas' },
  ];

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Hábitats
      </Typography>
      <Grid container spacing={2}>
        {habitats.map((habitat) => (
          <Grid item xs={12} sm={6} md={4} key={habitat.name}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h4">
                {habitat.emoji}
              </Typography>
              <Box>
                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                  {habitat.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {habitat.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default HabitatsInterface; 