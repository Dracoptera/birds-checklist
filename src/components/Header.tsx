import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  List as ListIcon,
  BarChart as BarChartIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserData } from '../contexts/UserDataContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, resetData } = useUserData();

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todos tus datos? Esta acción no se puede deshacer.')) {
      resetData();
    }
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          🦅 Checklist de Aves de Uruguay
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${state.totalSeen} vistas`}
            color="secondary"
            size="small"
            variant="outlined"
          />
          <Chip
            label={`${state.totalWithPhotos} con fotos`}
            color="primary"
            size="small"
            variant="outlined"
          />

          <Button
            color="inherit"
            startIcon={<ListIcon />}
            onClick={() => navigate('/')}
            variant={location.pathname === '/' ? 'contained' : 'text'}
            sx={{ 
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Checklist
          </Button>

          <Button
            color="inherit"
            startIcon={<BarChartIcon />}
            onClick={() => navigate('/statistics')}
            variant={location.pathname === '/statistics' ? 'contained' : 'text'}
            sx={{ 
              backgroundColor: location.pathname === '/statistics' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            Estadísticas
          </Button>

          <Tooltip title="Reiniciar datos">
            <IconButton
              color="inherit"
              onClick={handleReset}
              size="small"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 