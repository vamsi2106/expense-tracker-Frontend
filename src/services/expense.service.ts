import axiosInstance from "./axios";

export const ExpensesService = {
  async createExpense(userId: string, expenseData: any) {
    const response = await axiosInstance.post(
      `/users/${userId}/expenses`,
      expenseData
    );
    return response.data;
  },

  async getAllExpenses(
    userId: string,
    params: { startDate?: string; endDate?: string; filter?: string }
  ) {
    const response = await axiosInstance.get(`/users/${userId}/expenses`, {
      params,
    });
    return response.data;
  },

  async getExpenseById(userId: string, id: string) {
    const response = await axiosInstance.get(`/users/${userId}/expenses/${id}`);
    return response.data;
  },

  async updateExpense(userId: string, id: string, updateDetails: any) {
    const response = await axiosInstance.put(
      `/users/${userId}/expenses/${id}`,
      updateDetails
    );
    return response.data;
  },

  async deleteExpense(userId: string, id: string) {
    const response = await axiosInstance.delete(
      `/users/${userId}/expenses/${id}`
    );
    return response.data;
  },

  async getExpensesGroupedByDate(
    userId: string,
    offset: number,
    file_id?: string
  ) {
    const response = await axiosInstance.get(
      `/users/${userId}/expenses/filter/group-by-date`,
      { params: { offset, file_id } }
    );
    return response.data;
  },

  async getExpensesGroupedByCategory(
    userId: string,
    startDate?: string,
    endDate?: string,
    file_id?: string
  ) {
    const response = await axiosInstance.get(
      `/users/${userId}/expenses/filter/group-by-category`,
      { params: { startDate, endDate, file_id } }
    );
    return response.data;
  },

  async getExpensesGroupedByWeek(
    userId: string,
    month?: number,
    year?: number,
    file_id?: string
  ) {
    const response = await axiosInstance.get(
      `/users/${userId}/expenses/filter/group-by-week`,
      { params: { month, year, file_id } }
    );
    return response.data;
  },

  async getExpensesGroupedByMonth(
    userId: string,
    year?: number,
    file_id?: string
  ) {
    const response = await axiosInstance.get(
      `/users/${userId}/expenses/filter/group-by-month`,
      { params: { year, file_id } }
    );
    return response.data;
  },

  async getExpensesGroupedByYear(userId: string, file_id?: string) {
    const response = await axiosInstance.get(
      `/users/${userId}/expenses/filter/group-by-year`,
      { params: { file_id } }
    );
    return response.data;
  },
};
