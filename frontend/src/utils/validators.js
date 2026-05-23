import {
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES
} from './constants';

export const validateFile = (file) => {

  if (!file) {
    return 'No file selected';
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File exceeds 30MB';
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return 'Invalid file type';
  }

  return null;
};