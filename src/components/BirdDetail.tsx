import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Paper,
  Divider,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  PhotoCamera as PhotoCameraIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Notes as NotesIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { uruguayBirds } from '../data/uruguayBirds';
import { useUserData } from '../contexts/UserDataContext';
import BirdImage from './BirdImage';

const BirdDetail: React.FC = () => {
  const { birdId } = useParams<{ birdId: string }>();
  const navigate = useNavigate();
  const { state, toggleSeen, togglePhoto, addObservation, removeObservation } = useUserData();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newObservation, setNewObservation] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    notes: '',
    photoUrl: '',
  });

  const bird = uruguayBirds.find(b => b.id === birdId);
  const observation = state.observations[birdId!];

  if (!bird) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error">
          Ave no encontrada
        </Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Volver al checklist
        </Button>
      </Box>
    );
  }

  const handleAddObservation = () => {
    if (newObservation.date && newObservation.location) {
      addObservation(birdId!, {
        date: newObservation.date,
        location: newObservation.location,
        notes: newObservation.notes || undefined,
        photoUrl: newObservation.photoUrl || undefined,
      });
      
      setNewObservation({
        date: new Date().toISOString().split('T')[0],
        location: '',
        notes: '',
        photoUrl: '',
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleRemoveObservation = (observationId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta observación?')) {
      removeObservation(birdId!, observationId);
    }
  };

  return (
    <Box>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>
        ← Volver al checklist
      </Button>

      <Card sx={{ mb: 3 }}>
        <BirdImage bird={bird} height={415} />
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {bird.commonName}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                {bird.scientificName}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={observation?.seen ? 'Marcar como no visto' : 'Marcar como visto'}>
                <IconButton
                  size="large"
                  onClick={() => toggleSeen(birdId!)}
                  color={observation?.seen ? 'success' : 'default'}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={observation?.hasPhoto ? 'Marcar como sin foto' : 'Marcar como con foto'}>
                <IconButton
                  size="large"
                  onClick={() => togglePhoto(birdId!)}
                  color={observation?.hasPhoto ? 'primary' : 'default'}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Chip label={bird.family} color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
              <Chip label={bird.order} color="secondary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              {bird.habitat.map(habitat => (
                <Chip 
                  key={habitat} 
                  label={habitat} 
                  size="small" 
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Chip 
              label={observation?.seen ? 'Visto' : 'No visto'} 
              color={observation?.seen ? 'success' : 'default'}
              icon={<VisibilityIcon />}
            />
            <Chip 
              label={observation?.hasPhoto ? 'Con foto' : 'Sin foto'} 
              color={observation?.hasPhoto ? 'primary' : 'default'}
              icon={<PhotoCameraIcon />}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Observations Section */}
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Observaciones ({observation?.observations.length || 0})
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Agregar Observación
          </Button>
        </Box>

        {observation?.observations && observation.observations.length > 0 ? (
          <List>
            {observation.observations.map((obs, index) => (
              <React.Fragment key={obs.id}>
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {new Date(obs.date).toLocaleDateString('es-ES')}
                        </Typography>
                        <Tooltip title="Eliminar observación">
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveObservation(obs.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2">
                            {obs.location}
                          </Typography>
                        </Box>
                        {obs.notes && (
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                            <NotesIcon fontSize="small" sx={{ mr: 1, mt: 0.5, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {obs.notes}
                            </Typography>
                          </Box>
                        )}
                        {obs.photoUrl && (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="primary">
                              📷 Foto disponible
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                {index < observation.observations.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No hay observaciones registradas para esta ave
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => setIsAddDialogOpen(true)}
              sx={{ mt: 2 }}
            >
              Agregar Primera Observación
            </Button>
          </Box>
        )}
      </Paper>

      {/* Add Observation Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Agregar Observación - {bird.commonName}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fecha"
                type="date"
                value={newObservation.date}
                onChange={(e) => setNewObservation(prev => ({ ...prev, date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ubicación"
                value={newObservation.location}
                onChange={(e) => setNewObservation(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Ej: Parque Rodó, Montevideo"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notas (opcional)"
                multiline
                rows={3}
                value={newObservation.notes}
                onChange={(e) => setNewObservation(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Detalles de la observación, comportamiento, etc."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL de foto (opcional)"
                value={newObservation.photoUrl}
                onChange={(e) => setNewObservation(prev => ({ ...prev, photoUrl: e.target.value }))}
                placeholder="https://ejemplo.com/foto.jpg"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleAddObservation}
            variant="contained"
            disabled={!newObservation.date || !newObservation.location}
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BirdDetail; 