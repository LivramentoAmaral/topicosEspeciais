import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Consultas de Hoje</Typography>
          <Typography variant="h4">15</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Pacientes Ativos</Typography>
          <Typography variant="h4">120</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Faturamento Mensal</Typography>
          <Typography variant="h4">R$ 50.000</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
