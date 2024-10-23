import axiosInstance from "./axios";

export const FileService = {
  async uploadFile(userId: string, formData: FormData) {
    const response = await axiosInstance.post(
      `/users/${userId}/files/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  async getFileById(userId: string, id: string) {
    const response = await axiosInstance.get(`/users/${userId}/files/${id}`);
    return response.data;
  },

  async getAllFiles(userId: string) {
    const response = await axiosInstance.get(`/users/${userId}/files`);
    return response.data;
  },

  async deleteFile(userId: string, id: string) {
    const response = await axiosInstance.delete(
      `/users/${userId}/files/delete/${id}`
    );
    return response.data;
  },
};
