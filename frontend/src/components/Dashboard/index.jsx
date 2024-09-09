import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import { getAllPatients } from '../../api/patients';
import { getAllAppointments } from '../../api/AppointmentScheduler'; 
import { getAllDoctors } from '../../api/doctor'; 
import { getAllInventoryItems } from '../../api/Inventory'; 

const Dashboard = () => {
  const [patientsCount, setPatientsCount] = useState(0);
  const [appointmentsTodayCount, setAppointmentsTodayCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);

 
  const fetchDashboardData = async () => {
    try {
      const patients = await getAllPatients();
      setPatientsCount(patients.length);

      const appointments = await getAllAppointments();
      const today = new Date().toISOString().split('T')[0];
      const todayAppointmentsCount = appointments.filter(
        (appointment) => new Date(appointment.date).toISOString().split('T')[0] === today
      ).length;
      setAppointmentsTodayCount(todayAppointmentsCount);

      const doctors = await getAllDoctors();
      setDoctorsCount(doctors.length);

      const inventoryItems = await getAllInventoryItems();
      setInventoryCount(inventoryItems.length);
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Consultas de Hoje</Typography>
          <Typography variant="h4">{appointmentsTodayCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Pacientes Ativos</Typography>
          <Typography variant="h4">{patientsCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Médicos Cadastrados</Typography>
          <Typography variant="h4">{doctorsCount}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6">Itens no Inventário</Typography>
          <Typography variant="h4">{inventoryCount}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
