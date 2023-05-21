import "./welcome.scss";
import Person from "../../assets/3d-casual-life-young-man-in-headphones-sitting-with-laptop-and-waving.png";
import WorkerService from "../../service/WorkerService";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const Welcome = () => {
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
    <div className="welcome">
      <div className="welcome-info">
        <div className="welcome-left-side">
          <h2>Hey {worker.name} Welcome to the Dashboard</h2>
          <p className="welcome-p">
            There are many variations of passages of Lorem Ipsum available, ut
            the majority have suffered passages of Lorem Ipsum available
            alteration in some form
          </p>
        </div>
        <div className="welcome-right-side">
          <img src={Person} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
