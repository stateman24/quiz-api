import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import QuizController from "../controllers/quiz.controller";
import authMiddleware from "../middlewares/auth.middleware";

class QuizRoute implements Routes {
    public path = "/quiz"
    public router= Router();
    private quizController = new QuizController();

    constructor () {
        this.initializeRoutes();
    }

    public initializeRoutes = () =>{
        this.router.post(this.path + "/create-quiz", [authMiddleware], this.quizController.createQuiz);
        this.router.post(this.path + "/add-question/:id", [authMiddleware], this.quizController.addQuestionToQuiz);
        this.router.post(this.path + "/:quizId/delete-question/:questionId", [authMiddleware], this.quizController.deleteQuizQuestion);
    }
}


export default QuizRoute;