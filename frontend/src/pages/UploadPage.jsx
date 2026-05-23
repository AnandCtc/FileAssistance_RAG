import { useRef, useState, useEffect } from 'react';

import MainLayout from '../layouts/MainLayout';

import {
  FiUploadCloud,
  FiFileText,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw
} from 'react-icons/fi';

import axios from 'axios';

import {
  getFileTypeLabel
} from '../utils/fileTypeMapper';

function UploadPage() {

  const fileInputRef = useRef(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [files, setFiles] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const allowedTypes = [
    'application/pdf',
    'text/plain',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  /* SELECT FILES */

  const processFiles = (selectedFiles) => {

    const updatedFiles = [];

    Array.from(selectedFiles).forEach((file) => {

      console.log(`Processing file: ${file.name}, Type: ${file.type}, Size: ${file.size}`);

      // FILE TYPE VALIDATION - Check MIME type first, then file extension
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['pdf', 'txt', 'csv', 'docx'];
      
      const isValidMimeType = allowedTypes.includes(file.type);
      const isValidExtension = allowedExtensions.includes(fileExtension);
      const isValidType = isValidMimeType || (file.type === '' && isValidExtension);

      if (!isValidType) {

        console.warn(`Invalid file type for ${file.name}: MIME=${file.type}, Extension=${fileExtension}`);

        updatedFiles.push({
          file,
          status: 'error',
          progress: 0,
          error: `Invalid file type: .${fileExtension}`
        });

        return;
      }

      // FILE SIZE VALIDATION
      if (file.size > 30 * 1024 * 1024) {

        updatedFiles.push({
          file,
          status: 'error',
          progress: 0,
          error: 'File exceeds 30MB'
        });

        return;
      }

      updatedFiles.push({
        file,
        status: 'ready',
        progress: 0,
        error: null
      });

    });

    setFiles((prev) => [...prev, ...updatedFiles]);
  };

  /* CHOOSE FILE */

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    processFiles(event.target.files);
  };

  /* DRAG & DROP */

  const handleDrop = (event) => {
    event.preventDefault();

    processFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  /* REMOVE FILE */

  const removeFile = (index) => {

    const updated = [...files];

    updated.splice(index, 1);

    setFiles(updated);
  };

  /* UPLOAD FILE */

  const uploadSingleFile = async (fileObj, index) => {

    const formData = new FormData();

    formData.append('file', fileObj.file);

    try {

      console.log(`Uploading file ${index}: ${fileObj.file.name}`);

      updateFile(index, {
        status: 'uploading'
      });

      const response = await axios.post(
        `${apiBaseUrl}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },

          onUploadProgress: (progressEvent) => {

            const percent = Math.round(
              (progressEvent.loaded * 100) /
              progressEvent.total
            );

            updateFile(index, {
              progress: percent
            });
          }
        }
      );

      console.log(`Upload successful for ${fileObj.file.name}:`, response.data);

      updateFile(index, {
        status: 'success',
        progress: 100
      });

    } catch (error) {

      console.error(`Upload failed for ${fileObj.file.name}:`, error);
      console.error('Error response:', error.response);

      const errorMessage =
        error?.response?.data?.error || error?.message || 'Upload failed';

      updateFile(index, {
        status: 'failed',
        error: errorMessage
      });

      setToastMessage(errorMessage);
      setShowToast(true);
    }
  };

  /* UPDATE FILE STATE */

  const updateFile = (index, updatedData) => {

    setFiles((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, ...updatedData }
          : item
      )
    );
  };

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [showToast]);

  /* UPLOAD ALL */

  const handleUploadAll = async () => {

    for (let i = 0; i < files.length; i++) {

      if (
        files[i].status === 'ready' ||
        files[i].status === 'failed'
      ) {

        await uploadSingleFile(files[i], i);
      }

    }
  };

  return (
    <MainLayout>

      <div className="upload-page">

        {toastMessage && showToast && (
          <div className="upload-toast">
            <p>{toastMessage}</p>
          </div>
        )}

        <div className="upload-header">

          <h1>Upload Files</h1>

          <p>
            Upload PDF, DOCX, TXT, CSV files up to 30MB
          </p>

        </div>

        <div className="upload-card">

          {/* HIDDEN INPUT */}

          <input
            type="file"
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* DROPZONE */}

          <div
            className="upload-dropzone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >

            <div className="upload-icon">
              <FiUploadCloud />
            </div>

            <h3>Drag & Drop Files Here</h3>

            <button
              className="choose-file-btn"
              onClick={handleChooseFile}
            >
              Choose Files
            </button>

            <p className="upload-limit">
              Maximum file size: 30MB
            </p>

          </div>

          {/* FILE LIST */}

          <div className="selected-files">

            {files.map((item, index) => (

              <div
                key={index}
                className="selected-file-item"
              >

                <div className="file-left">

                  <div className="file-icon">
                    <FiFileText />
                  </div>

                 <div>

  <p className="file-name">
    {item.file.name}
  </p>

  <div className="file-meta">

    <span className="file-type-badge">

      {getFileTypeLabel(item.file)}

    </span>

    <span className="file-size">

      {(item.file.size / 1024 / 1024).toFixed(2)} MB

    </span>

  </div>

  <p className="file-status">

    {item.status === 'uploading' &&
      `Uploading ${item.progress}%`}

    {item.status === 'success' &&
      'Upload Successful'}

    {item.status === 'failed' &&
      item.error}

    {item.status === 'error' &&
      item.error}

    {item.status === 'ready' &&
      'Ready to upload'}

  </p>

</div>

                </div>

                <div className="file-right">

                  {/* STATUS ICONS */}

                  {item.status === 'success' && (
                    <FiCheckCircle className="success-icon" />
                  )}

                                  {(item.status === 'failed' ||
                  item.status === 'error') && (

                  <div className="error-tooltip-wrapper">

                    <FiAlertCircle className="error-icon" />

                    <div className="error-tooltip">
                      {item.error}
                    </div>

                  </div>

                )}

                  {/* RETRY */}

                  {item.status === 'failed' && (

                    <button
                      className="retry-btn"
                      onClick={() =>
                        uploadSingleFile(item, index)
                      }
                    >
                      <FiRefreshCw />
                    </button>

                  )}

                  {/* REMOVE */}

                  <button
                    className="remove-btn"
                    onClick={() => removeFile(index)}
                  >
                    <FiX />
                  </button>

                </div>

                {/* PROGRESS BAR */}

                {item.status === 'uploading' && (

                  <div className="progress-wrapper">

                    <div
                      className="progress-bar"
                      style={{
                        width: `${item.progress}%`
                      }}
                    />

                  </div>

                )}

              </div>

            ))}

          </div>

          {/* UPLOAD BUTTON */}

          <button
  className="upload-btn"
  onClick={handleUploadAll}
>

  {files.length > 1
    ? 'Upload All Files'
    : 'Upload File'}

</button>

        </div>

      </div>

    </MainLayout>
  );
}

export default UploadPage;