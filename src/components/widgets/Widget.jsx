import "./widget.scss";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState, useEffect } from "react";
import withAuth from "../../withAuth";
import Expenses from "../../assets/expenses.png";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import TabOutlinedIcon from "@mui/icons-material/TabOutlined";
import ProjectImage from "../../assets/3d-casual-life-sheets-of-documents.png";
import WalletImage from "../../assets/3d-casual-life-wallet-with-banknots-credit-card-and-coins.png";
import MoneyImage from "../../assets/3d-casual-life-open-safe-box-blue.png";
import SickImage from "../../assets/3d-casual-life-medical-history-pills.png";
import axios from "axios";
import Cookies from "js-cookie";
import WorkerService from "../../service/WorkerService";
import PermissionService from "../../service/PermissionService";
import AdvanceService from "../../service/AdvanceService";
import ExpenseService from "../../service/ExpenseService";

const useFetchData = (token) => {
  const [worker, setWorker] = useState({});
  const [listPermission, setListPermission] = useState([{}]);
  const [listAdvance, setListAdvances] = useState([{}]);
  const [expense, setExpense] = useState({});

  const fetchData = async () => {
    const source = axios.CancelToken.source();

    try {
      const workerResponse = await WorkerService.getInfoForWorker(token, {
        cancelToken: source.token,
      });
      setWorker(workerResponse.data);

      if (workerResponse.data.id) {
        const permissionResponse =
          await PermissionService.getPermissionForWorker(
            workerResponse.data.id,
            { cancelToken: source.token }
          );
        setListPermission(permissionResponse.data);

        const advanceResponse = await AdvanceService.getAllAdvances(
          workerResponse.data.id
        );
        setListAdvances([...advanceResponse.data]);

        const expenseResponse = await ExpenseService.getallexpense(
          workerResponse.data.id
        );
        setExpense([...expenseResponse.data]);
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        // Handle the error here
      }
    } finally {
      source.cancel();
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return { worker, listPermission, listAdvance, expense };
};

const Widget = ({ type }) => {
  const token = Cookies.get("token");
  const { worker, listPermission, listAdvance, expense } = useFetchData(token);
  let data;
  switch (type) {
    case "total":
      data = {
        title: "TOTAL PROJECT",
        link: "See all manager",
        count: 1,
        icon: <img className="widget-img" src={ProjectImage} alt="" />,
      };
      break;

    case "retired":
      data = {
        title: "TOTAL PERMISSION",
        link: "See all employee",
        count: listPermission.length,
        icon: <img src={SickImage} className="widget-img" />,
      };
      break;
    case "laik":
      data = {
        title: "TOTAL ADVANCE",
        link: "See all employee",
        count: listAdvance.length,
        icon: <img src={MoneyImage} className="widget-img" />,
      };
      break;
    case "active":
      data = {
        title: "TOTAL EXPENSE",
        link: "See all total company",
        count: expense.length,
        icon: (
          <img
            src="https://res.cloudinary.com/dl7h6kct3/image/upload/c_thumb,w_200,g_face/v1684705818/3d-casual-life-wallet-with-banknots-credit-card-and-coins_zaonun.png"
            className="widget-imga"
            alt=""
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="widget__right">{data.icon}</div>
      <div className="widget__left">
        <span className="widget__title">{data.title}</span>
        <span className="widget__counter">{data.count}</span>
      </div>
    </div>
  );
};

export default withAuth(Widget);
