import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Corrigido para usar useNavigate
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate(); // Corrigido para usar o hook useNavigate

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

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ClinicMaster
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/register" startIcon={<PersonAddIcon />}>
            Cadastro
          </Button>
          <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon />}>
            Login
          </Button>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
