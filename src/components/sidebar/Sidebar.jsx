import React, { useState, useContext } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import InsertChartOutlinedSharpIcon from "@mui/icons-material/InsertChartOutlinedSharp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useEffect } from "react";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import WorkerService from "../../service/WorkerService";
import Cookies from "js-cookie";
import withAuth from "../../withAuth";
import Logout from "../logout/Logout";
import axios from "axios";

const Sidebar = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});
  const [isOpen, setIsOpen] = useState(false);
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
  }, [token]); //

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <span className="sidebar__top--logo">HumanCo</span>
      </div>

      <div className="sidebar__center">
        <div className="sidebar__center--avatar">
          <img
            src={
              worker.image
                ? worker.image
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            className="avatar"
          />
        </div>
        <div className="sidebar__center--menu">
          <div className="menu__dashboard">
            <span className="main_span">MAIN</span>
            <Link to="/" style={{ textDecoration: "none" }}>
              <div className="dasboard__item">
                <DashboardOutlinedIcon className="icon" />
                <span>Dashboard</span>
              </div>
            </Link>
          </div>
          <div className="menu__list">
            <span className="main_span">EXPENSE</span>
            <Link to="/expense" style={{ textDecoration: "none" }}>
              <div className="list__item">
                <EngineeringOutlinedIcon className="icon" />
                <span>My Expense</span>
              </div>
            </Link>
          </div>
          <div className="menu__list">
            <span className="main_span">ADVANCE</span>
            <Link to="/advance" style={{ textDecoration: "none" }}>
              <div className="list__item">
                <FormatListNumberedIcon className="icon" />
                <span>My Advance</span>
              </div>
            </Link>
          </div>
          <div className="menu__list">
            <span className="main_span">PERMISSION</span>
            <Link to="/permission" style={{ textDecoration: "none" }}>
              <div className="list__item">
                <FormatListNumberedIcon className="icon" />
                <span>My Permission</span>
              </div>
            </Link>
          </div>

          <div className="menu__useful">
            <span className="main_span">USEFUL</span>
            <div className="main__useful_list">
              <div className="useful__item">
                <InsertChartOutlinedSharpIcon className="icon" />
                <span>Stats</span>
              </div>
              <div className="useful__item">
                <NotificationsNoneIcon className="icon" />
                <span>Notification</span>
              </div>
            </div>
          </div>

          <div className="menu__useful">
            <span className="main_span">USER</span>
            <div className="main__useful_list">
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <div className="useful__item">
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
                </div>
              </Link>
              <div className="useful__item">
                <ExitToAppIcon className="icon" />
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Sidebar);
