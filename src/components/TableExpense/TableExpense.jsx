import "./tableExpense.scss";
import TeamMember from "../../assets/icons8-bill-94.png";
import WorkerService from "../../service/WorkerService";
import ExpenseService from "../../service/ExpenseService";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const TableExpense = () => {
  const [worker, setWorker] = useState({});
  const token = Cookies.get("token");
  const [listPermission, setListPermission] = useState([
    {
      id: "",
      managerid: "",
      workerid: "",
      expenditureType: "",
      amountOfExpenditure: "",
      currency: "",
      replyDate: "",
      approvalStatus: "",
      file: [],
      requestDate: "",
      desc: "",
    },
  ]);

  useEffect(() => {
    WorkerService.getInfoForWorker(token).then((response) => {
      console.log(response);
      setWorker({ ...worker, ...response.data });
    });
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchExpenses = async () => {
      try {
        const response = await ExpenseService.getallexpense(worker.id, {
          cancelToken: source.token,
        });
        console.log(response);
        setListPermission([...response.data]);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      }
    };

    if (worker.id) {
      fetchExpenses();
    }

    return () => {
      source.cancel();
      console.log("useEffect clean-up");
    };
  }, [worker]);
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
        {listPermission.slice(0, 4).map((expense) => {
          const approvalStatus = expense.approvalStatus.replace(
            "PENDING_APPROVAL",
            "PENDING"
          );
          let backgroundColor;

          switch (approvalStatus) {
            case "PENDING":
              backgroundColor = "yellow";
              break;
            case "REJECTED":
              backgroundColor = "rgba(255, 0, 0, 0.651)";
              break;
            default:
              backgroundColor = "transparent";
          }

          return (
            <tr
              className="expense-tr"
              key={expense.id /* or other unique property */}
            >
              <td className="expense-table-td-1">{expense.expenditureType}</td>
              <td className="expense-table-td-2">{expense.requestDate}</td>
              <td className="expense-table-td-3">
                <span style={{ backgroundColor: backgroundColor, padding: 0 }}>
                  {approvalStatus}
                </span>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TableExpense;
