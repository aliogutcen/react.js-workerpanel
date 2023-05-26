import axios from "axios";

const ADD_PERMISSION = "http://localhost/permission/create-permission";

const GET_PERMISSION = "http://localhost/permission/worker/";
class WorkerService {
  createPermission(permission) {
    return axios.post(ADD_PERMISSION, permission);
  }
  getPermissionForWorker(workerid) {
    return axios.get(GET_PERMISSION + workerid);
  }
}

export default new WorkerService();
