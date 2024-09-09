import api from './index';

// Função para criar um agendamento
export const createAppointment = async (data) => {
  try {
    const response = await api.post('/appointments', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para atualizar um agendamento
export const updateAppointment = async (id, data) => {
  try {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para deletar um agendamento
export const deleteAppointment = async (id) => {
  try {
    await api.delete(`/appointments/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para buscar agendamentos com base em uma consulta
export const searchAppointments = async (query) => {
  try {
    const response = await api.get('/appointments/search', { params: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para obter todos os agendamentos
export const getAllAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
