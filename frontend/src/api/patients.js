// src/api/patients.js
import api from './index';

// Função para criar um paciente
export const createPatient = async (data) => {
  try {
    const response = await api.post('/patients', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para atualizar um paciente
export const updatePatient = async (id, data) => {
  try {
    const response = await api.put(`/patients/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para deletar um paciente
export const deletePatient = async (id) => {
  try {
    await api.delete(`/patients/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para buscar pacientes com base em uma consulta
export const searchPatients = async (query) => {
  try {
    const response = await api.get('/patients/search', { params: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para obter todos os pacientes
export const getAllPatients = async () => {
  try {
    const response = await api.get('/patients');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
