import api from './axiosConfig';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  return await api.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getUploadedFiles = async () => {
  return await api.get('/files');
};

export const deleteFile = async (id) => {
  return await api.delete(`/files/${id}`);
};

export const deleteAllFiles = async () => {
  return await api.delete('/files');
};