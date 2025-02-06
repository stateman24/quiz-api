import { IQuizData } from "../interfaces/quiz.interface";
import { isEmpty } from "../utils/util";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import QuizModel from "../models/quiz.model";
import { IQuestionData } from "../interfaces/question.interface";
import QuestionService from "./question.service";


class QuizService {
    private quizModel = QuizModel;
    private questionService = new QuestionService();

    // create quiz by user
    public createQuiz = async(quizData: IQuizData, userId: String) =>{
        try {
            if (isEmpty(quizData)) {
                throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Quiz Data");
            }
            const quiz = new QuizModel({
                title : quizData.title,
                description: quizData.description,
                questions: quizData.questions,
                categories: quizData.categories,
                difficulty: quizData.difficulty,
                createdBy: userId,
            });
            await quiz.save();
            return quiz;
        } catch (error) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Something Went wrong")
        }
    }
    // add question to an existing quiz
    public addQuestionToQuiz = async(quizId: String, questionData: IQuestionData) => {
        if (isEmpty(questionData)) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide Quiz Data");
        }
        // save question to database 
        const question  = await this.questionService.createQuestion(questionData)
        // update Quiz question
        const quiz = await QuizModel.findByIdAndUpdate(
            quizId, 
            { $push: { questions: question._id } }, 
            { new: true }
        ).populate("questions");
        
        if (!quiz) {
            throw new HTTPException(StatusCodes.NOT_FOUND, "Quiz Not Found");
        }
        return quiz
    }
}

export default QuizService;