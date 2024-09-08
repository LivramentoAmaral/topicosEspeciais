import api from './index'; // Supondo que 'api' seja a instância do Axios configurada

// Função para criar um prontuário médico
export const createMedicalRecord = async (data) => {
  try {
    const response = await api.post('/medical-records', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para atualizar um prontuário médico
export const updateMedicalRecord = async (id, data) => {
  try {
    const response = await api.put(`/medical-records/${id}`, data);
    console.log('response', response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};  

// Função para deletar um prontuário médico
export const deleteMedicalRecord = async (id) => {
  try {
    await api.delete(`/medical-records/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para buscar prontuários médicos com base em uma consulta
export const searchMedicalRecords = async (query) => {
  try {
    const response = await api.get('/medical-records/search', { params: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para obter todos os prontuários médicos
export const getAllMedicalRecords = async () => {
  try {
    const response = await api.get('/medical-records');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
