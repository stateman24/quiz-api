import { string, z } from "zod"

export const questionValidationSchema = z.object({
    question: z.string().min(10, "Question must be at least 10 characters long"),
    options: z.array(string()).min(4, "At least 4 options are required"),
    correctOption: z.string(),
})

export type IQuestionData = z.infer<typeof questionValidationSchema>;