import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import QuizService from "../services/quiz.service";
import { RequestWithUser } from "../interfaces/auth.interface";

class QuizController {
	private quizService = new QuizService();

	public createQuiz = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const userId: string = req.user?._id;
			const quiz = await this.quizService.createQuiz(req.body, userId);
			res.status(StatusCodes.CREATED).json({ data: quiz });
		} catch (error) {
			next(error);
		}
	};

	public addQuestionToQuiz = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const quizId = req.params.id;
			const quiz = await this.quizService.addQuestionToQuiz(quizId, req.body);
			res.status(StatusCodes.CREATED).json({ data: quiz });
		} catch (error) {
			next(error);
		}
	};

	public deleteQuizQuestion = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { quizId, questionId } = req.params;
			const quiz = await this.quizService.deleteQuizQuestion(
				quizId,
				questionId
			);
			res.status(StatusCodes.CREATED).json({ data: quiz });
		} catch (error) {
			next(error);
		}
	};

	public updateQuizQuestion = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { quizId, questionId } = req.params;
			const quiz = await this.quizService.updateQuizQuestion(
				req.body,
				quizId,
				questionId
			);
			res.status(StatusCodes.CREATED).json({ data: quiz });
		} catch (error) {
			next(error);
		}
	};

	// get all the questions in the quiz
	public getQuizQuestions = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const quizId = req.params.quizId;
			const quizQuestions = await this.quizService.getQuizQuestions(quizId);
			res.status(StatusCodes.OK).json({ questions: quizQuestions });
		} catch (error) {
			next(error);
		}
	};

	// get all quizzes with or without questions
	public getQuizzes = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		console.log(req.query.withQuestions);
		try {
			const withQuestions = req.query.withQuestions as string;
			const quizzes = await this.quizService.getQuizzes(withQuestions);
			res.status(StatusCodes.OK).json({
				quizzes,
				message: `All Quizzes ${
					withQuestions === "true" ? "with questions" : "without questions"
				}`,
			});
		} catch (error) {
			next(error);
		}
	};

	// get Quiz
	public getQuiz = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const quizId = req.params.quizId;
			const withCorrectOption = req.query.withCorrectOption;
			const quiz = await this.quizService.getQuiz(
				quizId,
				withCorrectOption as string
			);
			res.status(StatusCodes.OK).json({ Quiz: quiz });
		} catch (error) {
			next(error);
		}
	};

	// delele quiz
	public deleteQuiz = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const quizId = req.params.quizId;
			const quiz = await this.quizService.deleteQuiz(quizId);
			res
				.status(StatusCodes.CREATED)
				.json({ message: "Quiz Deleted Succefully" });
		} catch (error) {
			next(error);
		}
	};

	// fetch quiz's correction options only
	public getQuizCorrectOptions = async (
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) => {
		try {
			const quizId = req.params.quizId;
			const quiz = await this.quizService.getQuizCorrectOptions(quizId);
			res.status(StatusCodes.OK).json({ quiz });
		} catch (error) {
			next(error);
		}
	};

	// update a quiz with new data
	public updateQuiz = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const quizId = req.params.quizId;
			const quiz = await this.quizService.updateQuiz(quizId, req.body);
			res
				.status(StatusCodes.CREATED)
				.json({ data: quiz, message: "Updated quiz" });
		} catch (error) {
			next(error);
		}
	};
}

export default QuizController;
