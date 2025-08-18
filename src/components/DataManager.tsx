import React, { useState, useRef } from "react";
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
  Divider,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
import { useUserData } from "../contexts/UserDataContext";
import { UserData } from "../types";

const DataManager: React.FC = () => {
  const { state, exportData, importData } = useUserData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [importSuccess, setImportSuccess] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    exportData();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBackup = () => {
    if (!emailAddress.trim()) {
      setEmailError("Por favor ingresa una dirección de email");
      return;
    }

    if (!validateEmail(emailAddress.trim())) {
      setEmailError("Por favor ingresa una dirección de email válida");
      return;
    }

    try {
      // Create minimal data for email backup (same as export)
      const minimalData = {
        observations: Object.entries(state.observations).reduce(
          (acc, [birdId, observation]) => {
            // Only include birds that have been seen or have photos
            if (observation.seen || observation.hasPhoto) {
              acc[birdId] = {
                seen: observation.seen,
                hasPhoto: observation.hasPhoto,
                observations: observation.observations, // Include detailed observations
              };
            }
            return acc;
          },
          {} as {
            [birdId: string]: {
              seen: boolean;
              hasPhoto: boolean;
              observations: any[];
            };
          }
        ),
        totalSeen: state.totalSeen,
        totalWithPhotos: state.totalWithPhotos,
        lastUpdated: state.lastUpdated,
        exportDate: new Date().toISOString(),
        version: "1.0",
      };

      const jsonData = JSON.stringify(minimalData, null, 2);

      // Create the email content
      const subject = encodeURIComponent(
        "Respaldo de Checklist de Aves - Uruguay Birding"
      );
      const body = encodeURIComponent(
        `Hola,\n\nAdjunto encontrarás el respaldo de tu lista de aves de Uruguay.\n\n` +
          `Estadísticas:\n` +
          `- Aves vistas: ${state.totalSeen}\n` +
          `- Con fotos: ${state.totalWithPhotos}\n` +
          `- Última actualización: ${new Date(state.lastUpdated).toLocaleString(
            "es-ES"
          )}\n\n` +
          `Para restaurar estos datos, simplemente importa el archivo JSON adjunto en la aplicación.\n\n` +
          `Saludos,\nUruguay Birding Checklist`
      );

      // Include the JSON data in the email body
      const bodyWithData =
        body +
        "\n\n" +
        encodeURIComponent(
          `DATOS JSON (copia y pega en la aplicación para restaurar):\n\n${jsonData}`
        );

      const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${bodyWithData}`;

      // Open the default email client
      window.open(mailtoLink);

      setEmailSuccess(true);
      setEmailError("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setEmailSuccess(false);
      }, 3000);
    } catch (error) {
      setEmailError("Error al preparar el email. Por favor intenta de nuevo.");
      console.error("Email backup error:", error);
    }
  };

  const handleImportFromText = () => {
    try {
      const parsedData = JSON.parse(importText);

      // Validate the imported data structure
      if (
        !parsedData.observations ||
        typeof parsedData.observations !== "object"
      ) {
        throw new Error("Invalid data format: missing observations");
      }

      if (
        typeof parsedData.totalSeen !== "number" ||
        typeof parsedData.totalWithPhotos !== "number"
      ) {
        throw new Error("Invalid data format: missing statistics");
      }

      importData(parsedData as UserData);
      setImportSuccess(true);
      setImportError("");
      setImportText("");

      // Close dialog after successful import
      setTimeout(() => {
        setIsDialogOpen(false);
        setImportSuccess(false);
      }, 2000);
    } catch (error) {
      setImportError(
        error instanceof Error ? error.message : "Error importing data"
      );
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
        if (
          !parsedData.observations ||
          typeof parsedData.observations !== "object"
        ) {
          throw new Error("Invalid data format: missing observations");
        }

        if (
          typeof parsedData.totalSeen !== "number" ||
          typeof parsedData.totalWithPhotos !== "number"
        ) {
          throw new Error("Invalid data format: missing statistics");
        }

        importData(parsedData as UserData);
        setImportSuccess(true);
        setImportError("");

        // Close dialog after successful import
        setTimeout(() => {
          setIsDialogOpen(false);
          setImportSuccess(false);
        }, 2000);
      } catch (error) {
        setImportError(
          error instanceof Error ? error.message : "Error importing data"
        );
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
          color: "inherit",
          borderColor: "rgba(255,255,255,0.3)",
          "&:hover": {
            borderColor: "rgba(255,255,255,0.5)",
            backgroundColor: "rgba(255,255,255,0.1)",
          },
        }}
      >
        <Box sx={{ display: { xs: "none", sm: "block" } }}>Gestionar Datos</Box>
      </Button>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Gestionar Datos del Checklist</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Exportar Datos
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Descarga una copia de tus datos para guardarlos o transferirlos a
              otro dispositivo.
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

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Respaldo por Email
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Envía una copia de tus datos por email para respaldo o compartir
              con otros.
            </Typography>

            <TextField
              fullWidth
              label="Dirección de Email"
              type="email"
              value={emailAddress}
              onChange={(e) => {
                setEmailAddress(e.target.value);
                // Clear error when user starts typing
                if (emailError) setEmailError("");
              }}
              placeholder="tu@email.com"
              variant="outlined"
              size="small"
              error={emailError.includes("válida")}
              helperText={emailError.includes("válida") ? emailError : ""}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              startIcon={<EmailIcon />}
              onClick={handleEmailBackup}
              disabled={!emailAddress.trim()}
              fullWidth
            >
              Enviar por Email
            </Button>

            {emailError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {emailError}
              </Alert>
            )}

            {emailSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Email preparado exitosamente. Se abrirá tu cliente de email
                predeterminado.
              </Alert>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Importar Datos
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Importa datos desde un archivo JSON o pega el contenido
              directamente.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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
              style={{ display: "none" }}
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

          <Paper sx={{ p: 2, bgcolor: "grey.50" }}>
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
              • Última actualización:{" "}
              {new Date(state.lastUpdated).toLocaleString("es-ES")}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataManager;
