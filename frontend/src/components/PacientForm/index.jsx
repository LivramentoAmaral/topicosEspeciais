import React from 'react';
import { TextField, Button, Paper, Grid, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';

const PatientForm = () => {
  return (
    <Paper style={{ padding: 16, margin: '16px auto', maxWidth: 600 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Cadastro de Pacientes
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Nome" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Idade" fullWidth variant="outlined" type="number" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Sexo" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Contato" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Endereço" fullWidth variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Histórico Médico"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ButtonBase
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              width: '100%',
            }}
            onClick={() => alert('Paciente salvo!')}
          >
            Salvar
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ButtonBase
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '4px',
              width: '100%',
            }}
            onClick={() => alert('Paciente editado!')}
          >
            Editar
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientForm;
