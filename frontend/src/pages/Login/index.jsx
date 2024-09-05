import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, Typography, Link } from '@mui/material';
import { loginUser } from '../../api/auth'; // Função para chamar a API de login
import { useNavigate } from 'react-router';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      navigate('/home');
    } catch (error) {
      setError('Falha ao realizar o login. Verifique suas credenciais.');
    }
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 400, margin: 'auto', marginTop: 64 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Entrar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Não tem uma conta?{' '}
            <Link href="/register" underline="hover">
              Cadastre-se
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginPage;
