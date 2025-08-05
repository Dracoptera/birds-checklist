import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  PhotoCamera as PhotoCameraIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '80vh',
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h5" component="div">
          ¿Cómo funciona esta aplicación?
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🎯 Propósito
          </Typography>
          <Typography variant="body1" paragraph>
            Esta aplicación te permite mantener un registro personal de las aves que has observado en Uruguay. 
            Puedes marcar las especies que has visto, las que has fotografiado, y agregar observaciones detalladas.
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            📋 Funcionalidades principales
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <VisibilityIcon color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Marcar como visto" 
                secondary="Haz clic en el ícono del ojo para marcar una especie como observada"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <PhotoCameraIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Marcar con foto" 
                secondary="Haz clic en el ícono de la cámara para indicar que tienes fotos de la especie"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <AddIcon color="action" />
              </ListItemIcon>
              <ListItemText 
                primary="Agregar observación" 
                secondary="Haz clic en el ícono + para agregar detalles de tu observación"
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            🔍 Filtros y búsqueda
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <FilterIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Filtros múltiples" 
                secondary="Filtra por estado (visto/no visto), fotos, orden, familia, hábitat, departamento y abundancia"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Ordenamiento automático" 
                secondary="Las aves se ordenan automáticamente por abundancia (más comunes primero)"
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            💾 Gestión de datos
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <DownloadIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Exportar datos" 
                secondary="Guarda tu checklist en un archivo JSON para respaldo o transferencia"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Importar datos" 
                secondary="Carga datos previamente exportados para restaurar tu progreso"
              />
            </ListItem>
          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6" gutterBottom>
            🐦 Información de las aves
          </Typography>
          <Typography variant="body1" paragraph>
            Cada especie incluye:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText 
                primary="• Imágenes de alta calidad de eBird/Macaulay Library"
                secondary=""
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Información taxonómica (familia, orden)"
                secondary=""
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Hábitats donde se encuentra"
                secondary=""
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Departamentos de Uruguay donde está presente"
                secondary=""
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Nivel de abundancia (abundante, común, poco común, rara, muy rara)"
                secondary=""
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="• Variaciones (juvenil, adulto, macho, hembra) para algunas especies"
                secondary=""
              />
            </ListItem>
          </List>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpModal; 