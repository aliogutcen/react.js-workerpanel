import axios from "axios";

const CREATE_ADVANCE = "http://localhost:9098/api/v1/advance/advances";
const GET_ALL_ADVANCES = "http://localhost:9098/api/v1/advance/workers/";
class AdvanceService {
  createAdvance(advance) {
    return axios.post(CREATE_ADVANCE, advance);
  }
  getAllAdvances(workerid) {
    return axios.get(GET_ALL_ADVANCES + workerid);
  }
}

export default new AdvanceService();
