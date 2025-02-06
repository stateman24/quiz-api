import { IQuestionData } from "../interfaces/question.interface";
import { isEmpty } from "../utils/util";
import HTTPException from "../exceptions/http.exception";
import { StatusCodes } from "http-status-codes";
import QuestionModel from "../models/question.model";


class QuestionService {
    private questionModel = QuestionModel;

    public createQuestion = async(questionData: IQuestionData) =>{
        try {
            if(isEmpty(questionData)){
                throw new HTTPException(StatusCodes.BAD_REQUEST, "Provide a question")
            }
            const question = new QuestionModel({
                question: questionData.question,
                options: questionData.options,
                correctOption: questionData.correctOption
            })
            question.save()
            return question
        } catch (error) {
            throw new HTTPException(StatusCodes.BAD_REQUEST, "Something Went wrong")
        }
    }
}

export default QuestionService;