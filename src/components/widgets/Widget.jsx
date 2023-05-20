import "./widget.scss";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AccessibilityNewOutlinedIcon from "@mui/icons-material/AccessibilityNewOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState } from "react";
import withAuth from "../../withAuth";
import Expenses from "../../assets/expenses.png";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";
import TabOutlinedIcon from "@mui/icons-material/TabOutlined";
const Widget = ({ type }) => {
  const [adminCount, setAdminCount] = useState(0);
  const [managerCount, setManagerCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  let data;
  switch (type) {
    case "total":
      data = {
        title: "TOTAL PROJECT",
        link: "See all manager",
        count: managerCount,
        icon: (
          <TabOutlinedIcon
            className="icon"
            style={{ color: "#8ecae6", backgroundColor: "rgba(0, 48, 73)" }}
          />
        ),
      };
      break;

    case "retired":
      data = {
        title: "TOTAL PERMISSION",
        link: "See all employee",
        count: 0,
        icon: (
          <VaccinesOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "laik":
      data = {
        title: "TOTAL ADVANCE",
        link: "See all employee",
        count: 0,
        icon: (
          <BadgeOutlinedIcon
            className="icon"
            style={{
              backgroundColor: " rgba(250, 224, 228)",
              color: "#ff7096",
            }}
          />
        ),
      };
      break;
    case "active":
      data = {
        title: "TOTAL EXPENSE",
        link: "See all total company",
        count: companyCount,
        icon: (
          <AttachMoneyOutlinedIcon
            className="icon"
            style={{
              backgroundColor: " rgba(0, 128, 0, 0.20)",
              color: "green",
            }}
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
