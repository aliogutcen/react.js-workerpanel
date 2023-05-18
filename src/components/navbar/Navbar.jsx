import "./navbar.scss";
import React from "react";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import WorkerService from "../../service/WorkerService";
import withAuth from "../../withAuth";
const Navbar = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});

  useEffect(() => {
    WorkerService.getInfoForWorker(token).then((response) => {
      setWorker({ ...worker, ...response.data });
    });
  }, []);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <FullscreenOutlinedIcon className="icon" />
          </div>

          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="item">
              <img
                src={
                  worker.image
                    ? worker.image
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                className="avatar"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Navbar);
