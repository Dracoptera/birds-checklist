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
  Icon,
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
  ImportContacts as ImportContactsIcon,
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
         <Box sx={{ position: 'relative' }}>
                       <Box sx={{ height: { xs: 710, lg: 760, xl: 760
                        } }}>
              <BirdImage bird={bird} height="100%" compact={false} />
            </Box>
           <Box
             sx={{
               position: 'absolute',
               top: 8,
               right: 8,
               display: 'flex',
               gap: 0.5,
             }}
           >
             <Tooltip title={observation?.seen ? 'Marcar como no visto' : 'Marcar como visto'}>
               <IconButton
                 size="small"
                 onClick={() => toggleSeen(birdId!)}
                 color={observation?.seen ? 'success' : 'default'}
                 sx={{ 
                   backgroundColor: 'rgba(255,255,255,0.9)',
                   '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                 }}
               >
                 <VisibilityIcon />
               </IconButton>
             </Tooltip>
             <Tooltip title={
               !observation?.seen 
                 ? 'Primero marca como visto' 
                 : observation?.hasPhoto 
                   ? 'Marcar como sin foto' 
                   : 'Marcar como con foto'
             }>
               <IconButton
                 size="small"
                 onClick={() => {
                   // Only allow photo toggle if already seen
                   if (observation?.seen) {
                     togglePhoto(birdId!);
                   }
                 }}
                 color={observation?.hasPhoto ? 'primary' : 'default'}
                 disabled={!observation?.seen}
                 sx={{ 
                   backgroundColor: 'rgba(255,255,255,0.9)',
                   '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                   opacity: !observation?.seen ? 0.5 : 1
                 }}
               >
                 <PhotoCameraIcon />
               </IconButton>
             </Tooltip>
           </Box>
           <Box
             sx={{
               position: 'absolute',
               bottom: 0,
               left: 0,
               right: 0,
               background: 'linear-gradient(transparent, rgba(255,255,255,0.9) 20%, rgba(255,255,255,1) 40%)',
               paddingTop: '0px',
               paddingBottom: '10px',
               paddingLeft: '16px',
               paddingRight: '16px',
             }}
           >
             <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'flex-start' }, mb: 2 }}>
               <Box>
                 <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'baseline' }, gap: { xs: 0, sm: 2 }, mb: 1 }}>
                   <Typography variant="h4">
                     {bird.commonName}
                   </Typography>
                   <Typography variant="h6" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                     {bird.scientificName}
                   </Typography>
                 </Box>
                 <Typography variant="body2" color="text.secondary">
                   {bird.size || 'Tamaño no especificado'}
                 </Typography>
               </Box>
             </Box>

          {/* Family/Order and Habitat row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={bird.order} color="primary" variant="outlined" />
              <Chip label={bird.family} color="secondary" variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {bird.habitat.map(habitat => (
                <Chip 
                  key={habitat} 
                  label={habitat} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          {/* Commonness, Status and Origin row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={bird.commonness} 
                size="small" 
                color="secondary" 
                variant="filled"
              />
              <Chip 
                label={bird.status}
                size="small" 
                color="info" 
                variant="filled"
              />
            </Box>
            <Chip 
              label={bird.origin}
              size="small" 
              color={bird.origin === 'autóctona' ? 'success' : 'error'}
              variant="filled"
              icon={bird.origin === 'autóctona' ? <NatureIcon /> : <ImportContactsIcon />}
            />
          </Box>

          

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
        </Box>
      </Box>
             </Card>

       {/* Departamentos Section */}
       {bird.departamentos && bird.departamentos.length > 0 && (
         <Paper sx={{ p: 2, mb: 3 }}>
           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
             <MapIcon sx={{ mr: 1, color: 'primary.main' }} />
             <Typography variant="h6">Departamentos</Typography>
           </Box>
           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
             {bird.departamentos.map(departamento => (
               <Chip 
                 key={departamento} 
                 label={departamento} 
                 size="medium" 
                 color="info" 
                 variant="outlined"
               />
             ))}
           </Box>
         </Paper>
       )}

       {/* Simplified Information Sections */}
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
                'Descripción no especificada.'}
            </Typography>
          </Paper>
        </Grid>

        {/* Curiosities Section */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Curiosidades</Typography>
            </Box>
            <Typography variant="body2" paragraph>
              {bird.description?.curiosities || 
                'Curiosidades no especificadas.'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Variations Section */}
      {bird.variations && bird.variations.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, mt: 3 }}>
          <BirdVariations 
            variations={bird.variations} 
            height={500}
            onVariationChange={(variation) => {
              console.log('Selected variation:', variation);
              // Here you could track which variation was viewed
            }}
          />
        </Paper>
      )}

      {/* Sounds Section */}
      {bird.soundUrl && (
        <Paper sx={{ p: 2, mb: 3, mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <VolumeIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6">Sonidos</Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%',
            '& iframe': {
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              maxWidth: '100%',
              height: 'auto',
              aspectRatio: '800/431', // Maintain the original aspect ratio
            }
          }}>
            <iframe 
              src={bird.soundUrl} 
              width="100%" 
              height="431"
              frameBorder="0" 
              allowFullScreen
              style={{ 
                maxWidth: '800px',
                minHeight: '300px',
                width: '100%'
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
            Grabación de sonido de {bird.commonName} - Macaulay Library
          </Typography>
        </Paper>
      )}

      {/* Observations Section */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Observaciones ({observation?.observations.length || 0})
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            disabled={!observation?.seen}
            sx={{
              opacity: !observation?.seen ? 0.6 : 1
            }}
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
              disabled={!observation?.seen}
              sx={{ 
                mt: 2,
                opacity: !observation?.seen ? 0.6 : 1
              }}
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