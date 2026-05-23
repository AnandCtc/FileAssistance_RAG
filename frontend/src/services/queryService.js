import { askQuestion } from '../api/queryApi';

export const queryDocument = async (question) => {
  try {
    const response = await askQuestion(question);
    return response.data;
  } catch (error) {
    throw error;
  }
};