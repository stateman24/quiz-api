import { z } from "zod"
import { questionValidationSchema } from "./question.validation.schema"

export const createQuizValidationSchema = z.object({
    title: z.string().min(20, "Title must be at least 20 charcters long"),
    description: z.string().min(10, "Description must be at least 10 charcters long"),
    questions: z.array(questionValidationSchema),
    difficulty: z.string(),
    categories: z.string()
})

export const deleteValidationSchema = z.object({
    quizId: z.string(),
    questionId: z.string()
})

export const getQuizIdValidationSchema = z.object({
    quizId: z.string()
})



export type IQuizData = z.infer<typeof createQuizValidationSchema>;

