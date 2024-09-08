import api from './index';

// Função para criar um médico
export const createDoctor = async (data) => {
  try {
    const response = await api.post('/doctors', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para atualizar um médico
export const updateDoctor = async (id, data) => {
  try {
    const response = await api.put(`/doctors/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para deletar um médico
export const deleteDoctor = async (id) => {
  try {
    await api.delete(`/doctors/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para buscar médicos com base em uma consulta
export const searchDoctors = async (query) => {
  try {
    const response = await api.get('/doctors/search', { params: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para obter todos os médicos
export const getAllDoctors = async () => {
  try {
    const response = await api.get('/doctors');
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
