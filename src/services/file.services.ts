// // src/services/file.service.ts
// import axiosInstance from "./axios"; // Ensure axios is set up with your base API URL

// export class FileService {
//   // Method to upload a file (CSV)
//   async uploadFile(formData: FormData): Promise<any> {
//     try {
//       // Send a POST request to the file upload endpoint
//       const response = await axiosInstance.post("/files/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("File uploaded successfully:", response.data);
//       return response.data; // Return the successful response data
//     } catch (error: any) {
//       // Handle different error cases
//       if (error.response) {
//         // The server responded with a status code that falls out of the range of 2xx
//         console.error("Server Error:", error.response.data.message);
//         return Promise.reject(error.response.data.message); // Return error message to be handled in UI
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No response from server:", error.request);
//         return Promise.reject("No response from server");
//       } else {
//         // Something else happened while setting up the request
//         console.error("Error:", error.message);
//         return Promise.reject(error.message);
//       }
//     }
//   }

//   // Method to fetch file metadata by ID
//   async getFileById(id: string): Promise<any> {
//     try {
//       const response = await axiosInstance.get(`/files/${id}`);
//       console.log("Fetched file:", response.data);
//       return response.data; // Return file data
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Server Error:", error.response.data.message);
//         return Promise.reject(error.response.data.message);
//       } else if (error.request) {
//         console.error("No response from server:", error.request);
//         return Promise.reject("No response from server");
//       } else {
//         console.error("Error:", error.message);
//         return Promise.reject(error.message);
//       }
//     }
//   }

//   // Method to delete a file by ID
//   async deleteFile(id: string): Promise<any> {
//     try {
//       const response = await axiosInstance.delete(`/files/delete/${id}`);
//       console.log("Deleted file:", response.data);
//       return response.data; // Return successful response data
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Server Error:", error.response.data.message);
//         return Promise.reject(error.response.data.message);
//       } else if (error.request) {
//         console.error("No response from server:", error.request);
//         return Promise.reject("No response from server");
//       } else {
//         console.error("Error:", error.message);
//         return Promise.reject(error.message);
//       }
//     }
//   }

//   async getAllFiles(): Promise<any> {
//     try {
//       const response = await axiosInstance.get(`/files`);
//       console.log("Fetched file:", response.data);
//       return response.data; // Return file data
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Server Error:", error.response.data.message);
//         return Promise.reject(error.response.data.message);
//       } else if (error.request) {
//         console.error("No response from server:", error.request);
//         return Promise.reject("No response from server");
//       } else {
//         console.error("Error:", error.message);
//         return Promise.reject(error.message);
//       }
//     }
//   }
// }

import axiosInstance from "./axios"; // Ensure axios is set up with your base API URL

export const FileService = {
  // Method to upload a file (CSV)
  async uploadFile(userId: string, formData: FormData): Promise<any> {
    try {
      // Send a POST request to the file upload endpoint
      const response = await axiosInstance.post(
        `/users/${userId}/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      return response.data; // Return the successful response data
    } catch (error: any) {
      // Handle different error cases
      if (error.response) {
        // The server responded with a status code that falls out of the range of 2xx
        console.error("Server Error:", error.response.data.message);
        return Promise.reject(error.response.data.message); // Return error message to be handled in UI
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response from server:", error.request);
        return Promise.reject("No response from server");
      } else {
        // Something else happened while setting up the request
        console.error("Error:", error.message);
        return Promise.reject(error.message);
      }
    }
  },

  // Method to fetch file metadata by ID
  async getFileById(userId: string, id: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`/users/${userId}/files/${id}`);
      console.log("Fetched file:", response.data);
      return response.data; // Return file data
    } catch (error: any) {
      if (error.response) {
        console.error("Server Error:", error.response.data.message);
        return Promise.reject(error.response.data.message);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        return Promise.reject("No response from server");
      } else {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
      }
    }
  },

  // Method to delete a file by ID
  async deleteFile(userId: string, id: string): Promise<any> {
    try {
      const response = await axiosInstance.delete(
        `/users/${userId}/files/delete/${id}`
      );
      console.log("Deleted file:", response.data);
      return response.data; // Return successful response data
    } catch (error: any) {
      if (error.response) {
        console.error("Server Error:", error.response.data.message);
        return Promise.reject(error.response.data.message);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        return Promise.reject("No response from server");
      } else {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
      }
    }
  },

  // Method to fetch all files
  async getAllFiles(userId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`/users/${userId}/files`);
      console.log("Fetched files:", response.data);
      return response.data; // Return file data
    } catch (error: any) {
      if (error.response) {
        console.error("Server Error:", error.response.data.message);
        return Promise.reject(error.response.data.message);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        return Promise.reject("No response from server");
      } else {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
      }
    }
  },
};
