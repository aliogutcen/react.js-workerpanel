import "./expense.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataExpense from "../../components/dataExpense/DataExpense";
const Expense = () => {
  return (
    <div className="expense">
      <Sidebar />
      <div className="expenseContainer">
        <Navbar />
        <DataExpense />
      </div>
    </div>
  );
};

export default Expense;
