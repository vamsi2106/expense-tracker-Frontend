import React, { useEffect } from "react";
import { FaPlus, FaDownload, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchFiles, createFile, deleteFile } from "../../store/files.slice";
import "./User.css";

interface File {
  id: number;
  name: string;
  uploadDate: string;
}

const FilesSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { files, page_status, message } = useSelector(
    (state: RootState) => state.files
  );
  const userId = useSelector((state: RootState) => state.user.userid);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFiles({ userId }));
    }
  }, [dispatch, userId]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files; // Correctly accessing the first file
    console.log(file);
    if (file && userId) {
      const formData = new FormData();
      formData.append("file", files[0]);
      console.log(formData);
      dispatch(createFile({ userId, fileData: formData }));
    }
  };

  const handleDeleteFile = (id: number) => {
    if (userId) {
      dispatch(deleteFile({ userId, id: id.toString() }));
    }
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
      {page_status === "loading" && <p>Loading...</p>}
      {message && <p className="text-danger">{message}</p>}
    </div>
  );
};

export default FilesSection;
