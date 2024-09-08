import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, MenuItem, Select, InputLabel, FormControl, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useSnackbar } from 'notistack';
import { createPatient, getAllPatients, updatePatient, deletePatient } from '../../api/patients'; // Importa as funções
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar pacientes.', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      if (editingPatient) {
        await updatePatient(editingPatient._id, {
          name: name,
          age: age,
          gender: sex,
          contact: contact,
          address: address,
          medicalHistory: medicalHistory,
        });
        enqueueSnackbar('Paciente atualizado com sucesso!', { variant: 'success' });
        setEditingPatient(null);
      } else {
        await createPatient({
          name: name,
          age: age,
          gender: sex,
          contact: contact,
          address: address,
          medicalHistory: medicalHistory,
        });
        enqueueSnackbar('Paciente salvo com sucesso!', { variant: 'success' });
      }
      setName('');
      setAge('');
      setSex('');
      setContact('');
      setAddress('');
      setMedicalHistory('');
      fetchPatients();
    } catch (error) {
      enqueueSnackbar('Erro ao salvar o paciente. Tente novamente.', { variant: 'error' });
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setName(patient.name);
    setAge(patient.age);
    setSex(patient.gender);
    setContact(patient.contact);
    setAddress(patient.address);
    setMedicalHistory(patient.medicalHistory);
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      enqueueSnackbar('Paciente excluído com sucesso!', { variant: 'success' });
      fetchPatients();
    } catch (error) {
      enqueueSnackbar('Erro ao excluir o paciente. Tente novamente.', { variant: 'error' });
    }
  };

  const handleOpenDialog = (id) => {
    setEditingPatient(patients.find(patient => patient._id === id));
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPatient(null);
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
            <FormControl fullWidth variant="outlined" required>
              <InputLabel>Sexo</InputLabel>
              <Select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                label="Sexo"
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="Outro">Outro</MenuItem>
              </Select>
            </FormControl>
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              {editingPatient ? 'Atualizar' : 'Salvar'}
            </Button>
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
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Sexo</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Histórico Médico</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>{patient.medicalHistory}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(patient)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleOpenDialog(patient._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Tem certeza de que deseja excluir este paciente?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleDelete(editingPatient._id);
              handleCloseDialog();
            }}
            color="secondary"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PatientForm;
