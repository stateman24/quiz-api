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
}

export default QuizController