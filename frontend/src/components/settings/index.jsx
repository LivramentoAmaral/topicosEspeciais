import React from 'react';
import { Paper, TextField, Button, Typography, Grid } from '@mui/material';

const Settings = () => {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Configurações do Sistema
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs={12}>
          <TextField label="Nome da Clínica" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Endereço" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Telefone" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Salvar Configurações
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Settings;

