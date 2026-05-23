import { uploadFile } from '../api/fileApi';

export const uploadDocument = async (file) => {
  try {
    const response = await uploadFile(file);
    return response.data;
  } catch (error) {
    throw error;
  }
};