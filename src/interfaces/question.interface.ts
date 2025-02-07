import { Document  } from "mongoose";


export interface IQuestion extends Document{
    question: string;
    options: string[];
    correctOption: string;
    createdAt: Date;
}

