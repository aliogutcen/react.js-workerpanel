import "./tableExpense.scss";
import TeamMember from "../../assets/group.svg";
const TableExpense = () => {
  return (
    <div className="expense-table">
      <div className="team-member-info">
        <h4 className="project-team-h4">My Expenses</h4>
        <img className="team-member-image" src={TeamMember} alt="" />
      </div>

      <table className="tables-expense" style={{ width: "100%" }}>
        <tr className="expense-tr-header">
          <th className="expense-header-th-1">Expenses Type</th>
          <th className="expense-header-th-2">Date</th>
          <th className="expense-header-th-3">Status</th>
        </tr>
        <tr className="expense-tr">
          <td className="expense-table-td-1">Travel</td>
          <td className="expense-table-td-2">2023-10-20</td>
          <td className="expense-table-td-3">Pending</td>
        </tr>
        <tr className="expense-tr">
          <td className="expense-table-td-1">Travel</td>
          <td className="expense-table-td-2">2023-10-20</td>
          <td className="expense-table-td-3">Pending</td>
        </tr>
        <tr className="expense-tr">
          <td className="expense-table-td-1">Travel</td>
          <td className="expense-table-td-2">2023-10-20</td>
          <td className="expense-table-td-3">Pending</td>
        </tr>
        <tr className="expense-tr">
          <td className="expense-table-td-1">Travel</td>
          <td className="expense-table-td-2">2023-10-20</td>
          <td className="expense-table-td-3">Pending</td>
        </tr>
      </table>
    </div>
  );
};

export default TableExpense;
