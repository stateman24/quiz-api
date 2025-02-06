import Document from "mongoose";
import { IUser } from "./user.interface";
import { IQuestion } from "./question.interface";

export interface IQuiz extends Document {
    title: string;
    description: string;
    questions: IQuestion[];
    categories : string;
    difficulty: string
    createdBy: IUser
    createdAt: Date
}

export interface IQuizData {
    title: string;
    description: string;
    questions: IQuestion[];
    difficulty: string,
    categories: string
}