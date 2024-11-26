import http from "../http-common.js";

class TopicService {
    addTopic(data) {
        return http.post("/topic", data);
    }

    getAllTopics() {
        return http.get("/topic");
    }
}

export default new TopicService();