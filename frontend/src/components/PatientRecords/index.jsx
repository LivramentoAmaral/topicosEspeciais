import React from 'react';
import { Paper, TextField, Button, Typography, Grid } from '@mui/material';

const PatientRecords = () => {
  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Prontuário Eletrônico
      </Typography>
      <TextField
        label="Paciente"
        fullWidth
        variant="outlined"
        style={{ marginBottom: 16 }}
      />
      <TextField
        label="Histórico Médico"
        fullWidth
        variant="outlined"
        multiline
        rows={6}
      />
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item>
          <Button variant="contained" color="primary">
            Salvar Prontuário
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary">
            Editar Prontuário
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientRecords;
