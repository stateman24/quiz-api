import { IQuizData } from "../schemas/quiz.validation.schema";
import { isEmpty } from "../utils/util";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import QuizModel from "../models/quiz.model";
import { IQuestionData } from "../schemas/question.validation.schema";
import QuestionService from "./question.service";
import { IQuiz } from "../interfaces/quiz.interface";

class QuizService {
	private quizModel = QuizModel;
	private questionService = new QuestionService();

	// create quiz by user
	public createQuiz = async (quizData: IQuizData, userId: String) => {
		try {
			if (isEmpty(quizData)) {
				throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Quiz Data");
			}
			const quiz = new QuizModel({
				title: quizData.title,
				description: quizData.description,
				questions: quizData.questions,
				categories: quizData.categories,
				difficulty: quizData.difficulty,
				createdBy: userId,
			});
			await quiz.save();
			return quiz;
		} catch (error) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Something Went wrong");
		}
	};
	// Add question to an existing quiz
	public addQuestionToQuiz = async (
		quizId: String,
		questionData: IQuestionData
	) => {
		if (isEmpty(questionData)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Quiz Data");
		}
		// save question to database
		const question = await this.questionService.createQuestion(questionData);
		// update Quiz question
		const quiz = await this.quizModel
			.findByIdAndUpdate(
				quizId,
				{ $push: { questions: question._id } },
				{ new: true }
			)
			.populate("questions");

		if (!quiz) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		return quiz;
	};

	// delete question from quiz
	public deleteQuizQuestion = async (quizId: String, questionId: String) => {
		// remove question from database
		await this.questionService.deleteQuestion(questionId);
		// find quiz by id and remove question from quiz
		const upadatedQuiz = await this.quizModel
			.findByIdAndUpdate(
				quizId,
				{ $pull: { questions: questionId } },
				{ new: true }
			)
			.populate("questions");

		if (!upadatedQuiz) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		return upadatedQuiz;
	};

	// get all Quizzes with or without questions
	public getQuizzes = async (withQuestions: string): Promise<IQuiz[]> => {
		const withoutQuestionsField = "-__v -createdAt -questions";
		const withQuestionsField = "-__v -createdAt";

		const quizzes = await this.quizModel
			.find()
			.select(
				withQuestions === "true" ? withQuestionsField : withoutQuestionsField
			)
			.populate(withQuestions === "true" ? "questions" : "");

		return quizzes;
	};

	// get Quiz by Id
	public getQuiz = async (quizId: String, withCorrectOption: string) => {
		const withoutCorrectOptionField = "-__v -createdAt -correctOption";

		const quiz = await this.quizModel
			.findById(quizId)
			.populate(
				"questions",
				withCorrectOption === "true"
					? "-__v -createdAt"
					: withoutCorrectOptionField
			);
		if (!quiz) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		return quiz;
	};

	// get Quiz Questions
	public getQuizQuestions = async (quizId: String) => {
		const quizQuestions = await this.quizModel
			.findById(quizId)
			.populate("questions", "-__v -createdAt");
		if (!quizQuestions) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		return quizQuestions.questions;
	};

	// delete Quiz
	public deleteQuiz = async (quizId: String) => {
		const quiz = await this.quizModel.findById(quizId);
		if (!quiz) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		await quiz.deleteOne();
		return quiz;
	};

	// updade question in the Quiz
	public updateQuizQuestion = async (
		questionData: IQuestionData,
		quizId: String,
		questionId: String
	) => {
		// update question in database
		await this.questionService.updateQuestion(questionId, questionData);

		const quiz = await this.quizModel.findById(quizId).populate("questions");

		if (!quiz) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		return quiz;
	};

	// get quiz's correct options only
	public getQuizCorrectOptions = async (quizId: String): Promise<IQuizData> => {
		const quiz = await this.quizModel
			.findById(quizId)
			.select("questions _id")
			.populate("questions", "correctOption _id ");
		if (!quiz) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		return quiz;
	};

	// update a quiz with new data
	public updateQuiz = async (
		quizId: String,
		quizData: IQuizData
	): Promise<IQuiz> => {
		if (isEmpty(quizData)) {
			throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Quiz Data");
		}
		const quiz = await this.quizModel.findByIdAndUpdate(quizId, quizData, {
			new: true,
		});

		if (!quiz) {
			throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
		}
		return quiz;
	};
}

export default QuizService;
