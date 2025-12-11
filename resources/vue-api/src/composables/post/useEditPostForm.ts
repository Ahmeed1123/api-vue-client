import { useForm } from "vee-validate";
import { editPostSchema } from "@/validation";
import { useAuthStore } from "@/store/auth";
import { storeToRefs } from "pinia";

export function useEditPostForm() {
    const auth = useAuthStore();
    const { loading } = storeToRefs(auth);
    const { EditPost } = auth;

    const { handleSubmit, setFieldError } = useForm({
        validationSchema: editPostSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            await EditPost(values as any, setFieldError);
            return true; // SUCCESS
        } catch (err) {
            return false; // FAIL
        }
    });

    return { onSubmit, loading };
}
