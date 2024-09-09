import React, { useEffect, useState } from 'react';
import { Paper, Grid, Button, Typography } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { getAllMedicalRecords } from '../../api/PatientsRecords'; // Ajuste o caminho se necessário

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Reports = () => {
  const [diagnosticData, setDiagnosticData] = useState([]);
  const [treatmentData, setTreatmentData] = useState([]);

  // Função para buscar dados de relatórios
  const fetchReportData = async () => {
    try {
      const records = await getAllMedicalRecords();
      
      // Processar os dados dos prontuários médicos para obter diagnósticos e tratamentos
      const diagnostics = records.map(record => record.diagnosis).filter(Boolean);
      const treatments = records.map(record => record.treatment).filter(Boolean);

      const diagnosticsCount = diagnostics.reduce((acc, diagnosis) => {
        acc[diagnosis] = (acc[diagnosis] || 0) + 1;
        return acc;
      }, {});
      
      const treatmentsCount = treatments.reduce((acc, treatment) => {
        acc[treatment] = (acc[treatment] || 0) + 1;
        return acc;
      }, {});

      // Preencher os dados para os gráficos
      const diagnosticLabels = Object.keys(diagnosticsCount);
      const diagnosticValues = Object.values(diagnosticsCount);
      const treatmentLabels = Object.keys(treatmentsCount);
      const treatmentValues = Object.values(treatmentsCount);

      setDiagnosticData(diagnosticValues);
      setTreatmentData(treatmentValues);
    } catch (error) {
      console.error('Erro ao buscar dados do relatório:', error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  // Dados para o gráfico de barras
  const barData = {
    labels: ['Diagnósticos', 'Tratamentos'],
    datasets: [
      {
        label: 'Quantidade',
        data: [diagnosticData.length, treatmentData.length],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
      },
    ],
  };

  const barOptions = {
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

  // Dados para o gráfico de pizza
  const pieData = {
    labels: [...new Set([...diagnosticData, ...treatmentData])],
    datasets: [
      {
        label: 'Distribuição',
        data: [...diagnosticData, ...treatmentData].map(item => item.length),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += `${context.parsed}`;
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

      {/* Gráfico de barras para quantidade de diagnósticos e tratamentos */}
      <Typography variant="h6" gutterBottom>
        Diagnósticos e Tratamentos
      </Typography>
      <Bar data={barData} options={barOptions} />

      {/* Gráfico de pizza para distribuição de diagnósticos e tratamentos */}
      <Typography variant="h6" gutterBottom style={{ marginTop: 32 }}>
        Distribuição de Diagnósticos e Tratamentos
      </Typography>
      <Pie data={pieData} options={pieOptions} />
    </Paper>
  );
};

export default Reports;
