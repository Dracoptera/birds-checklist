import React, { useState } from 'react';
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
import kiskadeeImage from '../assets/index/great-kiskadee.png';
import {
  List as ListIcon,
  BarChart as BarChartIcon,
  Refresh as RefreshIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Help as HelpIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserData } from '../contexts/UserDataContext';
import { useTheme } from '../contexts/ThemeContext';
import DataManager from './DataManager';
import HelpModal from './HelpModal';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, resetData } = useUserData();
  const { isDarkMode, toggleTheme } = useTheme();
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  const handleReset = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todos tus datos? Esta acción no se puede deshacer.')) {
      resetData();
    }
  };

  const handleHelpOpen = () => {
    setHelpModalOpen(true);
  };

  const handleHelpClose = () => {
    setHelpModalOpen(false);
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
            src={kiskadeeImage} 
            alt="Benteveo" 
            style={{ 
              width: '32px', 
              height: '32px',
              objectFit: 'contain'
            }} 
          />
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' } // Hide on mobile, show on small screens and up
            }}
          >
            Aves de Uruguay
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>


          <Button
            color="inherit"
            startIcon={<ListIcon />}
            onClick={() => navigate('/')}
            variant={location.pathname === '/' ? 'contained' : 'text'}
            sx={{ 
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              Checklist
            </Box>
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
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              Estadísticas
            </Box>
          </Button>

          {/* <Tooltip title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              size="small"
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip> */}

          <DataManager />

          <Tooltip title="Reiniciar datos">
            <IconButton
              color="inherit"
              onClick={handleReset}
              size="small"
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Ayuda">
            <IconButton
              color="inherit"
              onClick={handleHelpOpen}
              size="small"
            >
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      
      <HelpModal open={helpModalOpen} onClose={handleHelpClose} />
    </AppBar>
  );
};

export default Header; 