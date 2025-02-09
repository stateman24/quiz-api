import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import QuizController from "../controllers/quiz.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
	createQuizValidationSchema,
	deleteValidationSchema,
	getQuizIdValidationSchema,
	getQuizQueryValidationSchema,
	getQuizzesQueryValidationSchema,
	updateQuizValidationSchema,
} from "../schemas/quiz.validation.schema";
import { questionValidationSchema } from "../schemas/question.validation.schema";
import validationMiddleware from "../middlewares/validation.middleware";

class QuizRoute implements Routes {
	public path = "/quiz";
	public router = Router();
	private quizController = new QuizController();

	constructor() {
		this.initializeRoutes();
	}

	public initializeRoutes = () => {
		// create quiz route
		this.router.post(
			this.path + "/create-quiz",
			[
				authMiddleware,
				validationMiddleware(createQuizValidationSchema, "body"),
			],
			this.quizController.createQuiz
		);

		// add-question route
		this.router.post(
			this.path + "/add-question/:id",
			[authMiddleware, validationMiddleware(questionValidationSchema, "body")],
			this.quizController.addQuestionToQuiz
		);

		// delete question route
		this.router.delete(
			this.path + "/:quizId/delete-question/:questionId",
			[authMiddleware, validationMiddleware(deleteValidationSchema, "params")],
			this.quizController.deleteQuizQuestion
		);

		// delete quiz route
		this.router.delete(
			this.path + "/:quizId",
			[
				authMiddleware,
				validationMiddleware(getQuizIdValidationSchema, "params"),
			],
			this.quizController.deleteQuiz
		);

		// get questions route
		this.router.get(
			this.path + "/questions/:quizId",
			[
				authMiddleware,
				validationMiddleware(getQuizIdValidationSchema, "params"),
				validationMiddleware(getQuizQueryValidationSchema, "query"),
			],
			this.quizController.getQuizQuestions
		);

		// get quiz by Id
		this.router.get(
			this.path + "/:quizId",
			[
				authMiddleware,
				validationMiddleware(getQuizIdValidationSchema, "params"),
				validationMiddleware(getQuizQueryValidationSchema, "query"),
			],
			this.quizController.getQuiz
		);

		// update quiz questions
		this.router.put(
			this.path + "/:quizId/update-question/:questionId",
			[authMiddleware, validationMiddleware(questionValidationSchema, "body")],
			this.quizController.updateQuizQuestion
		);

		// quiz's correct options only route
		this.router.get(
			this.path + "/correct-options/:quizId",
			[authMiddleware],
			this.quizController.getQuizCorrectOptions
		);

		// update a quiz route
		this.router.put(
			this.path + "/:quizId",
			[
				authMiddleware,
				validationMiddleware(updateQuizValidationSchema, "body"),
			],
			this.quizController.updateQuiz
		);

		// get all quizzes with or witout questions
		this.router.get(
			this.path,
			[validationMiddleware(getQuizzesQueryValidationSchema, "query")],
			this.quizController.getQuizzes
		);
	};
}

export default QuizRoute;
