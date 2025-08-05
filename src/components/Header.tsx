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
import robinImage from '../assets/index/robin.png';
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
        <Box
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
          onClick={() => navigate('/')}
        >
          <img 
            src={robinImage} 
            alt="Robin" 
            style={{ 
              width: '32px', 
              height: '32px',
              objectFit: 'contain'
            }} 
          />
          <Typography variant="h6" component="div">
            Checklist de Aves de Uruguay
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={`${state.totalSeen} vistas`}
            color="secondary"
            size="small"
            variant="filled"
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'text.primary',
              fontWeight: 'bold'
            }}
          />
          <Chip
            label={`${state.totalWithPhotos} con fotos`}
            color="primary"
            size="small"
            variant="filled"
            sx={{ 
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'text.primary',
              fontWeight: 'bold'
            }}
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