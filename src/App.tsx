import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container } from '@mui/material';
import Header from './components/Header';
import Checklist from './components/Checklist';
import Statistics from './components/Statistics';
import BirdDetail from './components/BirdDetail';
import { UserDataProvider } from './contexts/UserDataContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // Green color for nature/birding theme
    },
    secondary: {
      main: '#1976d2', // Blue for water/birds
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserDataProvider>
        <Router>
          <Header />
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Routes>
              <Route path="/" element={<Checklist />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/bird/:birdId" element={<BirdDetail />} />
            </Routes>
          </Container>
        </Router>
      </UserDataProvider>
    </ThemeProvider>
  );
}

export default App; 