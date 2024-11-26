import http from "../http-common.js";

class QuestionService {
    addQuestion(data) {
        return http.post("/question/", data); // <-- change this line, like this.
    }

    getQuestionsOfQuiz(quizId) {
        return http.get(`/question/quiz/all/${quizId}`);
    }
}

export default new QuestionService();