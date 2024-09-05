import React, { useState, useEffect } from 'react';
import { TextField, ButtonBase, Paper, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper as MuiPaper } from '@mui/material';
import { useSnackbar } from 'notistack';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients');
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      } else {
        enqueueSnackbar('Erro ao carregar pacientes.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor.', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          age,
          sex,
          contact,
          address,
          medicalHistory,
        }),
      });

      if (response.ok) {
        enqueueSnackbar('Paciente salvo com sucesso!', { variant: 'success' });
        setName('');
        setAge('');
        setSex('');
        setContact('');
        setAddress('');
        setMedicalHistory('');
        fetchPatients(); // Atualiza a lista de pacientes
      } else {
        enqueueSnackbar('Erro ao salvar o paciente. Tente novamente.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor. Tente novamente.', { variant: 'error' });
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper style={{ padding: 16, margin: '16px auto', maxWidth: 800 }}>
      <Typography variant="h6" align="center" gutterBottom>
        Cadastro de Pacientes
      </Typography>
      <form onSubmit={handleSave}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Idade"
              fullWidth
              variant="outlined"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sexo"
              fullWidth
              variant="outlined"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contato"
              fullWidth
              variant="outlined"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Endereço"
              fullWidth
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Histórico Médico"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              required
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
              type="submit"
            >
              Salvar
            </ButtonBase>
          </Grid>
        </Grid>
      </form>

      <Typography variant="h6" gutterBottom style={{ marginTop: 32 }}>
        Lista de Pacientes
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
              <TableCell>Nome</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Histórico Médico</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.sex}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.medicalHistory}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PatientForm;
