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
import axios from "axios";
const Navbar = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});

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
