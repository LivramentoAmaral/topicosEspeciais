import React, { useState, useEffect } from 'react';
import { Paper, TextField, Button, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper as MuiPaper } from '@mui/material';
import { useSnackbar } from 'notistack';

const PatientRecords = () => {
  const [patient, setPatient] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const [doctor, setDoctor] = useState('');
  const [recordDate, setRecordDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveRecord = async () => {
    const medicalRecordData = {
      patient,
      recordDate,
      diagnosis,
      treatment,
      notes,
      doctor,
    };

    try {
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medicalRecordData),
      });

      if (response.ok) {
        enqueueSnackbar('Prontuário salvo com sucesso!', { variant: 'success' });
        setPatient('');
        setDiagnosis('');
        setTreatment('');
        setNotes('');
        setDoctor('');
        setRecordDate(new Date());
        fetchRecords(); // Atualiza a lista de prontuários
      } else {
        enqueueSnackbar('Erro ao salvar o prontuário. Tente novamente.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor. Tente novamente.', { variant: 'error' });
    }
  };

  const handleEditRecord = () => {
    // Lógica para editar o prontuário
    enqueueSnackbar('Prontuário pronto para edição!', { variant: 'info' });
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/records');
      if (response.ok) {
        const data = await response.json();
        setRecords(data);
      } else {
        enqueueSnackbar('Erro ao carregar prontuários.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor.', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const filteredRecords = records.filter(record =>
    record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      <Typography variant="h6" gutterBottom style={{ marginTop: 32 }}>
        Lista de Prontuários
      </Typography>
      <TextField
        label="Pesquisar"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={MuiPaper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paciente</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Diagnóstico</TableCell>
              <TableCell>Tratamento</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Médico</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record._id}>
                <TableCell>{record.patient}</TableCell>
                <TableCell>{new Date(record.recordDate).toLocaleDateString()}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.treatment}</TableCell>
                <TableCell>{record.notes}</TableCell>
                <TableCell>{record.doctor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PatientRecords;
