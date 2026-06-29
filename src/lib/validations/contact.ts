import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Please enter your name."),
    email: z.string().email("Please enter a valid email address."),
    company: z.string().optional(),
    message: z.string().min(10, "Please add a few details (at least 10 characters)."),
});

export type ContactInput = z.infer<typeof contactSchema>;
