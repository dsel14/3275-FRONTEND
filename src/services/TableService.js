import http from "../http-common.js";

class TableService {
    addTable(data) {
        return http.post("/tables", data);
    }

    getAll() {
        return http.get("/tables");
    }


    // getByCourseId(courseId) {
    //     return http.get(`/courses/${courseId}/quizzes`)
    // }
}

export default new TableService();