import axios from "axios";

const GET_MANAGER_INFO = "http://localhost:9092/api/v1/manager/manager/";
class ManagerService {
  getAllManagerInfo(managerid) {
    return axios.get(GET_MANAGER_INFO + managerid);
  }
}

export default new ManagerService();
