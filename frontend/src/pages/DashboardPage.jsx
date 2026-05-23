import { useEffect, useState } from 'react';

import MainLayout from '../layouts/MainLayout';

import { getUploadedFiles, deleteFile, deleteAllFiles } from '../api/fileApi';

import { getFileTypeLabel } from '../utils/fileTypeMapper';

function DashboardPage() {

  const [search, setSearch] = useState('');

  const [files, setFiles] = useState([]);

  const [error, setError] = useState(null);

  /* FORMAT FILE SIZE */

  const formatFileSize = (size) => {

    if (size == null) {
      return '-';
    }

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  /* FETCH FILES */

  useEffect(() => {

    const fetchFiles = async () => {

      try {

        const response = await getUploadedFiles();

        console.log('Uploaded files:', response.data);

        setFiles(response.data || []);

      } catch (error) {

        console.error(
          'Error loading uploaded files:',
          error
        );

        setError(
          'Failed to load files. Is the backend running?'
        );
      }
    };

    fetchFiles();

  }, []);

  /* DELETE SINGLE FILE */

  const handleDeleteFile = async (id, fileName) => {

    if (
      window.confirm(
        `Are you sure you want to delete "${fileName}"?`
      )
    ) {

      try {

        await deleteFile(id);

        setFiles(
          files.filter(
            (file) => file.id !== id
          )
        );

      } catch (error) {

        console.error(
          'Error deleting file:',
          error
        );

        setError('Failed to delete file');

      }
    }
  };

  /* DELETE ALL FILES */

  const handleDeleteAllFiles = async () => {

    if (
      window.confirm(
        'Are you sure you want to delete ALL files? This cannot be undone.'
      )
    ) {

      try {

        await deleteAllFiles();

        setFiles([]);

      } catch (error) {

        console.error(
          'Error deleting all files:',
          error
        );

        setError(
          'Failed to delete all files'
        );

      }
    }
  };

  const filteredFiles = files.filter((file) =>

    (file.fileName || '')
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <MainLayout>

      <div className="dashboard-page">

        {/* HEADER */}

        <div className="dashboard-header">

          <div>

            <h1>Dashboard</h1>

            <p>
              Overview of your uploaded documents
            </p>

          </div>

        </div>

        {/* ERROR MESSAGE */}

        {error && (

          <div className="error-message">
            {error}
          </div>

        )}

        {/* STATS */}

        <div className="stats-grid">

          {/* TOTAL FILES */}

          <div className="stats-card">

            <div className="stats-icon blue">
              📄
            </div>

            <div>

              <h2>{files.length}</h2>

              <p>Total Files</p>

            </div>

          </div>

          {/* PROCESSED */}

          <div className="stats-card">

            <div className="stats-icon green">
              ✅
            </div>

            <div>

              <h2>{files.length}</h2>

              <p>Processed</p>

            </div>

          </div>

          {/* PROCESSING */}

          <div className="stats-card">

            <div className="stats-icon yellow">
              ⏳
            </div>

            <div>

              <h2>0</h2>

              <p>Processing</p>

            </div>

          </div>

          {/* FAILED */}

          <div className="stats-card">

            <div className="stats-icon red">
              ❌
            </div>

            <div>

              <h2>0</h2>

              <p>Failed</p>

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="table-card">

          <div className="table-header">

            <h3>Uploaded Files</h3>

            <div className="table-controls">

              <input
                type="text"
                placeholder="Search files..."
                className="search-input"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

              {files.length > 0 && (

                <button
                  className="btn-delete-all"
                  onClick={
                    handleDeleteAllFiles
                  }
                >
                  Delete All
                </button>

              )}

            </div>

          </div>

          <table className="modern-table">

            <thead>

              <tr>

                <th>File Name</th>

                <th>Type</th>

                <th>Size</th>

                <th>Status</th>

                <th>Uploaded At</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredFiles.length > 0 ? (

                filteredFiles.map((file, index) => (

                  <tr key={index}>

                    {/* FILE NAME */}

                    <td>
                      {file.fileName || '-'}
                    </td>

                    {/* FILE TYPE */}

                    <td>

                      <span className="file-type-badge">

                        {getFileTypeLabel(
                          file.fileType
                        )}

                      </span>

                    </td>

                    {/* FILE SIZE */}

                    <td>
                      {formatFileSize(
                        file.fileSize
                      )}
                    </td>

                    {/* STATUS */}

                    <td>

                      <span className="status-badge">
                        UPLOADED
                      </span>

                    </td>

                    {/* UPLOADED DATE */}

                    <td>

                      {file.uploadedAt
                        ? new Date(
                            file.uploadedAt
                          ).toLocaleString()
                        : '-'}

                    </td>

                    {/* DELETE ACTION */}

                    <td>

                      <button
                        className="btn-delete"
                        onClick={() =>
                          handleDeleteFile(
                            file.id,
                            file.fileName
                          )
                        }
                        title="Delete file"
                      >
                        🗑️
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="no-files"
                  >

                    No files found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>

  );
}

export default DashboardPage;