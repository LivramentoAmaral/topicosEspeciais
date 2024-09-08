import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Autocomplete,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import {
  createMedicalRecord,
  updateMedicalRecord,
  getAllMedicalRecords,
  deleteMedicalRecord,
} from '../../api/PatientsRecords';
import { getAllPatients } from '../../api/patients';
import { getAllDoctors } from '../../api/doctor';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const PatientRecords = () => {
  const [patient, setPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [notes, setNotes] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [recordDate, setRecordDate] = useState(new Date());
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveRecord = async () => {
    const medicalRecordData = {
      patient: patient ? patient._id : '',
      recordDate,
      diagnosis,
      treatment,
      notes,
      doctor: doctor ? doctor._id : '',
    };

    try {
      if (editingRecordId) {
        await updateMedicalRecord(editingRecordId, medicalRecordData);
        enqueueSnackbar('Prontuário atualizado com sucesso!', { variant: 'success' });
      } else {
        await createMedicalRecord(medicalRecordData);
        enqueueSnackbar('Prontuário salvo com sucesso!', { variant: 'success' });
      }

      resetForm();
      fetchRecords();
    } catch (error) {
      enqueueSnackbar('Erro ao salvar o prontuário. Tente novamente.', { variant: 'error' });
    }
  };

  const handleEditRecord = (record) => {
    setPatient(patients.find(p => p._id === (record.patient ? record.patient._id : '')) || null);
    setDiagnosis(record.diagnosis);
    setTreatment(record.treatment);
    setNotes(record.notes);
    setDoctor(doctors.find(d => d._id === (record.doctor ? record.doctor._id : '')) || null);
    setRecordDate(new Date(record.recordDate));
    setEditingRecordId(record._id);
  };

  const handleDeleteRecord = async (id) => {
    try {
      Swal.fire({
        title: 'Tem certeza?',
        text: 'Esta ação não poderá ser revertida!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteMedicalRecord(id);
          enqueueSnackbar('Prontuário excluído com sucesso!', { variant: 'success' });
          fetchRecords();
        }
      });

    } catch (error) {
      enqueueSnackbar('Erro ao excluir o prontuário. Tente novamente.', { variant: 'error' });
    }
  };

  const fetchRecords = async () => {
    try {
      const data = await getAllMedicalRecords();
      setRecords(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar prontuários.', { variant: 'error' });
    }
  };

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar pacientes.', { variant: 'error' });
    }
  };

  const fetchDoctors = async () => {
    try {
      const data = await getAllDoctors();
      setDoctors(data);
    } catch (error) {
      enqueueSnackbar('Erro ao carregar médicos.', { variant: 'error' });
    }
  };

  const resetForm = () => {
    setPatient(null);
    setDiagnosis('');
    setTreatment('');
    setNotes('');
    setDoctor(null);
    setRecordDate(new Date());
    setEditingRecordId(null);
  };

  useEffect(() => {
    fetchRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  const filteredRecords = records.filter(record => {
    const patientObject = patients.find(p => p._id === (record.patient ? record.patient._id : ''));
    const doctorObject = doctors.find(d => d._id === (record.doctor ? record.doctor._id : ''));
    const patientName = patientObject ? patientObject.name : 'Desconhecido';
    const doctorName = doctorObject ? doctorObject.name : 'Desconhecido';

    return (
      patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Prontuário Eletrônico
      </Typography>

      <Autocomplete
        options={patients}
        getOptionLabel={(option) => option.name || ''}
        value={patient}
        onChange={(event, newValue) => setPatient(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Paciente"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
          />
        )}
      />

      <TextField
        label="Diagnóstico"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        fullWidth
        variant="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextField
        label="Tratamento"
        value={treatment}
        onChange={(e) => setTreatment(e.target.value)}
        fullWidth
        variant="outlined"
        style={{ marginBottom: 16 }}
      />

      <TextField
        label="Observações"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        style={{ marginBottom: 16 }}
      />

      <Autocomplete
        options={doctors}
        getOptionLabel={(option) => option.name || ''}
        value={doctor}
        onChange={(event, newValue) => setDoctor(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Médico"
            variant="outlined"
            fullWidth
            style={{ marginBottom: 16 }}
          />
        )}
      />

      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSaveRecord}>
            {editingRecordId ? 'Atualizar Prontuário' : 'Salvar Prontuário'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary" onClick={resetForm}>
            Limpar Formulário
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom style={{ marginTop: 32 }}>
        Lista de Prontuários
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
              <TableCell>Paciente</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Diagnóstico</TableCell>
              <TableCell>Tratamento</TableCell>
              <TableCell>Observações</TableCell>
              <TableCell>Médico</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => {
              const patientObject = patients.find(p => p._id === (record.patient ? record.patient._id : ''));
              const doctorObject = doctors.find(d => d._id === (record.doctor ? record.doctor._id : ''));
              const patientName = patientObject ? patientObject.name : 'Desconhecido';
              const doctorName = doctorObject ? doctorObject.name : 'Desconhecido';

              return (
                <TableRow key={record._id}>
                  <TableCell>{patientName}</TableCell>
                  <TableCell>{new Date(record.recordDate).toLocaleDateString()}</TableCell>
                  <TableCell>{record.diagnosis}</TableCell>
                  <TableCell>{record.treatment}</TableCell>
                  <TableCell>{record.notes}</TableCell>
                  <TableCell>{doctorName}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEditRecord(record)}>
                      <EditIcon />
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      style={{ marginLeft: 8 }}
                      onClick={() => handleDeleteRecord(record._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PatientRecords;
