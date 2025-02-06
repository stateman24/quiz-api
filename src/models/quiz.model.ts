import mongoose, { Schema} from "mongoose";
import { IQuiz } from "../interfaces/quiz.interface";


const quizSchema : Schema<IQuiz> = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: {
        type: [{type: Schema.Types.ObjectId, ref: "Question"}],
    },
    categories: {
        type: String,
        requried: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true        
    },
    difficulty:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const QuizModel = mongoose.model<IQuiz>("Quiz", quizSchema);

export default QuizModel;