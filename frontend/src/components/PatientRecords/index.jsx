import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Grid } from '@mui/material';

const PatientRecords = () => {
  const [patient, setPatient] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const [doctor, setDoctor] = useState('');
  const [recordDate, setRecordDate] = useState(new Date());

  const handleSaveRecord = () => {
    const medicalRecordData = {
      patient,
      recordDate,
      diagnosis,
      treatment,
      notes,
      doctor,
    };

    // Lógica para salvar o prontuário
    console.log('Prontuário salvo:', medicalRecordData);
    alert('Prontuário salvo com sucesso!');
  };

  const handleEditRecord = () => {
    // Lógica para editar o prontuário
    alert('Prontuário pronto para edição!');
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Prontuário Eletrônico
      </Typography>

      <TextField
        label="Paciente"
        value={patient}
        onChange={(e) => setPatient(e.target.value)}
        fullWidth
        variant="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextField
        label="Diagnóstico"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        fullWidth
        variant="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextField
        label="Tratamento"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
        fullWidth
        variant="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextField
        label="Observações"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        style={{ marginBottom: 16 }}
      />

      <TextField
        label="Médico"
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        fullWidth
        variant="outlined"
        style={{ marginBottom: 16 }}
      />

      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSaveRecord}>
            Salvar Prontuário
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={handleEditRecord}>
            Editar Prontuário
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PatientRecords;
