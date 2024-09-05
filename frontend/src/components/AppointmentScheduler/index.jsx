import React, { useState, useEffect } from 'react';
import { Paper, Grid, TextField, Button, MenuItem, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Paper as MuiPaper } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSnackbar } from 'notistack';

const AppointmentScheduler = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('Scheduled');
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSchedule = async () => {
    const appointmentData = {
      patient,
      date,
      time,
      doctor,
      reason,
      status,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        enqueueSnackbar('Consulta agendada com sucesso!', { variant: 'success' });
        setDate(null);
        setTime(null);
        setPatient('');
        setDoctor('');
        setReason('');
        setStatus('Scheduled');
        fetchAppointments(); // Atualiza a lista de consultas
      } else {
        enqueueSnackbar('Erro ao agendar a consulta. Tente novamente.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor. Tente novamente.', { variant: 'error' });
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        enqueueSnackbar('Erro ao carregar consultas.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Erro de conexão com o servidor.', { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Grid item xs={12}>
            <TextField
              label="Paciente"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Médico"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              fullWidth
              variant="outlined"
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
              variant="outlined"
            >
              <MenuItem value="Scheduled">Agendada</MenuItem>
              <MenuItem value="Completed">Concluída</MenuItem>
              <MenuItem value="Cancelled">Cancelada</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSchedule}
              fullWidth
            >
              Agendar Consulta
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom style={{ marginTop: 32 }}>
          Lista de Consultas
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
                <TableCell>Hora</TableCell>
                <TableCell>Médico</TableCell>
                <TableCell>Motivo</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.patient}</TableCell>
                  <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.doctor}</TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell>{appointment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </LocalizationProvider>
  );
};

export default AppointmentScheduler;
