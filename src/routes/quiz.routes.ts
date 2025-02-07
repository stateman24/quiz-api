import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import QuizController from "../controllers/quiz.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { createQuizValidationSchema, deleteValidationSchema, getQuestionsValidationSchema } from "../schemas/quiz.validation.schema";
import { questionValidationSchema } from "../schemas/question.validation.schema";
import validationMiddleware from "../middlewares/validation.middleware";

class QuizRoute implements Routes {
    public path = "/quiz"
    public router= Router();
    private quizController = new QuizController();

    constructor () {
        this.initializeRoutes();
    }

    public initializeRoutes = () =>{
        // create quiz route
        this.router.post(
            this.path + "/create-quiz",
             [authMiddleware, validationMiddleware(createQuizValidationSchema, "body")]
             , this.quizController.createQuiz
            );

        // add-question route    
        this.router.post(
            this.path + "/add-question/:id", 
            [authMiddleware, validationMiddleware(questionValidationSchema, 
                "body")], 
                this.quizController.addQuestionToQuiz
            );

        // delete question route
        this.router.post(
            this.path + "/:quizId/delete-question/:questionId", 
            [authMiddleware, validationMiddleware(deleteValidationSchema, "params")], 
            this.quizController.deleteQuizQuestion
        );

        // get questions route
        this.router.get(
            this.path + "/questions/:quizId", 
            [authMiddleware, validationMiddleware(getQuestionsValidationSchema, "params")], 
            this.quizController.getQuizQuestions
        );

        this.router.get(
            this.path + "/:quizId",
            [authMiddleware, validationMiddleware(getQuestionsValidationSchema, "params")],
            this.quizController.getQuiz
        )
    }
}


export default QuizRoute;