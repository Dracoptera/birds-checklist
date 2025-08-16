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
  Straighten as RulerIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowLeft as KeyboardArrowLeftIcon,
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { uruguayBirds, getCommonnessForDepartment, getDepartamentosForBird } from '../data/birds';
import { useUserData } from '../contexts/UserDataContext';
import BirdImage from './BirdImage';
import BirdVariations from './BirdVariations';
import Gallery from './Gallery';

const BirdDetail: React.FC = () => {
  const { birdId } = useParams<{ birdId: string }>();
  const navigate = useNavigate();
  const { state, toggleSeen, checkNeedsSeeingWarning, togglePhoto, addObservation, removeObservation } = useUserData();
  
  // Scroll to top when component mounts, or restore previous scroll position
  React.useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('birdDetailScrollPosition');
    if (savedScrollPosition) {
      // Small delay to ensure content is rendered before scrolling
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      }, 100);
      // Clear saved scroll position after restoration
      sessionStorage.removeItem('birdDetailScrollPosition');
    } else {
      // If no saved position, scroll to top
      window.scrollTo(0, 0);
    }
  }, [birdId]);

  // Handle scroll to show/hide back to top button
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const [warningDialog, setWarningDialog] = useState<{
    open: boolean;
    birdName: string;
    observationCount: number;
  }>({
    open: false,
    birdName: '',
    observationCount: 0
  });
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newObservation, setNewObservation] = useState({
    date: new Date().toISOString().split('T')[0],
    location: '',
    notes: '',
    photoUrl: '',
  });
  const [showBackToTop, setShowBackToTop] = useState(false);

  const bird = uruguayBirds.find((b: any) => b.id === birdId);
  const observation = state.observations[birdId!];

  // Get the filtered bird list from session storage to determine navigation order
  const getFilteredBirdList = () => {
    const savedSearchParams = sessionStorage.getItem('checklistSearchParams') || '';
    if (!savedSearchParams) return uruguayBirds;
    
    // Parse the saved search params to recreate the filter state
    const params = new URLSearchParams(savedSearchParams);
    const filters = {
      seen: params.get('seen') || 'all',
      hasPhoto: params.get('hasPhoto') || 'all',
      order: params.get('order') || '',
      family: params.get('family') || '',
      departamento: params.get('departamento') || '',
      commonness: params.get('commonness') || '',
      status: params.get('status') || '',
      conservationStatus: params.get('conservationStatus') || '',
      searchTerm: params.get('searchTerm') || '',
      sortBy: params.get('sortBy') || 'commonness',
      excludeOccasionalVisitors: params.get('excludeOccasionalVisitors') === 'true',
    };

    // Apply the same filtering logic as in Checklist component
    let filteredBirds = uruguayBirds.filter((b: any) => {
      const obs = state.observations[b.id];
      
      // Filter by seen status
      if (filters.seen === 'seen' && !obs?.seen) return false;
      if (filters.seen === 'not-seen' && obs?.seen) return false;
      
      // Filter by photo status
      if (filters.hasPhoto === 'with-photo' && !obs?.hasPhoto) return false;
      if (filters.hasPhoto === 'without-photo' && obs?.hasPhoto) return false;
      
      // Filter by order
      if (filters.order && b.order !== filters.order) return false;
      
      // Filter by family
      if (filters.family && b.family !== filters.family) return false;
      
      // Filter by departamento
      if (filters.departamento) {
        const birdDepartamentos = getDepartamentosForBird(b);
        if (!birdDepartamentos.includes(filters.departamento)) return false;
      }
      
      // Filter by commonness
      if (filters.commonness) {
        const birdCommonness = getCommonnessForDepartment(b, filters.departamento);
        if (birdCommonness !== filters.commonness) return false;
      }
      
      // Filter by status
      if (filters.status && b.status !== filters.status) return false;
      
      // Filter by conservation status
      if (filters.conservationStatus && b.conservationStatus !== filters.conservationStatus) return false;
      
      // Filter by occasional visitors
      if (filters.excludeOccasionalVisitors && b.status === '🌍 visitante ocasional') return false;
      
      // Filter by search term
      if (filters.searchTerm) {
        const normalizeText = (text: string) => {
          return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        };
        
        const searchNormalized = normalizeText(filters.searchTerm);
        const matchesSearch = 
          normalizeText(b.commonName).includes(searchNormalized) ||
          normalizeText(b.scientificName).includes(searchNormalized) ||
          normalizeText(b.family).includes(searchNormalized);
        if (!matchesSearch) return false;
      }
      
      return true;
    });

    // Apply the same sorting logic as in Checklist component
    filteredBirds.sort((a: any, b: any) => {
      if (filters.sortBy === 'alphabetical') {
        return a.commonName.localeCompare(b.commonName, 'es');
      } else if (filters.sortBy === 'order') {
        const orderComparison = a.order.localeCompare(b.order, 'es');
        if (orderComparison !== 0) {
          return orderComparison;
        }
        return a.commonName.localeCompare(b.commonName, 'es');
      } else {
        // Sort by commonness (most common first)
        const commonnessOrder = ['abundante', 'común', 'poco común', 'rara', 'muy rara'];
        const aCommonness = getCommonnessForDepartment(a, filters.departamento);
        const bCommonness = getCommonnessForDepartment(b, filters.departamento);
        const aIndex = commonnessOrder.indexOf(aCommonness);
        const bIndex = commonnessOrder.indexOf(bCommonness);
        return aIndex - bIndex;
      }
    });

    return filteredBirds;
  };

  const filteredBirdList = getFilteredBirdList();
  const currentIndex = filteredBirdList.findIndex((b: any) => b.id === birdId);
  const previousBird = currentIndex > 0 ? filteredBirdList[currentIndex - 1] : null;
  const nextBird = currentIndex < filteredBirdList.length - 1 ? filteredBirdList[currentIndex + 1] : null;

  if (!bird) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error">
          Ave no encontrada
        </Typography>
        <Button onClick={() => {
          const savedParams = sessionStorage.getItem('checklistSearchParams') || '';
          navigate(`/${savedParams}`);
        }} sx={{ mt: 2 }}>
          Volver a la lista
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

  const handleChipClick = (filterType: string, value: string) => {
    const params = new URLSearchParams();
    params.set(filterType, value);
    // Clear saved session data since we're navigating with new filters
    sessionStorage.removeItem('checklistScrollPosition');
    sessionStorage.removeItem('checklistSearchParams');
    navigate(`/?${params.toString()}`);
  };

  const clickableChipStyle = {
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'transform 0.2s ease-in-out',
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button onClick={() => {
          const savedParams = sessionStorage.getItem('checklistSearchParams') || '';
          navigate(`/${savedParams}`);
        }}>
          ← Volver a la lista
        </Button>
        
        {/* Previous/Next Navigation */}
        <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
          <Tooltip title={previousBird ? `Anterior: ${previousBird.commonName}` : 'No hay ave anterior'}>
            <span>
              <IconButton
                disabled={!previousBird}
                onClick={() => {
                  if (previousBird) {
                    // Save current scroll position before navigation
                    sessionStorage.setItem('birdDetailScrollPosition', window.pageYOffset.toString());
                    navigate(`/bird/${previousBird.id}`);
                  }
                }}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:disabled': { opacity: 0.3 },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
            </span>
          </Tooltip>
          
          <Tooltip title={nextBird ? `Siguiente: ${nextBird.commonName}` : 'No hay ave siguiente'}>
            <span>
              <IconButton
                disabled={!nextBird}
                onClick={() => {
                  if (nextBird) {
                    // Save current scroll position before navigation
                    sessionStorage.setItem('birdDetailScrollPosition', window.pageYOffset.toString());
                    navigate(`/bird/${nextBird.id}`);
                  }
                }}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:disabled': { opacity: 0.3 },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  }
                }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

             <Card sx={{ mb: 3 }}>
         <Box sx={{ position: 'relative' }}>
                       <Box sx={{ height: bird.cardHeight || { xs: 710, lg: 760, xl: 760 } }}>
              <BirdImage bird={bird} height="100%" compact={false} />
            </Box>
                       <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                display: 'flex',
                gap: 0.5,
                zIndex: 10,
              }}
            >
                           <Tooltip title={observation?.seen ? 'Marcar como no visto' : 'Marcar como visto'}>
                <IconButton
                  size="small"
                  onClick={() => {
                    const warning = checkNeedsSeeingWarning(birdId!);
                    if (warning) {
                      setWarningDialog({
                        open: true,
                        birdName: warning.birdName,
                        observationCount: warning.observationCount
                      });
                    } else {
                      toggleSeen(birdId!);
                    }
                  }}
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
                <span>
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
                </span>
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
                                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <RulerIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        fontWeight: 500,
                        backgroundColor: 'rgba(0,0,0,0.04)',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                      }}
                    >
                      {bird.size || 'Tamaño no especificado'}
                    </Typography>
                  </Box>
               </Box>
             </Box>

          {/* Family/Order row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={bird.order} 
                color="primary" 
                variant="outlined" 
                onClick={() => handleChipClick('order', bird.order)}
                sx={clickableChipStyle}
              />
              <Chip 
                label={bird.family} 
                color="secondary" 
                variant="outlined" 
              />
            </Box>
          </Box>

          {/* Commonness, Status and Origin row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: { xs: 2, sm: 0 } }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip 
                label={getCommonnessForDepartment(bird)} 
                size="small" 
                color="secondary" 
                variant="filled"
                onClick={() => handleChipClick('commonness', getCommonnessForDepartment(bird))}
                sx={clickableChipStyle}
              />
              <Chip 
                label={bird.status}
                size="small" 
                color="info" 
                variant="filled"
                onClick={() => handleChipClick('status', bird.status)}
                sx={clickableChipStyle}
              />
            </Box>
            <Chip 
              label={bird.habitat && bird.habitat.some((hab: string) => hab.includes('mar 🌊')) ? '🌊 pelágica' : bird.origin}
              size="small" 
              color={bird.habitat && bird.habitat.some((hab: string) => hab.includes('mar 🌊')) ? 'info' : (bird.origin === 'autóctona' ? 'success' : 'error')}
              variant="filled"
              icon={bird.habitat && bird.habitat.some((hab: string) => hab.includes('mar 🌊')) ? undefined : (bird.origin === 'autóctona' ? <NatureIcon /> : <ImportContactsIcon />)}
            />
            {bird.conservationStatus && (
              <Chip 
                label={bird.conservationStatus}
                size="small" 
                color={
                  bird.conservationStatus === 'Preocupación menor' ? 'success' :
                  bird.conservationStatus === 'Casi amenazada' ? 'warning' :
                  bird.conservationStatus === 'Vulnerable' ? 'error' :
                  bird.conservationStatus === 'En peligro' ? 'error' :
                  bird.conservationStatus === 'Peligro crítico' ? 'error' : 'default'
                }
                variant="filled"
              />
            )}
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
       {(() => {
         const departamentos = getDepartamentosForBird(bird);
         return (
           <Paper sx={{ p: 2, mb: 3 }}>
             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               <MapIcon sx={{ mr: 1, color: 'primary.main' }} />
               <Typography variant="h6">Departamentos</Typography>
             </Box>
             {departamentos.length > 0 ? (
               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                 {departamentos.map((departamento: string) => (
                   <Chip 
                     key={departamento} 
                     label={departamento} 
                     size="medium" 
                     color="info" 
                     variant="outlined"
                     onClick={() => handleChipClick('departamento', departamento)}
                     sx={clickableChipStyle}
                   />
                 ))}
               </Box>
             ) : (
               <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                 No hay información especificada sobre la abundancia por departamentos para esta ave.
               </Typography>
             )}
           </Paper>
         );
       })()}

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
            birdId={bird.id}
            onVariationChange={(variation) => {
              console.log('Selected variation:', variation);
              // Here you could track which variation was viewed
            }}
          />
        </Paper>
      )}

      {/* Gallery Section */}
      {bird.gallery && bird.gallery.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, mt: 3 }}>
          <Gallery 
            images={bird.gallery} 
            height={500}
            onImageClick={(image) => {
              console.log('Selected gallery image:', image);
              // Here you could track which gallery image was viewed
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
              aspectRatio: { xs: '16/12', sm: '800/431' }, // Taller aspect ratio on mobile
            }
          }}>
            <iframe 
              src={bird.soundUrl} 
              width="100%" 
              height="431"
              frameBorder="0" 
              allowFullScreen
              title={`Grabación de sonido de ${bird.commonName}`}
              style={{ 
                maxWidth: '800px',
                minHeight: '460px', // Increased minimum height for mobile
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

      {/* Warning Dialog */}
      <Dialog
        open={warningDialog.open}
        onClose={() => setWarningDialog(prev => ({ ...prev, open: false }))}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <VisibilityIcon color="error" />
          ¿Marcar como no vista?
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" gutterBottom>
              ¿Estás seguro de que quieres marcar <strong>{warningDialog.birdName}</strong> como "no vista"?
            </Typography>
                          <Paper 
              elevation={0} 
              sx={{ 
                mt: 2,
                p: 2,
                backgroundColor: '#FFF4F4',
                color: 'error.main',
                borderRadius: 1
              }}
            >
              <Typography variant="body2">
                Se eliminarán {warningDialog.observationCount} observación{warningDialog.observationCount !== 1 ? 'es' : ''} detallada{warningDialog.observationCount !== 1 ? 's' : ''} que has registrado.
              </Typography>
            </Paper>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setWarningDialog(prev => ({ ...prev, open: false }))}
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => {
              toggleSeen(birdId!);
              setWarningDialog(prev => ({ ...prev, open: false }));
            }}
            variant="contained"
            color="error"
          >
            Marcar como no vista
          </Button>
        </DialogActions>
      </Dialog>

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

       {/* Back to Top Button */}
       {showBackToTop && (
         <Box
           sx={{
             position: 'fixed',
             bottom: 20,
             right: 20,
             zIndex: 1000,
           }}
         >
           <IconButton
             onClick={handleBackToTop}
             sx={{
               backgroundColor: 'primary.main',
               color: 'white',
               width: 56,
               height: 56,
               boxShadow: 3,
               '&:hover': {
                 backgroundColor: 'primary.dark',
                 transform: 'scale(1.1)',
                 transition: 'all 0.2s ease-in-out',
               },
             }}
             aria-label="Volver arriba"
           >
             <KeyboardArrowUpIcon />
           </IconButton>
         </Box>
       )}
     </Box>
   );
 };

export default BirdDetail; 