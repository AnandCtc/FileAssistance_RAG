import api from './axiosConfig';

export const askQuestion = async (question) => {
  return await api.post('/query', {
    question
  });
};

export const getHistory = async () => {
  return await api.get('/query/history');
};