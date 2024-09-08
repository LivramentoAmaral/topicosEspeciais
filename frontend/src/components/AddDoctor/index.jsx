import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSnackbar } from 'notistack'; // Biblioteca para exibir mensagens de feedback
import { createDoctor, updateDoctor, deleteDoctor, getAllDoctors, searchDoctors } from '../../api/doctor'; // Funções da API para médicos

const DoctorManager = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [contact, setContact] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDoctor, setEditingDoctor] = useState(null); // Para edição
  const { enqueueSnackbar } = useSnackbar();

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar a lista de médicos.', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const doctorData = { name, specialty, contact, workingHours };

    try {
      if (editingDoctor) {
        await updateDoctor(editingDoctor._id, doctorData);
        enqueueSnackbar('Médico atualizado com sucesso!', { variant: 'success' });
      } else {
        await createDoctor(doctorData);
        enqueueSnackbar('Médico cadastrado com sucesso!', { variant: 'success' });
      }

      // Limpar os campos
      setName('');
      setSpecialty('');
      setContact('');
      setWorkingHours('');
      setEditingDoctor(null);
      fetchDoctors();
    } catch (error) {
      enqueueSnackbar(`Erro ao salvar o médico: ${error}`, { variant: 'error' });
    }
  };

  const handleEdit = (doctor) => {
    setName(doctor.name);
    setSpecialty(doctor.specialty);
    setContact(doctor.contact);
    setWorkingHours(doctor.workingHours);
    setEditingDoctor(doctor);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);
      enqueueSnackbar('Médico deletado com sucesso!', { variant: 'success' });
      fetchDoctors();
    } catch (error) {
      enqueueSnackbar(`Erro ao deletar o médico: ${error}`, { variant: 'error' });
    }
  };

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    
    try {
      const data = query.length > 0 ? await searchDoctors({ query }) : await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      enqueueSnackbar('Erro ao buscar médicos.', { variant: 'error' });
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {editingDoctor ? 'Editar Médico' : 'Cadastro de Médicos'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Especialidade"
          variant="outlined"
          fullWidth
          margin="normal"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
        />
        <TextField
          label="Contato"
          variant="outlined"
          fullWidth
          margin="normal"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <TextField
          label="Horário de Trabalho"
          variant="outlined"
          fullWidth
          margin="normal"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
        >
          {editingDoctor ? 'Atualizar Médico' : 'Cadastrar Médico'}
        </Button>
      </form>

      <Typography variant="h6" gutterBottom style={{ marginTop: 32 }}>
        Lista de Médicos
      </Typography>
      <TextField
        label="Pesquisar"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Especialidade</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>Horário de Trabalho</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.contact}</TableCell>
                <TableCell>{doctor.workingHours}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(doctor)}
                    style={{ marginRight: 8 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DoctorManager;
