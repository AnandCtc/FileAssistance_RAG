import { useState } from 'react';
import { uploadFile } from '../api/fileApi';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    if (file.size > 30 * 1024 * 1024) {
      setMessage('File exceeds 30MB');
      return;
    }

    setLoading(true);

    try {
      const response = await uploadFile(file);
      setMessage('Upload successful');
      console.log(response.data);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;