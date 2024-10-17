import React from "react";
import { FaPlus, FaDownload, FaTrash } from "react-icons/fa";
import "./User.css";
interface File {
  id: number;
  name: string;
  uploadDate: string;
}

interface FilesSectionProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FilesSection: React.FC<FilesSectionProps> = ({ files, setFiles }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: File = {
        id: files.length + 1,
        name: file.name,
        uploadDate: new Date().toISOString().split("T")[0],
      };
      setFiles([...files, newFile]);
    }
  };

  const handleDeleteFile = (id: number) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  return (
    <div className="files-section">
      <h3>Uploaded Files</h3>
      <div className="file-upload">
        <label htmlFor="file-upload" className="btn-primary">
          <FaPlus /> Upload File
        </label>
        <input id="file-upload" type="file" onChange={handleFileUpload} />
      </div>
      <table className="files-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{file.uploadDate}</td>
              <td>
                <button className="btn-icon">
                  <FaDownload />
                </button>
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="btn-icon delete"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesSection;
