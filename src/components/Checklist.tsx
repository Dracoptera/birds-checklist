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
  Button,
  Collapse,
  useMediaQuery,
  useTheme,
  Icon,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  PhotoCamera as PhotoCameraIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Nature as NatureIcon,
  ImportContacts as ImportContactsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { uruguayBirds, getBirdsByOrder } from '../data/uruguayBirds';
import { useUserData } from '../contexts/UserDataContext';
import { FilterOptions } from '../types';
import BirdImage from './BirdImage';

const Checklist: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { state, toggleSeen, togglePhoto } = useUserData();
  const [filters, setFilters] = useState<FilterOptions>({
    seen: 'all',
    hasPhoto: 'all',
    order: '',
    family: '',
    habitat: '',
    departamento: '',
    commonness: '',
    status: '',
    searchTerm: '',
    sortBy: 'commonness',
  });
  const [displayCount, setDisplayCount] = useState(9);
  const [filtersOpen, setFiltersOpen] = useState(!isMobile); // Open by default on desktop, closed on mobile

  const birdsByOrder = useMemo(() => getBirdsByOrder(), []);
  // const birdsByFamily = useMemo(() => getBirdsByFamily(), []);
  
  const uniqueOrders = useMemo(() => Object.keys(birdsByOrder), [birdsByOrder]);
  // const uniqueFamilies = useMemo(() => Object.keys(birdsByFamily), [birdsByFamily]);
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

  const uniqueCommonness = useMemo(() => {
    const commonness = new Set<string>();
    uruguayBirds.forEach(bird => {
      commonness.add(bird.commonness);
    });
    return Array.from(commonness).sort((a, b) => {
      const order = ['abundante', 'común', 'poco común', 'rara', 'muy rara'];
      return order.indexOf(a) - order.indexOf(b);
    });
  }, []);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    uruguayBirds.forEach(bird => {
      statuses.add(bird.status);
    });
    return Array.from(statuses).sort();
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
      
      // Filter by habitat
      if (filters.habitat && !bird.habitat.includes(filters.habitat)) return false;
      
      // Filter by departamento
      if (filters.departamento && (!bird.departamentos || !bird.departamentos.includes(filters.departamento))) return false;
      
      // Filter by commonness
      if (filters.commonness && bird.commonness !== filters.commonness) return false;
      
      // Filter by status
      if (filters.status && bird.status !== filters.status) return false;
      
      // Filter by search term
      if (filters.searchTerm) {
        const normalizeText = (text: string) => {
          return text.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
        };
        
        const searchNormalized = normalizeText(filters.searchTerm);
        const matchesSearch = 
          normalizeText(bird.commonName).includes(searchNormalized) ||
          normalizeText(bird.scientificName).includes(searchNormalized) ||
          normalizeText(bird.family).includes(searchNormalized);
        if (!matchesSearch) return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'alphabetical') {
        // Sort alphabetically by common name
        return a.commonName.localeCompare(b.commonName, 'es');
      } else if (filters.sortBy === 'order') {
        // Sort by order, then by common name within each order
        const orderComparison = a.order.localeCompare(b.order, 'es');
        if (orderComparison !== 0) {
          return orderComparison;
        }
        return a.commonName.localeCompare(b.commonName, 'es');
      } else {
        // Sort by commonness (most common first)
        const commonnessOrder = ['abundante', 'común', 'poco común', 'rara', 'muy rara'];
        const aIndex = commonnessOrder.indexOf(a.commonness);
        const bIndex = commonnessOrder.indexOf(b.commonness);
        return aIndex - bIndex;
      }
    });
  }, [state.observations, filters]);

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setDisplayCount(9); // Reset to show first 9 birds when filters change
  };

  const handleClearFilters = () => {
    setFilters({
      seen: 'all',
      hasPhoto: 'all',
      order: '',
      family: '',
      habitat: '',
      departamento: '',
      commonness: '',
      status: '',
      searchTerm: '',
      sortBy: 'commonness',
    });
    setDisplayCount(9);
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

      
      {/* Filters */}
      <Paper sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            p: 2, 
            cursor: isMobile ? 'pointer' : 'default',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: isMobile ? '1px solid' : 'none',
            borderColor: 'divider'
          }}
          onClick={() => isMobile && setFiltersOpen(!filtersOpen)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterIcon />
            <Typography variant="h6">
              Filtros
            </Typography>
            {isMobile && (
              <Typography variant="body2" color="text.secondary">
                ({Object.values(filters).filter(v => v && v !== 'all').length} activos)
              </Typography>
            )}
          </Box>
          {isMobile && (
            <IconButton size="small">
              {filtersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>
        <Collapse in={filtersOpen}>
          <Box sx={{ p: 2, pt: isMobile ? 1 : 2 }}>
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
            <FormControl fullWidth size="small">
              <InputLabel>Abundancia</InputLabel>
              <Select
                value={filters.commonness}
                label="Abundancia"
                onChange={(e) => handleFilterChange('commonness', e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                {uniqueCommonness.map(commonness => (
                  <MenuItem key={commonness} value={commonness}>{commonness}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado</InputLabel>
              <Select
                value={filters.status}
                label="Estado"
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {uniqueStatuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              label="Buscar 🔎"
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              placeholder="Nombre, científico o familia..."
            />
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={filters.sortBy}
                label="Ordenar por"
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <MenuItem value="commonness">Por abundancia</MenuItem>
                <MenuItem value="alphabetical">Alfabéticamente</MenuItem>
                <MenuItem value="order">Por orden taxonómico</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                size="small"
                sx={{ height: '40px', px: 4 }}
              >
                Limpiar filtros
              </Button>
            </Box>
          </Grid>
            </Grid>
          </Box>
        </Collapse>
      </Paper>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Mostrando {Math.min(displayCount, filteredBirds.length)} de {filteredBirds.length} especies
      </Typography>

      {/* Bird list */}
      <Grid container spacing={2}>
        {filteredBirds.slice(0, displayCount).map(bird => {
          const observation = getBirdObservation(bird.id);
          
          return (
            <Grid item xs={12} sm={6} md={6} lg={4} key={bird.id}>
                             <Card 
                 sx={{ 
                   height: '100%',
                   border: observation.seen ? '4px solid #4caf50' : '1px solid #e0e0e0',
                   '&:hover': {
                     boxShadow: 3,
                     transform: 'translateY(-4px)',
                     transition: 'all 0.2s ease-in-out',
                   }
                 }}
               >
                 <Box sx={{ position: 'relative' }}>
                   <BirdImage bird={bird} height={560} compact={true} />
                   <Box
                     sx={{
                       position: 'absolute',
                       bottom: 0,
                       left: 0,
                       right: 0,
                       background: 'linear-gradient(transparent, rgba(255,255,255,0.9) 20%, rgba(255,255,255,1) 40%)',
                       paddingTop: '0px',
                       paddingBottom: '0px',
                       paddingLeft: '16px',
                       paddingRight: '16px',
                     }}
                   >
                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                       <Box>
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
                         <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                           {bird.scientificName}
                         </Typography>
                       </Box>
                       
                       <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                         <Tooltip title={observation.seen ? 'Marcar como no visto' : 'Marcar como visto'}>
                           <IconButton
                             size="small"
                             onClick={() => toggleSeen(bird.id)}
                             color={observation.seen ? 'success' : 'default'}
                           >
                             <VisibilityIcon />
                           </IconButton>
                         </Tooltip>
                         <Tooltip title={
                           !observation.seen 
                             ? 'Primero marca como visto' 
                             : observation.hasPhoto 
                               ? 'Marcar como sin foto' 
                               : 'Marcar como con foto'
                         }>
                           <IconButton
                             size="small"
                             onClick={() => {
                               // Only allow photo toggle if already seen
                               if (observation.seen) {
                                 togglePhoto(bird.id);
                               }
                             }}
                             color={observation.hasPhoto ? 'primary' : 'default'}
                             disabled={!observation.seen}
                             sx={{
                               opacity: !observation.seen ? 0.5 : 1
                             }}
                           >
                             <PhotoCameraIcon />
                           </IconButton>
                         </Tooltip>
                       </Box>
                     </Box>
                     
                     <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                       <Chip label={bird.order} size="small" variant="outlined" />
                       <Chip label={bird.family} size="small" variant="outlined" />
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
                     
                     <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
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
                       <Chip 
                         label={bird.origin}
                         size="small" 
                         color={bird.origin === 'autóctona' ? 'success' : 'error'}
                         variant="filled"
                         icon={bird.origin === 'autóctona' ? <NatureIcon /> : <ImportContactsIcon />}
                       />
                     </Box>
                     
                     {observation.observations.length > 0 && (
                       <Box sx={{ mt: 2 }}>
                         <Typography variant="body2" color="text.secondary">
                           {observation.observations.length} observación{observation.observations.length !== 1 ? 'es' : ''}
                         </Typography>
                       </Box>
                     )}
                   </Box>
                                   </Box>
                </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Show more button */}
      {displayCount < filteredBirds.length && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setDisplayCount(prev => prev + 9)}
            sx={{ px: 4, py: 1.5 }}
          >
            Mostrar más
          </Button>
        </Box>
      )}
      
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