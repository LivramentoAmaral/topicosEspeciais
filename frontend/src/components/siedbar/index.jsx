import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DescriptionIcon from '@mui/icons-material/Description';
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Ícone para Médicos

const Sidebar = ({ onSelect }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é pequena

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <List>
      <ListItem button onClick={() => onSelect('dashboard')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => onSelect('patients')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Pacientes" />
      </ListItem>
      <ListItem button onClick={() => onSelect('appointments')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <ScheduleIcon />
        </ListItemIcon>
        <ListItemText primary="Consultas" />
      </ListItem>
      <ListItem button onClick={() => onSelect('records')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Prontuário" />
      </ListItem>
      <ListItem button onClick={() => onSelect('inventory')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Estoque" />
      </ListItem>
      <ListItem button onClick={() => onSelect('doctors')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <LocalHospitalIcon />
        </ListItemIcon>
        <ListItemText primary="Médicos" />
      </ListItem>
      <ListItem button onClick={() => onSelect('reports')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <ReportIcon />
        </ListItemIcon>
        <ListItemText primary="Relatórios" />
      </ListItem>
      <ListItem button onClick={() => onSelect('settings')} style={{ cursor: 'pointer' }}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configurações" />
      </ListItem>
    </List>
  );

  return (
    <>
      {isSmallScreen && (
        <IconButton
          edge="right"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          style={{ marginRight: 0 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      {isSmallScreen ? (
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>
      ) : (
        <div style={{ width: 240 }}>
          {drawer}
        </div>
      )}
    </>
  );
};

export default Sidebar;
