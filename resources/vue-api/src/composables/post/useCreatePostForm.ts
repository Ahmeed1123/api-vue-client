import {useForm} from "vee-validate";
import {createPostSchema} from "@/validation";
import {storeToRefs} from "pinia";
import {usePostStore} from "@/store/post.ts";

export function useCreatePostForm() {
    const post = usePostStore();
    const { loading } = storeToRefs(post);
    const { createPost } = post;

    const { handleSubmit, setFieldError } = useForm({
        validationSchema: createPostSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            return await createPost(values as any, setFieldError); // SUCCESS
        } catch (err) {
            return false; // FAIL
        }
    });

    return { onSubmit, loading };
}
