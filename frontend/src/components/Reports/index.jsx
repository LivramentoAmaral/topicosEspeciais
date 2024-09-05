import React from 'react';
import { Paper, Grid, Button, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  // Exemplo de dados simulados baseados em diagnósticos
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'
      , 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Diagnósticos',
        data: [15, 25, 35, 45, 55],  // Quantidade de diagnósticos por mês
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Tratamentos Prescritos',
        data: [10, 20, 25, 35, 40],  // Quantidade de tratamentos prescritos
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y}`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Relatórios de Prontuários Médicos
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item>
          <Button variant="contained" color="primary">
            Gerar Relatório
          </Button>
        </Grid>
      </Grid>

      {/* Gráfico de diagnósticos e tratamentos */}
      <Bar data={data} options={options} />
    </Paper>
  );
};

export default Reports;
