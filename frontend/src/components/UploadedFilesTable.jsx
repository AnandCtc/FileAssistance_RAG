function UploadedFilesTable() {
  return (
    <table className="files-table">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Status</th>
          <th>Size</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>sample.pdf</td>
          <td>UPLOADED</td>
          <td>2 MB</td>
        </tr>
      </tbody>
    </table>
  );
}

export default UploadedFilesTable;