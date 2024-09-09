import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom'; // Corrigido para usar useNavigate
import Swal from 'sweetalert2';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate(); // Corrigido para usar o hook useNavigate
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Verifica se a tela é pequena

  const handleLogout = () => {
    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saindo...', '', 'success');
        localStorage.removeItem('token');
        navigate('/'); // Usar navigate para redirecionar após logout
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info');
      }
    });
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        <ListItem button component={Link} to="/">
          <HomeIcon />
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/register">
          <PersonAddIcon />
          <ListItemText primary="Cadastro" />
        </ListItem>
        <ListItem button component={Link} to="/login">
          <LoginIcon />
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <LogoutIcon />
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isSmallScreen && (
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ClinicMaster
        </Typography>
        {!isSmallScreen && (
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button color="inherit" component={Link} to="/home" startIcon={<HomeIcon />}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/register" startIcon={<PersonAddIcon />}>
              Cadastro
            </Button>
            <Button color="inherit" component={Link} to="/" startIcon={<LoginIcon />}>
              Login
            </Button>
            <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
