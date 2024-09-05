import React, { useState } from 'react';
import { Paper, Grid, TextField, Button, MenuItem } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AppointmentScheduler = () => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('Scheduled');

  const handleSchedule = () => {
    const appointmentData = {
      patient,
      date,
      time,
      doctor,
      reason,
      status,
    };

    // Lógica de agendamento, por exemplo, uma requisição para salvar a consulta
    console.log('Dados da consulta:', appointmentData);
    alert('Consulta agendada!');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper style={{ padding: 16 }}>
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
            <Button variant="contained" color="primary" onClick={handleSchedule}>
              Agendar Consulta
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default AppointmentScheduler;
