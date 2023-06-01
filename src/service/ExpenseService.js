import axios from "axios";

const CREATE_EXPENSE = "http://localhost:9097/api/v1/expense/expenses";
const GET_ALL_EXPENSE = "http://localhost:9097/api/v1/expense/workers/";

class ExpenseService {
  createExpense(expenses) {
    return axios.post(CREATE_EXPENSE, expenses, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getallexpense(workerid) {
    return axios.get(GET_ALL_EXPENSE + workerid);
  }
}

export default new ExpenseService();
