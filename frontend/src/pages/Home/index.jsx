import React, { useState } from 'react';
import { Grid, Button, CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from '../../components/navbar'; // Importando a Navbar
import Dashboard from '../../components/Dashboard';
import PatientForm from '../../components/PacientForm';
import AppointmentScheduler from '../../components/AppointmentScheduler';
import PatientRecords from '../../components/PatientRecords';
import InventoryManagement from '../../components/InventoryManagement';
import Reports from '../../components/Reports';
import Settings from '../../components/settings';
import Sidebar from '../../components/siedbar';
import themes from '../../themes'; // Certifique-se de que 'themes' está exportando um objeto de temas
import AddDoctor from '../../components/AddDoctor';

function HomePage() {
  const [theme, setTheme] = useState('light');

  const themeMode = createTheme(themes[theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [selectedComponent, setSelectedComponent] = useState('dashboard');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientForm />;
      case 'doctors':
        return <AddDoctor />;
      case 'appointments':
        return <AppointmentScheduler />;
      case 'records':
        return <PatientRecords />;
      case 'inventory':
        return <InventoryManagement />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  // Verificar se a tela é pequena
  const isSmallScreen = useMediaQuery(themeMode.breakpoints.down('md', 'sm'));

  return (
    <ThemeProvider theme={themeMode}>
      <CssBaseline />
      <Navbar /> {/* Adicionando a Navbar */}
      <Grid container style={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          md={2}
          style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #ddd' }}
        >
          <Sidebar onSelect={setSelectedComponent} />
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          style={{ padding: 16, display: 'flex', flexDirection: 'column' }}
        >
          {renderComponent()}
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleTheme}
            style={{
              position: 'fixed',
              bottom: 16,
              right: 16,
            }}
          >
            {theme === 'light' ? '🌙' : '🌞'}
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default HomePage;
