import { Document  } from "mongoose";
import { IUser } from "./user.interface";

export interface IQuestion extends Document{
    question: string;
    options: string[];
    correctOption: string;
    createdAt: Date;
}

export interface IQuestionData extends Document {
    question: string;
    options: string[];
    correctOption: string;
}

export type IQuestionDataList = IQuestion[]
