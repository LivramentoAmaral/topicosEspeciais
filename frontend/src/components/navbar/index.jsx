import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Usando react-router-dom para navegação
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ClinicMaster
        </Typography>
        <Box sx={{ display: 'flex' , gap:3}}>
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/cadastro" startIcon={<PersonAddIcon />}>
            Cadastro
          </Button>
          <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
            Login
          </Button>
          <Button color="inherit" component={Link} to="/logout" startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
