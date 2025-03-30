import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import PlacesPage from './pages/PlacesPage';

// Criar um tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FFC107',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PlacesPage />
    </ThemeProvider>
  );
}

export default App;