import React, { useState } from 'react';
import { Grid, Button, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from '../../components/navbar'; // Importando a Navbar
import Dashboard from '../../components/Dashboard';
import PatientForm from '../../components/PacientForm';
import AppointmentScheduler from '../../components/AppointmentScheduler';
import PatientRecords from '../../components/PatientRecords';
import InventoryManagement from '../../components/InventoryManagement';
import Reports from '../../components/Reports';
import Settings from '../../components/settings';
import Sidebar from '../../components/siedbar';
import themes from '../../themes';

function HomePage() {
  const [theme, setTheme] = useState('light');

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

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <Navbar /> {/* Adicionando a Navbar */}
      <Grid container style={{ position: 'relative', height: '100vh' }}>
        <Grid item xs={2}>
          <Sidebar onSelect={setSelectedComponent} />
        </Grid>
        <Grid item xs={10} style={{ padding: 16, position: 'relative' }}>
          {renderComponent()}
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleTheme}
            style={{
              position: 'absolute',
              top: 16,
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
