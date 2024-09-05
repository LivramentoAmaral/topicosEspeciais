import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSnackbar } from 'notistack'; // Biblioteca para exibir mensagens de feedback

const AddDoctor = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [contact, setContact] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const fetchDoctors = async () => {
    try {
      const response = await fetch('/api/doctors');
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      } else {
        enqueueSnackbar('Erro ao carregar médicos.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor.', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          specialty,
          contact,
          workingHours,
        }),
      });

      if (response.ok) {
        enqueueSnackbar('Médico cadastrado com sucesso!', { variant: 'success' });
        setName('');
        setSpecialty('');
        setContact('');
        setWorkingHours('');
        fetchDoctors(); // Atualiza a lista de médicos
      } else {
        enqueueSnackbar('Erro ao cadastrar o médico. Tente novamente.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor. Tente novamente.', { variant: 'error' });
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cadastro de Médico
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
          Cadastrar
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
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper} style={{ marginTop: 16 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Especialidade</TableCell>
              <TableCell>Contato</TableCell>
              <TableCell>Horário de Trabalho</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.contact}</TableCell>
                <TableCell>{doctor.workingHours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AddDoctor;
