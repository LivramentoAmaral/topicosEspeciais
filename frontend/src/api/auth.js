// src/api/auth.js
import api from './index'; 

export const registerUser = async (data) => {
  try {
    console.log (data);
    const response = await api.post('/register/', data);
    

    const { token } = response.data;

    localStorage.setItem('token', token);
    return response.data; 
  } catch (error) {
    throw error.response?.data || error.message; 
  }
};

export const loginUser = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      
      return response.data; 
    } catch (error) {
      throw error.response?.data || error.message; 
    }
  };

export const getUserProfile = async () => {
  try {
    const response = await api.get('/profile');
   
    return response.data;

  } catch (error) {
    throw error.response?.data || error.message;
  }
};
