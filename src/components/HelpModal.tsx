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
  Email as EmailIcon,
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
          🐧 ¿Cómo funciona esta página? 🦢
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
           Objetivo
          </Typography>
          <Typography variant="body1" paragraph>
            El objetivo principal de esta página es poder llevar un registro personal de aves vistas y/o fotografiadas en Uruguay sin necesidad de crear cuentas ni proporcionar datos personales.
            </Typography>
            <Typography variant="h6" gutterBottom> ¡Importante!        </Typography>
              Esta página no respalda tus datos automáticamente. Es necesario que los guardes si vas a utilizar otros dispositivos o navegadores. Más abajo encontrarás instrucciones.

        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}> 
          <Typography variant="h6" gutterBottom>
            Funcionalidades principales 
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
                secondary="Haz clic en el ícono de la cámara para indicar que tienes fotos de la especie. Primero debe estar marcada como vista."
              />
            </ListItem>

          </List>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Filtros y búsqueda
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <FilterIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Filtros avanzados" 
                secondary="Filtra por orden, hábitat, departamento, abundancia y estado de observación"
              />
            </ListItem>
            
            <ListItem>
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Ordenamiento automático" 
                secondary="Las aves se ordenan automáticamente por abundancia (más comunes primero). Esta decisión se tomó para poder encontrar más rápido las especies que es más probable hayas observado."
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
                <EmailIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Respaldo por email" 
                secondary="Envía una copia de tus datos por email para respaldo o compartir con otros"
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

        <Box>
          <Typography variant="h6" gutterBottom>
            📚 Bibliografía y fuentes
          </Typography>
          
          <Typography variant="body2" paragraph>
            Esta aplicación utiliza información de las siguientes fuentes:
          </Typography>

          <List dense>
            <ListItem>
              <ListItemText 
                primary={
                  <Typography component="span">
                    • Aves del Uruguay -{' '}
                    <a 
                      href="https://www.bandaoriental.com.uy/libro/aves-del-uruguay-guia-completa-para-conocer/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2', textDecoration: 'underline' }}
                    >
                      Guía completa para conocer Aves del Uruguay
                    </a>
                  </Typography>
                }
                secondary="Gabriel Rocha (2024). Ediciones de la Banda Oriental."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={
                  <Typography component="span">
                    • eBird -{' '}
                    <a 
                      href="https://ebird.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2', textDecoration: 'underline' }}
                    >
                      Macaulay Library
                    </a>
                  </Typography>
                }
                secondary="Imágenes de alta calidad de Cornell Lab of Ornithology"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={
                  <Typography component="span">
                    •{' '}
                    <a 
                      href="https://birdsoftheworld.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2', textDecoration: 'underline' }}
                    >
                      Birds of the World
                    </a>
                    {' '}- Cornell Lab of Ornithology
                  </Typography>
                }
                secondary="Base de datos completa de aves del mundo"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary={
                  <Typography component="span">
                    •{' '}
                    <a 
                      href="https://es.wikipedia.org/wiki/Aves_de_Uruguay" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: '#1976d2', textDecoration: 'underline' }}
                    >
                      Wikipedia - Aves de Uruguay
                    </a>
                  </Typography>
                }
                secondary="Información general sobre aves de Uruguay"
              />
            </ListItem>
          </List>

          <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
            Nota: Esta aplicación es una herramienta educativa y de registro personal. Para identificaciones críticas o estudios científicos, se recomienda consultar guías de campo especializadas y expertos locales.
          </Typography>
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