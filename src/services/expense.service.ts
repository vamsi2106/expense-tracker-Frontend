// // src/services/expense.service.ts
// import axiosInstance from "./axios";
// import { ExpenseDetails } from "../Interface/expense.interface";

// export class ExpensesService {
//   // Fetch all expenses
//   async getAllExpenses(): Promise<any> {
//     try {
//       const response = await axiosInstance.get("/expenses");
//       console.log("Fetched Expenses:", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Failed to fetch expenses:", error);
//       throw error; // Throw to handle in UI with state management
//     }
//   }

//   // Method to post expense details
//   async postExpenseDetails(expenseData: any) {
//     try {
//       let email = "nagasritha@gmail.com";
//       let customExpenseDetails = { email, ...expenseData };
//       const response = await axiosInstance.post(
//         "/expenses",
//         customExpenseDetails
//       );
//       return response.data; // Return the successful response data
//     } catch (error: any) {
//       // Handle error
//       if (error.response) {
//         // The server responded with a status other than 2xx
//         console.error("Server Error:", error.response.data.message); // Log server error message
//         return Promise.reject(error.response.data.message); // Return error message to thunk
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

//   // Method to delete an expense
//   async deleteExpense(id: string): Promise<any> {
//     try {
//       const response = await axiosInstance.delete(`/expenses/${id}`);
//       console.log("Deleted Expense:", response.data);
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

//   // Method to update an expense
//   async updateExpense(id: string, updateDetails: ExpenseDetails): Promise<any> {
//     try {
//       console.log(updateDetails, "data i got into the services");
//       const response = await axiosInstance.put(
//         `/expenses/${id}`,
//         updateDetails
//       );
//       console.log("Updated Expense:", response.data);
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

//   // Method to get an expense by ID
//   async getExpenseById(id: string): Promise<any> {
//     try {
//       const response = await axiosInstance.get(`/expenses/${id}`);
//       console.log("Fetched Expense by ID:", response.data);
//       return response.data; // Return the successful response data
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

//   async getExpensesGroupedByDate(offset: number, file_id?: string) {
//     try {
//       let url =
//         file_id !== undefined
//           ? `/expenses/filter/group-by-date?offset=${offset}&file_id=${file_id}`
//           : `/expenses/filter/group-by-date?offset=${offset}`;
//       const response = await axiosInstance.get(url);
//       console.log("Fetched Expense by Date:", response.data);
//       return response.data; // Return the successful response data
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

//   async getExpensesGroupedByCategory(
//     file_id?: string,
//     startDate?: string,
//     endDate?: string
//   ) {
//     try {
//       let url =
//         file_id !== undefined
//           ? `/expenses/filter/group-by-category?file_id=${file_id}&startDate=${startDate}&endDate=${endDate}`
//           : `/expenses/filter/group-by-category?startDate=${startDate}&endDate=${endDate}`;
//       const response = await axiosInstance.get(url);
//       console.log("Fetched Expense by category:", response.data);
//       return response.data; // Return the successful response data
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

//   async getExpensesGroupedByWeek(
//     month?: number,
//     year?: number,
//     file_id?: string
//   ) {
//     try {
//       let url =
//         file_id !== undefined
//           ? `/expenses/filter/group-by-week?file_id=${file_id}&year=${year}&month=${month}`
//           : `/expenses/filter/group-by-week?&year=${year}&month=${month}`;
//       const response = await axiosInstance.get(url);
//       console.log("Fetched Expense by week:", response.data);
//       return response.data; // Return the successful response data
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
//   async getExpensesGroupedByMonth(file_id?: string, year?: number) {
//     try {
//       let url =
//         file_id !== undefined
//           ? `/expenses/filter/group-by-month?file_id=${file_id}&year=${year}`
//           : `/expenses/filter/group-by-month?&year=${year}`;
//       const response = await axiosInstance.get(url);
//       console.log("Fetched Expense by month:", response.data);
//       return response.data; // Return the successful response data
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
//   async getExpensesGroupedByYear(file_id?: string) {
//     try {
//       let url =
//         file_id !== undefined
//           ? `/expenses/filter/group-by-year?file_id=${file_id}`
//           : `/expenses/filter/group-by-year`;
//       const response = await axiosInstance.get(url);
//       console.log("Fetched Expense by year:", response.data);
//       return response.data; // Return the successful response data
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

import axiosInstance from "./axios";
import { ExpenseDetails } from "../Interface/expense.interface";

export const ExpensesService = {
  // Fetch all expenses
  async getAllExpenses(
    userId: string,
    params: { startDate?: string; endDate?: string; filter?: string }
  ) {
    try {
      const response = await axiosInstance.get(`/users/${userId}/expenses`, {
        params,
      });
      console.log("Fetched Expenses:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      throw error; // Throw to handle in UI with state management
    }
  },

  // Method to post expense details
  async createExpense(userId: string, expenseData: any) {
    try {
      const response = await axiosInstance.post(
        `/users/${userId}/expenses`,
        expenseData
      );
      return response.data; // Return the successful response data
    } catch (error: any) {
      // Handle error
      if (error.response) {
        console.error("Server Error:", error.response.data.message); // Log server error message
        return Promise.reject(error.response.data.message); // Return error message to thunk
      } else if (error.request) {
        console.error("No response from server:", error.request);
        return Promise.reject("No response from server");
      } else {
        console.error("Error:", error.message);
        return Promise.reject(error.message);
      }
    }
  },

  // Method to delete an expense
  async deleteExpense(userId: string, id: string) {
    try {
      const response = await axiosInstance.delete(
        `/users/${userId}/expenses/${id}`
      );
      console.log("Deleted Expense:", response.data);
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

  // Method to update an expense
  async updateExpense(
    userId: string,
    id: string,
    updateDetails: ExpenseDetails
  ) {
    try {
      console.log(updateDetails, "data i got into the services");
      const response = await axiosInstance.put(
        `/users/${userId}/expenses/${id}`,
        updateDetails
      );
      console.log("Updated Expense:", response.data);
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

  // Method to get an expense by ID
  async getExpenseById(userId: string, id: string) {
    try {
      const response = await axiosInstance.get(
        `/users/${userId}/expenses/${id}`
      );
      console.log("Fetched Expense by ID:", response.data);
      return response.data; // Return the successful response data
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

  // Method to get expenses grouped by date
  async getExpensesGroupedByDate(
    userId: string,
    offset: number,
    file_id?: string
  ) {
    try {
      const url =
        file_id !== undefined
          ? `/users/${userId}/expenses/filter/group-by-date?offset=${offset}&file_id=${file_id}`
          : `/users/${userId}/expenses/filter/group-by-date?offset=${offset}`;
      const response = await axiosInstance.get(url);
      console.log("Fetched Expense by Date:", response.data);
      return response.data; // Return the successful response data
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

  // Method to get expenses grouped by category
  async getExpensesGroupedByCategory(
    userId: string,
    startDate?: string,
    endDate?: string,
    file_id?: string
  ) {
    try {
      const url =
        file_id !== undefined
          ? `/users/${userId}/expenses/filter/group-by-category?file_id=${file_id}&startDate=${startDate}&endDate=${endDate}`
          : `/users/${userId}/expenses/filter/group-by-category?startDate=${startDate}&endDate=${endDate}`;
      const response = await axiosInstance.get(url);
      console.log("Fetched Expense by category:", response.data);
      return response.data; // Return the successful response data
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

  // Method to get expenses grouped by week
  async getExpensesGroupedByWeek(
    userId: string,
    month?: number,
    year?: number,
    file_id?: string
  ) {
    try {
      const url =
        file_id !== undefined
          ? `/users/${userId}/expenses/filter/group-by-week?file_id=${file_id}&year=${year}&month=${month}`
          : `/users/${userId}/expenses/filter/group-by-week?year=${year}&month=${month}`;
      const response = await axiosInstance.get(url);
      console.log("Fetched Expense by week:", response.data);
      return response.data; // Return the successful response data
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

  // Method to get expenses grouped by month
  async getExpensesGroupedByMonth(
    userId: string,
    year?: number,
    file_id?: string
  ) {
    try {
      const url =
        file_id !== undefined
          ? `/users/${userId}/expenses/filter/group-by-month?file_id=${file_id}&year=${year}`
          : `/users/${userId}/expenses/filter/group-by-month?year=${year}`;
      const response = await axiosInstance.get(url);
      console.log("Fetched Expense by month:", response.data);
      return response.data; // Return the successful response data
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

  // Method to get expenses grouped by year
  async getExpensesGroupedByYear(userId: string, file_id?: string) {
    try {
      const url =
        file_id !== undefined
          ? `/users/${userId}/expenses/filter/group-by-year?file_id=${file_id}`
          : `/users/${userId}/expenses/filter/group-by-year`;
      const response = await axiosInstance.get(url);
      console.log("Fetched Expense by year:", response.data);
      return response.data; // Return the successful response data
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
