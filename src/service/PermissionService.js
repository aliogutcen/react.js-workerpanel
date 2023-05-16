import axios from "axios";

const ADD_PERMISSION =
  "http://localhost:9096/api/v1/permission/create-permission";

const GET_PERMISSION = "http://localhost:9096/api/v1/permission/";
class WorkerService {
  createPermission(permission) {
    return axios.post(ADD_PERMISSION, permission);
  }
  getPermissionForWorker(workerid) {
    return axios.get(GET_PERMISSION + workerid);
  }
}

export default new WorkerService();
