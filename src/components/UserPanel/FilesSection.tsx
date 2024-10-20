import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchFiles,
  createFile,
  deleteFile,
} from "../../store/slices/file/fileSlice";
import "./User.css";

interface FileData {
  id: string;
  name: string;
  uploadDate: string;
}

const FilesSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { files, page_status, message } = useSelector(
    (state: RootState) => state.files
  );
  const userId = useSelector((state: RootState) => state.user.userid);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (page_status === "loading") {
      toast.warning("Loading...", { autoClose: 3000 });
    }
  }, [page_status]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFiles({ userId }));
    }
  }, [dispatch, userId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFile && userId) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      dispatch(createFile({ userId, fileData: formData }));
      toast.success("File uploaded successfully!");
      setSelectedFile(null);
    }
  };

  const handleDeleteFile = (id: string) => {
    if (userId) {
      dispatch(deleteFile({ userId, id }));
      toast.error("File deleted!");
    }
  };

  return (
    <div className="files-section">
      <ToastContainer />
      <h3>Manage Files</h3>
      <form onSubmit={handleUploadFile} className="file-form">
        <input type="file" onChange={handleFileChange} required />
        <button type="submit" className="btn-primary">
          Upload File
        </button>
      </form>
      <table className="files-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Upload Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file: FileData) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{new Date(file.uploadDate).toDateString()}</td>
              <td>
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="btn-icon delete"
                >
                  Delete
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
