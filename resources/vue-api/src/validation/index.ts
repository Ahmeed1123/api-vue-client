import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";

export const registerSchema = toTypedSchema(z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
}));

export const loginSchema = toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string().min(8),
}));

export const createPostSchema = toTypedSchema(z.object({
    title: z.string().min(1).max(255),
    body: z.string().min(1).max(255),
}));
export const editPostSchema = toTypedSchema(z.object({
    title: z.string().min(1).max(255),
    body: z.string().min(1).max(255),
}));

export const handleValidationErrors = (errors: Record<string, any>, setFieldError: (field: string, msg?: string) => void) => {
    if (errors) {
        Object.keys(errors).forEach((key) => {
            const errorMessage = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
            setFieldError(key, errorMessage);
        });
        console.log("Validation Errors Processed:", errors);
    }
};
