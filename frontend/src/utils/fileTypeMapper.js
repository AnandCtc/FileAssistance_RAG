export const getFileTypeLabel = (mimeType) => {
  const fileTypeMap = {
    'application/pdf': 'PDF',
    'text/plain': 'TXT',
    'text/csv': 'CSV',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX'
  };

  if (fileTypeMap[mimeType]) {
    return fileTypeMap[mimeType];
  }

  return 'FILE';
};
