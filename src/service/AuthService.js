import axios from "axios";

const LOGIN = "http://localhost:9090/api/v1/auth/login";
const CHANGE_PASSWORD = "http://localhost:9090/api/v1/auth/changepassword";
class AuthService {
  login(admin) {
    return axios.post(LOGIN, admin);
  }
  changePassword(password) {
    return axios.post(CHANGE_PASSWORD, password);
  }
}

export default new AuthService();
