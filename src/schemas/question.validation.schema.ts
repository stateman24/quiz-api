import { string, z } from "zod"

export const questionValidationSchema = z.object({
    question: z.string().min(10, "Question must be more than 10 characters"),
    options: z.array(string()).min(3, "At least 3 options are required"),
    correctOption: z.string().min(1, "Correct option is required"),
})

export type IQuestionData = z.infer<typeof questionValidationSchema>;