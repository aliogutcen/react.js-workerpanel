import axios from "axios";

const LOGIN = "http://localhost/auth/login";
const CHANGE_PASSWORD = "http://localhost/auth/changepassword";
class AuthService {
  login(admin) {
    return axios.post(LOGIN, admin);
  }
  changePassword(password) {
    return axios.post(CHANGE_PASSWORD, password);
  }
}

export default new AuthService();
