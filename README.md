# Human Resources Management Worker Panel

This project is designed as a panel for employees in a workplace to easily carry out their transactions and requests. Employees can view their profile pages, request expenses, request leaves, request advances, and view their projects through this panel.

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673815-a11de218-462d-4e6e-94b1-f0e59f14e7c5.jpg)

## Features

- Project Components
- Inbox
- Mail service
- Notification

## Installation

Install project with npm

```bash
  git clone https://github.com/aliogutcen/worker-fe.git
  cd my-project
  npm install
```

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Run Docker

Clone the project

```bash
  docker push aliogutcen/my-react-worker:20
```

Running on Docker

```bash
  docker build -t <my-react-worker> .
  docker run -p 3000:3000 <my-react-worker>
```

## Usage/Examples

```javascript
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
```

## Screenshot

![App Screenshot](https://user-images.githubusercontent.com/85200452/242674929-3d061c53-3a86-45dc-ae42-b8800ced380f.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673845-ecada0b2-1c8e-4040-8bab-75d98e85989c.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673834-7f49d22b-e5ed-4b1b-8e91-8ac16d898940.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673840-16fb546b-6f18-48db-9ec8-2f161fe92d2a.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673811-8b0af064-525b-4c4e-86ed-246ba9ac10b0.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673820-87a0d838-9796-4a4e-aff2-f1d39549dd54.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673824-7b5f99b1-ddfa-429f-8f7a-1acb19b200fc.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673824-7b5f99b1-ddfa-429f-8f7a-1acb19b200fc.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673828-4f277408-beb4-4bdf-a5b8-8b077449cc89.jpg)

![App Screenshot](https://user-images.githubusercontent.com/85200452/242673830-a31778ce-2bab-4ad1-bcc2-fc91f737f943.jpg)
