import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Autocomplete,
} from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSnackbar } from 'notistack';
import { createAppointment, getAllAppointments, updateAppointment, deleteAppointment } from '../../api/AppointmentScheduler'; 
import { getAllPatients } from '../../api/patients'; // Função para buscar pacientes
import { getAllDoctors } from '../../api/doctor'; // Função para buscar médicos
import Swal from 'sweetalert2';

const AppointmentScheduler = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [patient, setPatient] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('Agendada');
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingAppointmentId, setEditingAppointmentId] = useState(null); // Estado para armazenar o ID da consulta em edição
  const { enqueueSnackbar } = useSnackbar();

  // Função para buscar consultas
  const fetchAppointments = async () => {
    try {
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar consultas.', { variant: 'error' });
    }
  };

  // Função para buscar pacientes
  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar pacientes.', { variant: 'error' });
    }
  };

  // Função para buscar médicos
  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar médicos.', { variant: 'error' });
    }
  };

  // Carrega pacientes, médicos e consultas quando o componente é montado
  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchDoctors();
  }, []);

  // Função para agendar ou atualizar consulta
  const handleSchedule = async () => {
    const appointmentData = {
      patient: patient ? patient._id : '',
      doctor: doctor ? doctor._id : '',
      date,
      time,
      reason,
      status,
    };

    try {
      if (editingAppointmentId) {
        await updateAppointment(editingAppointmentId, appointmentData);
        enqueueSnackbar('Consulta atualizada com sucesso!', { variant: 'success' });
      } else {
        await createAppointment(appointmentData);
        enqueueSnackbar('Consulta agendada com sucesso!', { variant: 'success' });
      }

      // Limpa o formulário
      setDate(null);
      setTime(null);
      setPatient(null);
      setDoctor(null);
      setReason('');
      setStatus('Agendada');
      setEditingAppointmentId(null); // Limpa o ID de edição
      fetchAppointments();
    } catch (error) {
      enqueueSnackbar('Erro ao agendar/atualizar a consulta. Tente novamente.', { variant: 'error' });
    }
  };

  // Função para editar consulta
  const handleEdit = (appointment) => {
    setDate(new Date(appointment.date));
    setTime(appointment.time);
    setPatient(patients.find(p => p._id === appointment.patient._id));
    setDoctor(doctors.find(d => d._id === appointment.doctor));
    setReason(appointment.reason);
    setStatus(appointment.status);
    setEditingAppointmentId(appointment._id); // Armazena o ID da consulta em edição
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não poderá ser desfeita.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteAppointment(id);
          enqueueSnackbar('Consulta excluída com sucesso!', { variant: 'success' });
          fetchAppointments(); 
        }
      });
    } catch (error) {
      enqueueSnackbar('Erro ao excluir a consulta.', { variant: 'error' });
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientObject = patients.find(p => p._id === appointment.patient);
    const doctorObject = doctors.find(d => d._id === appointment.doctor);
    const patientName = patientObject ? patientObject.name : 'Desconhecido';
    const doctorName = doctorObject ? doctorObject.name : 'Desconhecido';

    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Agendamento de Consultas
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Data da Consulta"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TimePicker
              label="Hora da Consulta"
              value={time}
              onChange={(newValue) => setTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          {/* Campo de autocomplete para selecionar pacientes */}
          <Grid item xs={12}>
            <Autocomplete
              options={patients}
              getOptionLabel={(option) => option.name || ''}
              value={patient}
              onChange={(event, newValue) => setPatient(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Paciente" variant="outlined" fullWidth />
              )}
            />
          </Grid>

          {/* Campo de autocomplete para selecionar médicos */}
          <Grid item xs={12}>
            <Autocomplete
              options={doctors}
              getOptionLabel={(option) => option.name || ''}
              value={doctor}
              onChange={(event, newValue) => setDoctor(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Médico" variant="outlined" fullWidth />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Motivo da Consulta"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Status da Consulta"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="Agendada">Agendada</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
              <MenuItem value="Cancelada">Cancelada</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSchedule}>
              {editingAppointmentId ? 'Atualizar Consulta' : 'Agendar Consulta'}
            </Button>
          </Grid>
        </Grid>

        {/* Campo de pesquisa */}
        <TextField
          label="Pesquisar Consulta"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Tabela de consultas */}
        <TableContainer component={Paper} style={{ marginTop: 16 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment) => {
                const patientObject = patients.find(p => p._id === (appointment.patient? appointment.patient._id : ''));
                const doctorObject = doctors.find(d => d._id === appointment.doctor);
                const formattedTime = appointment.time ? new Date(appointment.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Desconhecido';
                
                return (
                  <TableRow key={appointment._id}>
                    <TableCell>{patientObject ? patientObject.name : 'Desconhecido'}</TableCell>
                    <TableCell>{doctorObject ? doctorObject.name : 'Desconhecido'}</TableCell>
                    <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                    <TableCell>{formattedTime}</TableCell>
                    <TableCell>{appointment.reason}</TableCell>
                    <TableCell>{appointment.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(appointment)}
                        style={{ marginRight: 8 }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(appointment._id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </LocalizationProvider>
  );
};

export default AppointmentScheduler;
