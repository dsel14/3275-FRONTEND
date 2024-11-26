import http from "../http-common.js";

class UserLoginService {
    login(data) {
        return http.post("/login", data);
    }
}

export default new UserLoginService();