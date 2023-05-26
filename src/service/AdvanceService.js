import axios from "axios";

const CREATE_ADVANCE = "http://localhost/advance/advances";
const GET_ALL_ADVANCES = "http://localhost/advance/workers/";
class AdvanceService {
  createAdvance(advance) {
    return axios.post(CREATE_ADVANCE, advance);
  }
  getAllAdvances(workerid) {
    return axios.get(GET_ALL_ADVANCES + workerid);
  }
}

export default new AdvanceService();
