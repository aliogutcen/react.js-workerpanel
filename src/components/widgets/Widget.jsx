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
const Widget = ({ type }) => {
  const [adminCount, setAdminCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [worker, setWorker] = useState({});
  const token = Cookies.get("token");
  const [listPermission, setListPermission] = useState([{}]);
  const [listAdvance, setListAdvances] = useState([{}]);
  let data;
  const [expense, setExpense] = useState({});
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchWorkerInfo = async () => {
      try {
        const response = await WorkerService.getInfoForWorker(token, {
          cancelToken: source.token,
        });
        setWorker(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("An error occurred: ", error);
        }
      }
    };
    fetchWorkerInfo();
    return () => {
      source.cancel();
    };
  }, [token]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchPermission = async () => {
      try {
        const response = await PermissionService.getPermissionForWorker(
          worker.id,
          { cancelToken: source.token }
        );
        setListPermission(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("An error occurred: ", error);
        }
      }
    };

    if (worker.id) {
      fetchPermission();
    }

    return () => {
      source.cancel();
      console.log("useEffect clean-up");
    };
  }, [worker]);

  useEffect(() => {
    AdvanceService.getAllAdvances(worker.id).then((response) => {
      setListAdvances([...response.data]);
    });
    return () => {
      console.log("useEffect clean-up");
    };
  }, [worker]);

  useEffect(() => {
    ExpenseService.getallexpense(worker.id).then((response) => {
      console.log(response);
      setExpense([...response.data]);
    });
    return () => {
      console.log("useEffect clean-up");
    };
  }, [worker]);
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
        icon: <img src={WalletImage} className="widget-imga" alt="" />,
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
