import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import QuizService from "../services/quiz.service"; 
import { RequestWithUser } from "../interfaces/auth.interface";


class QuizController{
    private quizService = new QuizService()

    public createQuiz = async(
        req: RequestWithUser,
        res: Response, 
        next: NextFunction
    )=>{
        try {
            const userId: string = req.user?._id
            const quiz = await this.quizService.createQuiz(req.body, userId);
            res.status(StatusCodes.CREATED).json({"data": quiz})
        } catch (error) {
            next(error)
        }
    }

    public addQuestionToQuiz = async(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const quizId = req.params.id;
            const quiz = await this.quizService.addQuestionToQuiz(quizId, req.body);
            res.status(StatusCodes.CREATED).json({"data": quiz})
        } catch (error) {
            next(error)
        }
    }

    public deleteQuizQuestion = async(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    )=>{
        try {
            const { quizId, questionId } = req.params;
            const quiz = await this.quizService.deleteQuizQuestion(quizId, questionId);
            res.status(StatusCodes.CREATED).json({"data": quiz})
        } catch (error) {
            next(error)
        }
    }

    // get all the questions in the quiz
    public getQuizQuestions = async(
        req: RequestWithUser,
        res: Response,
        next: NextFunction
    ) =>{
        try {
            const quizId = req.params.id;
            const quizQuestions = await this.quizService.getQuizQuestions(quizId);
            res.status(StatusCodes.OK).json({"questions": quizQuestions});
        } catch (error) {
            next(error);
        }
    }

}

export default QuizController