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
  Info as InfoIcon,
  Nature as NatureIcon,
  Map as MapIcon,
  VolumeUp as VolumeIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { uruguayBirds } from '../data/uruguayBirds';
import { useUserData } from '../contexts/UserDataContext';
import BirdImage from './BirdImage';
import BirdVariations from './BirdVariations';

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
        <BirdImage bird={bird} height={500} compact={false} />
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

          {bird.departamentos && bird.departamentos.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Departamentos:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {bird.departamentos.map(departamento => (
                  <Chip 
                    key={departamento} 
                    label={departamento} 
                    size="small" 
                    color="info" 
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

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

      {/* Variations Section */}
      {bird.variations && bird.variations.length > 0 && (
        <Paper sx={{ p: 2, mb: 3 }}>
          <BirdVariations 
            variations={bird.variations} 
            height={400}
            onVariationChange={(variation) => {
              console.log('Selected variation:', variation);
              // Here you could track which variation was viewed
            }}
          />
        </Paper>
      )}

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

      {/* Additional Information Sections */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Description Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Descripción</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              {bird.description?.general || 
                'Esta especie se caracteriza por su plumaje distintivo y comportamiento único. ' +
                'Los adultos presentan dimorfismo sexual, con los machos exhibiendo colores más vibrantes ' +
                'durante la época reproductiva.'
              }
            </Typography>
            <Typography variant="body2" paragraph>
              {bird.description?.behavior?.feeding ? 
                `Alimentación: ${bird.description.behavior.feeding}` :
                'Su canto es melodioso y puede ser escuchado principalmente durante las primeras horas ' +
                'de la mañana y al atardecer. La especie es conocida por su adaptabilidad a diferentes ' +
                'hábitats y su capacidad de migración estacional.'
              }
            </Typography>
          </Paper>
        </Grid>

        {/* Behavior Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NatureIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Comportamiento</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              <strong>Alimentación:</strong> {bird.description?.behavior?.feeding || 
                'Principalmente insectívora, aunque también consume semillas y frutos pequeños durante el invierno.'}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Reproducción:</strong> {bird.description?.behavior?.reproduction || 
                'Construye nidos en cavidades naturales o artificiales. La época de cría se extiende de septiembre a diciembre.'}
            </Typography>
            <Typography variant="body2">
              <strong>Social:</strong> {bird.description?.behavior?.social || 
                'Generalmente solitaria, pero puede formar pequeñas bandadas durante la migración.'}
            </Typography>
          </Paper>
        </Grid>

        {/* Distribution Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <MapIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Distribución en Uruguay</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              <strong>Presencia:</strong> {bird.description?.distribution?.presence || 
                'Residente común en todo el territorio uruguayo.'}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Hábitats preferidos:</strong> {bird.description?.distribution?.preferredHabitats || 
                'Bosques ribereños, parques urbanos, y áreas con vegetación densa.'}
            </Typography>
            <Typography variant="body2">
              <strong>Conservación:</strong> {bird.description?.distribution?.conservation || 
                'Estado de conservación favorable, población estable en la región.'}
            </Typography>
          </Paper>
        </Grid>

        {/* Sounds Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VolumeIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Sonidos</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              <strong>Canto:</strong> {bird.description?.sounds?.song || 
                'Serie de notas musicales ascendentes, seguida de un trino característico.'}
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Llamadas:</strong> {bird.description?.sounds?.calls || 
                'Notas cortas y agudas para comunicación entre individuos.'}
            </Typography>
            <Typography variant="body2">
              <strong>Época:</strong> {bird.description?.sounds?.season || 
                'Más vocal durante la primavera y verano, especialmente al amanecer.'}
            </Typography>
          </Paper>
        </Grid>

        {/* Seasonal Patterns */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TimelineIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Patrones Estacionales</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Primavera 🌸
                </Typography>
                <Typography variant="body2" paragraph>
                  {bird.description?.seasonalPatterns?.spring || 
                    'Llegada de migrantes, inicio de la época reproductiva, mayor actividad vocal y territorial.'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Verano 🌞
                </Typography>
                <Typography variant="body2" paragraph>
                  {bird.description?.seasonalPatterns?.summer || 
                    'Cría activa, alimentación de pichones, menor actividad vocal pero mayor presencia.'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Otoño 🍂
                </Typography>
                <Typography variant="body2" paragraph>
                  {bird.description?.seasonalPatterns?.autumn || 
                    'Preparación para migración, formación de bandadas, cambio en hábitos alimentarios.'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Invierno ❄️
                </Typography>
                <Typography variant="body2" paragraph>
                  {bird.description?.seasonalPatterns?.winter || 
                    'Población reducida, menor actividad, concentración en áreas con recursos alimentarios.'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

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