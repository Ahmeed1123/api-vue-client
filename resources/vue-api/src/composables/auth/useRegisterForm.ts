import { useForm } from "vee-validate";
import { registerSchema } from "@/validation";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

export function useRegisterForm() {
    const auth = useAuthStore();
    const { loading } = storeToRefs(auth);

    const { register } = auth;

    const { handleSubmit, setFieldError } = useForm({
        validationSchema: registerSchema,
    });
    const onSubmit = handleSubmit((values) => register(values as any, setFieldError));

    return { onSubmit, loading };
}
