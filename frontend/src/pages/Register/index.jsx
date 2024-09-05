import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth'; // Função para chamar a API de registro

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Chama a função de registro e salva o token no localStorage
      await registerUser({name:name, email:email, password:password});
      // Redireciona para a página home após o registro bem-sucedido
      navigate('/home');
    } catch (error) {
      setError('Falha ao realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <Paper style={{ padding: 16, maxWidth: 400, margin: 'auto', marginTop: 64 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Cadastre-se
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nome"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
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
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Registrar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography align="center">
            Já tem uma conta?{' '}
            <Link href="/login" underline="hover">
              Faça login
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RegisterPage;
