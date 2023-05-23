import "./teamleader.scss";
import Leader from "../../assets/man.png";
import Github from "../../assets/github.png";

import Mail from "../../assets/casual-life-3d-open-white-envelope-with-blue-letter.png";
import LinkedIn from "../../assets/linkedin-2.png";
import Phone from "../../assets/3d-casual-life-messages.png";
import SmartPhone from "../../assets/casual-life-3d-retro-phone-flying.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect, useCallback } from "react";
import WorkerService from "../../service/WorkerService";
import ManagerService from "../../service/ManagerService";
const TeamLeader = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});
  const [manager, setManager] = useState({});
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchWorkerInfo = async () => {
      try {
        const response = await WorkerService.getInfoForWorker(token, {
          cancelToken: source.token,
        });
        console.log(response);
        setWorker({ ...worker, ...response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchWorkerInfo();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchWorkerInfo = async () => {
      try {
        const response = await ManagerService.getAllManagerInfo(
          worker.managerid,
          {
            cancelToken: source.token,
          }
        );
        console.log(response);
        setManager({ ...manager, ...response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchWorkerInfo();

    return () => {
      source.cancel();
    };
  }, [worker]);

  return (
    <div className="teamleader">
      <div className="infoteamleader">
        <h4 className="teamleader-h4">TEAM LEADER INFORMATION</h4>
      </div>
      <div className="information-for-leader">
        <img src={Leader} alt="" className="leader" />
        <div className="information-leader">
          <h6 className="contact-h6">
            {manager.firstName + " " + manager.surname}
          </h6>

          <div className="phone-mail-info">
            <div className="contact-detail">
              <img src={Mail} className="contact-icon" />
              <p className="mail-p">{manager.email}</p>
            </div>
          </div>
          <div className="leader-social">
            <div className="social-media-leader">
              <img src={Github} className="social-icon" />
              <p className="mail-p">berkinyardimci</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeader;
