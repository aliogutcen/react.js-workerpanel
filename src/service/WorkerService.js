import axios from "axios";

const GET_INFO_FOR_WORKER = "http://localhost/workers/worker/";

const UPDATE_WORKER = " http://localhost/workers/update";
class WorkerService {
  getInfoForWorker(token) {
    return axios.get(GET_INFO_FOR_WORKER + token);
  }

  updateWorker(data) {
    return axios.post(UPDATE_WORKER, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new WorkerService();
