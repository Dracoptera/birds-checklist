import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Checklist from './components/Checklist';
import Statistics from './components/Statistics';
import BirdDetail from './components/BirdDetail';
import { UserDataProvider } from './contexts/UserDataContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

function AppContent() {
  const { theme } = useTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UserDataProvider>
        <Router>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh' 
          }}>
            <Header />
            <Container maxWidth="lg" sx={{ mt: 2, mb: 4, flex: 1 }}>
              <Routes>
                <Route path="/" element={<Checklist />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/bird/:birdId" element={<BirdDetail />} />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </Router>
      </UserDataProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App; 