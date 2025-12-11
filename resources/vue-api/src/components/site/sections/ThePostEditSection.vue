<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { AnimatePresence, Motion, MotionConfig, motion } from "motion-v";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ref, watch } from "vue";
import { Edit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from '@hugeicons/vue';
import { storeToRefs } from "pinia";
import { useForm } from "vee-validate";
import {editPostSchema} from "@/validation";
import {usePostStore} from "@/store/post.ts";
import type {PostForm} from "@/types";

const emit = defineEmits(["update"]);

const props = defineProps({
    slug: String,
});
const postStore = usePostStore();
const open = ref(false);
const { loading } = storeToRefs(postStore);



const {handleSubmit, setValues,setFieldError} = useForm({
    validationSchema: editPostSchema,
});


watch(open, async (value) => {
    if (value) {
        await postStore.getPost(props.slug);
        const postData = postStore.post;
        // console.log(` Editing post: ${postData.title} --- ${postData.body} =---- ${props.slug}`);
        if (postData) {
             setValues({
                title: postData.title,
                body: postData.body,
            });

        }
    }
});

// submit update
const onSubmit = handleSubmit(async (payload: PostForm) => {
    const data = await postStore.updatePost(String(props.slug), payload, setFieldError)
    emit("update", data);
        open.value = false;

    // try {
    //     const {data} = await axiosInstance.put(`dashboard/posts/${props.slug}`, values);
    //     emit("edit", data);
    //     open.value = false;
    // } catch (err) {
    //     console.error(err);
    // }
});
</script>


<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <Button variant="link">
                <HugeiconsIcon class="text-green-500" :icon="Edit01Icon" />
            </Button>
        </DialogTrigger>

        <DialogContent v-if="postStore.post" class="sm:max-w-[425px]">
            <form @submit.prevent="onSubmit" class="flex flex-col gap-6">
                <DialogHeader>
                    <DialogTitle>Update {{ postStore.post.title }}</DialogTitle>
                </DialogHeader>

                <FormField name="title" v-slot="{ componentField }">
                    <FormItem v-auto-animate>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input v-bind="componentField" placeholder="title" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField name="body" v-slot="{ componentField }">
                    <FormItem v-auto-animate>
                        <FormLabel>Body</FormLabel>
                        <FormControl>
                            <Textarea  v-bind="componentField" placeholder="body" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <DialogFooter class="flex-wrap !flex-row">
                    <DialogClose as-child>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <MotionConfig :transition="{ duration: .2, type: 'spring' }">
                        <Button
                            type="submit"
                            :disabled="loading"
                            class="flex justify-center items-center flex-1"
                        >
                            <Motion :layout="true" as="div" class="flex justify-center items-center">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        :initial="{ scale: 0, opacity: 0 }"
                                        :animate="{ scale: 1, opacity: 1 }"
                                        :exit="{ scale: 0, opacity: 0 }"
                                        v-if="loading"
                                        class="me-2"
                                    >
                                        <Spinner class="animate-spin" />
                                    </motion.span>

                                    <motion.span
                                        :initial="{ scale: 0, opacity: 0 }"
                                        :animate="{ scale: 1, opacity: 1 }"
                                        :exit="{ scale: 0, opacity: 0 }"
                                        v-if="!loading"
                                    >
                                        Update
                                    </motion.span>
                                </AnimatePresence>
                            </Motion>
                        </Button>
                    </MotionConfig>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
</template>
