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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  KeyboardArrowUp as KeyboardArrowUpIcon,
  PictureAsPdf as PdfIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { uruguayBirds, getBirdsByOrder, getCommonnessForDepartment, getAllCommonnessLevels, getDepartamentosForBird } from '../data/birds';
import { useUserData } from '../contexts/UserDataContext';
import { FilterOptions } from '../types';
import BirdImage from './BirdImage';
import BirdListPDF from './BirdListPDF';
import { pdf } from '@react-pdf/renderer';

const Checklist: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { state, toggleSeen, checkNeedsSeeingWarning, togglePhoto } = useUserData();
  const [warningDialog, setWarningDialog] = useState<{
    open: boolean;
    birdId: string;
    birdName: string;
    observationCount: number;
  }>({
    open: false,
    birdId: '',
    birdName: '',
    observationCount: 0
  });
  
  // Initialize filters from URL parameters
  const initialFilters: FilterOptions = {
    seen: (searchParams.get('seen') as 'all' | 'seen' | 'not-seen') || 'all',
    hasPhoto: (searchParams.get('hasPhoto') as 'all' | 'with-photo' | 'without-photo') || 'all',
    order: searchParams.get('order') || '',
    family: searchParams.get('family') || '',
    departamento: searchParams.get('departamento') || '',
    commonness: searchParams.get('commonness') || '',
    status: searchParams.get('status') || '',
    conservationStatus: searchParams.get('conservationStatus') || '',
    searchTerm: searchParams.get('searchTerm') || '',
    sortBy: (searchParams.get('sortBy') as 'commonness' | 'alphabetical' | 'order') || 'commonness',
  };
  
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [displayCount, setDisplayCount] = useState(9);
  const [filtersOpen, setFiltersOpen] = useState(!isMobile); // Open by default on desktop, closed on mobile
  const [showBackToTop, setShowBackToTop] = useState(false);

  const birdsByOrder = useMemo(() => getBirdsByOrder(), []);
  // const birdsByFamily = useMemo(() => getBirdsByFamily(), []);
  
  const uniqueOrders = useMemo(() => Object.keys(birdsByOrder), [birdsByOrder]);
  
  const uniqueFamiliesForOrder = useMemo(() => {
    if (!filters.order) return [];
    const families = new Set<string>();
    uruguayBirds.forEach((bird: any) => {
      if (bird.order === filters.order) {
        families.add(bird.family);
      }
    });
    return Array.from(families).sort();
  }, [filters.order]);


  const uniqueDepartamentos = useMemo(() => {
    const departamentos = new Set<string>();
    uruguayBirds.forEach((bird: any) => {
      const birdDepartamentos = getDepartamentosForBird(bird);
      birdDepartamentos.forEach((d: string) => departamentos.add(d));
    });
    return Array.from(departamentos).sort();
  }, []);

  const uniqueCommonness = useMemo(() => {
    const commonness = new Set<string>();
    uruguayBirds.forEach((bird: any) => {
      const levels = getAllCommonnessLevels(bird);
      levels.forEach((level: string) => commonness.add(level));
    });
    return Array.from(commonness).sort((a: string, b: string) => {
      const order = ['abundante', 'común', 'poco común', 'rara', 'muy rara'];
      return order.indexOf(a) - order.indexOf(b);
    });
  }, []);

  const uniqueStatuses = useMemo(() => {
    const statuses = new Set<string>();
    uruguayBirds.forEach((bird: any) => {
      statuses.add(bird.status);
    });
    return Array.from(statuses).sort();
  }, []);

  const uniqueConservationStatuses = useMemo(() => {
    const conservationStatuses = new Set<string>();
    uruguayBirds.forEach((bird: any) => {
      if (bird.conservationStatus) {
        conservationStatuses.add(bird.conservationStatus);
      }
    });
    return Array.from(conservationStatuses).sort((a: string, b: string) => {
      const order = ['Preocupación menor', 'Casi amenazada', 'Vulnerable', 'En peligro', 'Peligro crítico'];
      return order.indexOf(a) - order.indexOf(b);
    });
  }, []);

  const filteredBirds = useMemo(() => {
    return uruguayBirds.filter((bird: any) => {
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
      
             // Filter by departamento
       if (filters.departamento) {
         const birdDepartamentos = getDepartamentosForBird(bird);
         if (!birdDepartamentos.includes(filters.departamento)) return false;
       }
      
      // Filter by commonness
      if (filters.commonness) {
        const birdCommonness = getCommonnessForDepartment(bird, filters.departamento);
        if (birdCommonness !== filters.commonness) return false;
      }
      
      // Filter by status
      if (filters.status && bird.status !== filters.status) return false;
      
      // Filter by conservation status
      if (filters.conservationStatus && bird.conservationStatus !== filters.conservationStatus) return false;
      
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
    }).sort((a: any, b: any) => {
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
        const aCommonness = getCommonnessForDepartment(a, filters.departamento);
        const bCommonness = getCommonnessForDepartment(b, filters.departamento);
        const aIndex = commonnessOrder.indexOf(aCommonness);
        const bIndex = commonnessOrder.indexOf(bCommonness);
        return aIndex - bIndex;
      }
    });
  }, [state.observations, filters]);

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setDisplayCount(9); // Reset to show first 9 birds when filters change
    
    // Clear family filter when order changes
    if (field === 'order') {
      setFilters(prev => ({ ...prev, family: '' }));
    }
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams);
    if (value && value !== 'all') {
      newSearchParams.set(field, value);
    } else {
      newSearchParams.delete(field);
    }
    
    // Clear family parameter when order changes
    if (field === 'order') {
      newSearchParams.delete('family');
    }
    
    setSearchParams(newSearchParams);
  };

  const handleClearFilters = () => {
    setFilters({
      seen: 'all',
      hasPhoto: 'all',
      order: '',
      family: '',
      departamento: '',
      commonness: '',
      status: '',
      conservationStatus: '',
      searchTerm: '',
      sortBy: 'commonness',
    });
    setDisplayCount(9);
    setSearchParams({}); // Clear all URL parameters
  };

  const getBirdObservation = (birdId: string) => {
    return state.observations[birdId] || {
      birdId,
      bird: uruguayBirds.find((b: any) => b.id === birdId)!,
      seen: false,
      hasPhoto: false,
      observations: [],
    };
  };

  // Helper function to check if commonness varies by department
  const shouldShowCommonness = (bird: any) => {
    // If a department is selected, always show commonness
    if (filters.departamento) {
      return true;
    }
    
    // If commonness is a string (not varying by department), always show it
    if (typeof bird.commonness === 'string') {
      return true;
    }
    
    // If commonness is an object (varying by department) and no department is selected, don't show it
    return false;
  };

  // Restore scroll position when returning from bird detail
  React.useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('checklistScrollPosition');
    const savedSearchParams = sessionStorage.getItem('checklistSearchParams');
    
    if (savedScrollPosition && savedSearchParams) {
      // Restore URL parameters if they match what we saved
      const currentParams = window.location.search;
      if (currentParams === savedSearchParams) {
        // Small delay to ensure content is rendered before scrolling
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedScrollPosition, 10));
        }, 100);
      }
      
      // Clear saved data after restoration
      sessionStorage.removeItem('checklistScrollPosition');
      sessionStorage.removeItem('checklistSearchParams');
    }
  }, []);

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

  const handleExportPDF = async () => {
    try {
      const doc = (
        <BirdListPDF 
          birds={filteredBirds} 
          filters={filters}
          totalCount={uruguayBirds.length}
          observations={state.observations}
        />
      );
      
      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename based on filters
      const activeFilters = Object.entries(filters)
        .filter(([key, value]) => key !== 'sortBy' && value && value !== 'all')
        .map(([key, value]) => `${key}-${value}`)
        .join('_');
      
      const filename = activeFilters 
        ? `aves_uruguay_${activeFilters}.pdf`
        : 'aves_uruguay.pdf';
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error al generar el PDF. Por favor, inténtalo de nuevo.');
    }
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
                ({Object.entries(filters)
                  .filter(([key, value]) => key !== 'sortBy' && value && value !== 'all')
                  .length} activos)
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
              <InputLabel>Familia</InputLabel>
              <Select
                value={filters.family}
                label="Familia"
                onChange={(e) => handleFilterChange('family', e.target.value)}
                disabled={!filters.order}
              >
                <MenuItem value="">Todas</MenuItem>
                {uniqueFamiliesForOrder.map(family => (
                  <MenuItem key={family} value={family}>{family}</MenuItem>
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
            <FormControl fullWidth size="small">
              <InputLabel>Conservación</InputLabel>
              <Select
                value={filters.conservationStatus}
                label="Conservación"
                onChange={(e) => handleFilterChange('conservationStatus', e.target.value)}
              >
                <MenuItem value="">Todas</MenuItem>
                {uniqueConservationStatuses.map(conservationStatus => (
                  <MenuItem key={conservationStatus} value={conservationStatus}>{conservationStatus}</MenuItem>
                ))}
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

      {/* Results count, Search and Sort */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2,
        gap: 2
      }}>
        <Typography variant="body2" color="text.secondary">
          Mostrando {Math.min(displayCount, filteredBirds.length)} de {filteredBirds.length} especies
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <TextField
            size="small"
            label="Buscar 🔎"
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            placeholder="Nombre, científico o familia..."
            sx={{ width: { xs: '100%', sm: 250 } }}
          />

          <FormControl size="small" sx={{ width: { xs: '100%', sm: 200 } }}>
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

          <Button
            variant="outlined"
            startIcon={<PdfIcon />}
            onClick={handleExportPDF}
            size="small"
            sx={{ 
              width: { xs: '100%', sm: 'auto' },
              height: '40px',
              minWidth: { xs: 'auto', sm: '140px' }
            }}
          >
            Exportar PDF
          </Button>
        </Box>
      </Box>

      {/* Bird list */}
      <Grid container spacing={2}>
        {filteredBirds.slice(0, displayCount).map((bird: any) => {
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
                          onClick={() => {
                            // Save current state before navigation
                            sessionStorage.setItem('checklistScrollPosition', window.pageYOffset.toString());
                            sessionStorage.setItem('checklistSearchParams', window.location.search);
                            navigate(`/bird/${bird.id}`);
                          }}
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
                            onClick={() => {
                              const warning = checkNeedsSeeingWarning(bird.id);
                              if (warning) {
                                setWarningDialog({
                                  open: true,
                                  birdId: bird.id,
                                  birdName: warning.birdName,
                                  observationCount: warning.observationCount
                                });
                              } else {
                                toggleSeen(bird.id);
                              }
                            }}
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
                      {shouldShowCommonness(bird) && (
                        <Chip 
                          label={getCommonnessForDepartment(bird, filters.departamento)} 
                          size="small" 
                          color="secondary" 
                          variant="filled"
                        />
                      )}
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
              toggleSeen(warningDialog.birdId);
              setWarningDialog(prev => ({ ...prev, open: false }));
            }}
            variant="contained"
            color="error"
          >
            Marcar como no vista
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

export default Checklist; 