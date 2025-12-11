import { useForm } from "vee-validate";
import { loginSchema } from "@/validation";
import { useAuthStore } from "@/store/auth";
import {storeToRefs} from "pinia";

export function useLoginForm() {
    const auth = useAuthStore();
    const { loading } = storeToRefs(auth);
    const { login } = auth;

    const { handleSubmit, setFieldError } = useForm({
        validationSchema: loginSchema,
    });
    const onSubmit = handleSubmit((values) =>  login(values as any, setFieldError));


    return { onSubmit, loading };
}
