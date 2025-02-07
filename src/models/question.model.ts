import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../interfaces/question.interface";

const questionSchema: Schema<IQuestion> = new Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String], 
        requried: true
    },
    correctOption: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
})


const QuestionModel = mongoose.model<IQuestion>("Question", questionSchema);

export default QuestionModel