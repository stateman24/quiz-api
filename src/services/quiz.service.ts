import { IQuiz, IQuizData } from "../interfaces/quiz.interface";
import { IUser } from "../interfaces/user.interface";
import { isEmpty } from "../utils/util";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import QuizModel from "../models/quiz.model";

class QuizService {
    private quizModel = QuizModel;

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
            console.log(error)
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Something Went wrong")
        }
    }
}

export default QuizService;