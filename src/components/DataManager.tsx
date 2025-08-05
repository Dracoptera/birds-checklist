import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Alert,
  TextField,
  Paper,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useUserData } from '../contexts/UserDataContext';
import { UserData } from '../types';

const DataManager: React.FC = () => {
  const { state, exportData, importData } = useUserData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportData();
  };

  const handleImportFromText = () => {
    try {
      const parsedData = JSON.parse(importText);
      
      // Validate the imported data structure
      if (!parsedData.observations || typeof parsedData.observations !== 'object') {
        throw new Error('Invalid data format: missing observations');
      }
      
      if (typeof parsedData.totalSeen !== 'number' || typeof parsedData.totalWithPhotos !== 'number') {
        throw new Error('Invalid data format: missing statistics');
      }

      importData(parsedData as UserData);
      setImportSuccess(true);
      setImportError('');
      setImportText('');
      
      // Close dialog after successful import
      setTimeout(() => {
        setIsDialogOpen(false);
        setImportSuccess(false);
      }, 2000);
      
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Error importing data');
      setImportSuccess(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        
        // Validate the imported data structure
        if (!parsedData.observations || typeof parsedData.observations !== 'object') {
          throw new Error('Invalid data format: missing observations');
        }
        
        if (typeof parsedData.totalSeen !== 'number' || typeof parsedData.totalWithPhotos !== 'number') {
          throw new Error('Invalid data format: missing statistics');
        }

        importData(parsedData as UserData);
        setImportSuccess(true);
        setImportError('');
        
        // Close dialog after successful import
        setTimeout(() => {
          setIsDialogOpen(false);
          setImportSuccess(false);
        }, 2000);
        
      } catch (error) {
        setImportError(error instanceof Error ? error.message : 'Error importing data');
        setImportSuccess(false);
      }
    };
    reader.readAsText(file);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<SettingsIcon />}
        onClick={() => setIsDialogOpen(true)}
        size="small"
        sx={{
          color: 'inherit',
          borderColor: 'rgba(255,255,255,0.3)',
          '&:hover': {
            borderColor: 'rgba(255,255,255,0.5)',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }
        }}
      >
        Gestionar Datos
      </Button>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Gestionar Datos del Checklist</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Exportar Datos
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Descarga una copia de tus datos para guardarlos o transferirlos a otro dispositivo.
            </Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
              fullWidth
            >
              Exportar Checklist
            </Button>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Importar Datos
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Importa datos desde un archivo JSON o pega el contenido directamente.
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={handleFileButtonClick}
                fullWidth
              >
                Seleccionar Archivo
              </Button>
            </Box>
            
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              O pega el contenido JSON aquí:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Pega aquí el contenido JSON..."
              variant="outlined"
              size="small"
            />
            
            <Button
              variant="contained"
              onClick={handleImportFromText}
              disabled={!importText.trim()}
              sx={{ mt: 2 }}
              fullWidth
            >
              Importar desde Texto
            </Button>
          </Box>

          {importError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {importError}
            </Alert>
          )}

          {importSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Datos importados exitosamente
            </Alert>
          )}

          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Typography variant="subtitle2" gutterBottom>
              Estadísticas Actuales:
            </Typography>
            <Typography variant="body2">
              • Aves vistas: {state.totalSeen}
            </Typography>
            <Typography variant="body2">
              • Con fotos: {state.totalWithPhotos}
            </Typography>
            <Typography variant="body2">
              • Última actualización: {new Date(state.lastUpdated).toLocaleString('es-ES')}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataManager; 