import api from './index';

// Função para criar um item de inventário
export const createInventoryItem = async (data) => {
  try {
    const response = await api.post('/inventory', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para atualizar um item de inventário
export const updateInventoryItem = async (id, data) => {
  try {
    const response = await api.put(`/inventory/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para deletar um item de inventário
export const deleteInventoryItem = async (id) => {
  try {
    await api.delete(`/inventory/${id}`);
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para buscar itens de inventário com base em uma consulta
export const searchInventoryItems = async (query) => {
  try {
    const response = await api.get('/inventory/search', { params: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Função para obter todos os itens de inventário
export const getAllInventoryItems = async () => {
  try {
    const response = await api.get('/inventory');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
