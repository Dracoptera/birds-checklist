import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  PhotoCamera as PhotoCameraIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { uruguayBirds, getBirdsByOrder, getBirdsByFamily } from '../data/uruguayBirds';
import { useUserData } from '../contexts/UserDataContext';
import { FilterOptions } from '../types';
import BirdImage from './BirdImage';

const Checklist: React.FC = () => {
  const navigate = useNavigate();
  const { state, toggleSeen, togglePhoto } = useUserData();
  const [filters, setFilters] = useState<FilterOptions>({
    seen: 'all',
    hasPhoto: 'all',
    order: '',
    family: '',
    habitat: '',
    departamento: '',
    searchTerm: '',
  });

  const birdsByOrder = useMemo(() => getBirdsByOrder(), []);
  const birdsByFamily = useMemo(() => getBirdsByFamily(), []);
  
  const uniqueOrders = useMemo(() => Object.keys(birdsByOrder), [birdsByOrder]);
  const uniqueFamilies = useMemo(() => Object.keys(birdsByFamily), [birdsByFamily]);
  const uniqueHabitats = useMemo(() => {
    const habitats = new Set<string>();
    uruguayBirds.forEach(bird => {
      bird.habitat.forEach(h => habitats.add(h));
    });
    return Array.from(habitats).sort();
  }, []);

  const uniqueDepartamentos = useMemo(() => {
    const departamentos = new Set<string>();
    uruguayBirds.forEach(bird => {
      if (bird.departamentos) {
        bird.departamentos.forEach(d => departamentos.add(d));
      }
    });
    return Array.from(departamentos).sort();
  }, []);

  const filteredBirds = useMemo(() => {
    return uruguayBirds.filter(bird => {
      const observation = state.observations[bird.id];
      
      // Filter by seen status
      if (filters.seen === 'seen' && !observation?.seen) return false;
      if (filters.seen === 'not-seen' && observation?.seen) return false;
      
      // Filter by photo status
      if (filters.hasPhoto === 'with-photo' && !observation?.hasPhoto) return false;
      if (filters.hasPhoto === 'without-photo' && observation?.hasPhoto) return false;
      
      // Filter by order
      if (filters.order && bird.order !== filters.order) return false;
      
      // Filter by family
      if (filters.family && bird.family !== filters.family) return false;
      
      // Filter by habitat
      if (filters.habitat && !bird.habitat.includes(filters.habitat)) return false;
      
      // Filter by departamento
      if (filters.departamento && (!bird.departamentos || !bird.departamentos.includes(filters.departamento))) return false;
      
      // Filter by search term
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          bird.commonName.toLowerCase().includes(searchLower) ||
          bird.scientificName.toLowerCase().includes(searchLower) ||
          bird.family.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      return true;
    });
  }, [state.observations, filters]);

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const getBirdObservation = (birdId: string) => {
    return state.observations[birdId] || {
      birdId,
      bird: uruguayBirds.find(b => b.id === birdId)!,
      seen: false,
      hasPhoto: false,
      observations: [],
    };
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Checklist de Aves
      </Typography>
      
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filtros
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado</InputLabel>
              <Select
                value={filters.seen}
                label="Estado"
                onChange={(e) => handleFilterChange('seen', e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="seen">Vistos</MenuItem>
                <MenuItem value="not-seen">No vistos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Fotos</InputLabel>
              <Select
                value={filters.hasPhoto}
                label="Fotos"
                onChange={(e) => handleFilterChange('hasPhoto', e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="with-photo">Con fotos</MenuItem>
                <MenuItem value="without-photo">Sin fotos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Orden</InputLabel>
              <Select
                value={filters.order}
                label="Orden"
                onChange={(e) => handleFilterChange('order', e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {uniqueOrders.map(order => (
                  <MenuItem key={order} value={order}>{order}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Familia</InputLabel>
              <Select
                value={filters.family}
                label="Familia"
                onChange={(e) => handleFilterChange('family', e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                {uniqueFamilies.map(family => (
                  <MenuItem key={family} value={family}>{family}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Hábitat</InputLabel>
              <Select
                value={filters.habitat}
                label="Hábitat"
                onChange={(e) => handleFilterChange('habitat', e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {uniqueHabitats.map(habitat => (
                  <MenuItem key={habitat} value={habitat}>{habitat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Departamento</InputLabel>
              <Select
                value={filters.departamento}
                label="Departamento"
                onChange={(e) => handleFilterChange('departamento', e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {uniqueDepartamentos.map(departamento => (
                  <MenuItem key={departamento} value={departamento}>{departamento}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Buscar"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Nombre, científico o familia..."
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Mostrando {filteredBirds.length} de {uruguayBirds.length} especies
      </Typography>

      {/* Bird list */}
      <Grid container spacing={2}>
        {filteredBirds.map(bird => {
          const observation = getBirdObservation(bird.id);
          
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} key={bird.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: observation.seen ? '2px solid #4caf50' : '1px solid #e0e0e0',
                  '&:hover': {
                    boxShadow: 3,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out',
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <BirdImage bird={bird} height={350} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      display: 'flex',
                      gap: 0.5,
                    }}
                  >
                    <Tooltip title={observation.seen ? 'Marcar como no visto' : 'Marcar como visto'}>
                      <IconButton
                        size="small"
                        onClick={() => toggleSeen(bird.id)}
                        color={observation.seen ? 'success' : 'default'}
                        sx={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={observation.hasPhoto ? 'Marcar como sin foto' : 'Marcar como con foto'}>
                      <IconButton
                        size="small"
                        onClick={() => togglePhoto(bird.id)}
                        color={observation.hasPhoto ? 'primary' : 'default'}
                        sx={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                        }}
                      >
                        <PhotoCameraIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Agregar observación">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/bird/${bird.id}`)}
                        sx={{ 
                          backgroundColor: 'rgba(255,255,255,0.9)',
                          '&:hover': { backgroundColor: 'rgba(255,255,255,1)' }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      component="div" 
                      sx={{ 
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'primary.main',
                          textDecoration: 'underline'
                        }
                      }}
                      onClick={() => navigate(`/bird/${bird.id}`)}
                    >
                      {bird.commonName}
                    </Typography>
                    {!bird.imageUrl && (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title={observation.seen ? 'Marcar como no visto' : 'Marcar como visto'}>
                          <IconButton
                            size="small"
                            onClick={() => toggleSeen(bird.id)}
                            color={observation.seen ? 'success' : 'default'}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={observation.hasPhoto ? 'Marcar como sin foto' : 'Marcar como con foto'}>
                          <IconButton
                            size="small"
                            onClick={() => togglePhoto(bird.id)}
                            color={observation.hasPhoto ? 'primary' : 'default'}
                          >
                            <PhotoCameraIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Agregar observación">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/bird/${bird.id}`)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                    {bird.scientificName}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={bird.family} size="small" variant="outlined" />
                    <Chip label={bird.order} size="small" variant="outlined" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
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
                  
                  {observation.observations.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {observation.observations.length} observación{observation.observations.length !== 1 ? 'es' : ''}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {filteredBirds.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No se encontraron aves con los filtros seleccionados
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Checklist; 