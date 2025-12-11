<!-- resources/js/Components/PaymentMethodSelector.vue -->
<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {AnimatePresence, Motion, MotionConfig, motion} from "motion-v";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Spinner} from "@/components/ui/spinner";
import {useCreatePostForm} from "@/composables/post/useCreatePostForm.ts";
import { ref } from "vue";
const open = ref(false);
const { loading, onSubmit: submitForm } = useCreatePostForm();
const emit = defineEmits<{
    (e: "created", post: any): void;
}>();

const onSubmit = async () => {
    const newPost = await submitForm();
    if (newPost) {
        open.value = false;
        emit("created", newPost);
    }
};

</script>

<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <Button variant="outline">
                create post
            </Button>
        </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <form @submit.prevent="onSubmit" class="flex flex-col gap-6">

                <DialogHeader>
                    <DialogTitle>create post</DialogTitle>
                </DialogHeader>
                <FormField name="title" v-slot="{ componentField }">
                    <FormItem v-auto-animate>
                        <FormLabel for="title">title</FormLabel>
                        <FormControl>
                            <Input
                                v-bind="componentField"
                                placeholder="title"
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField name="body" v-slot="{ componentField }">
                    <FormItem v-auto-animate>
                        <FormLabel for="body">body</FormLabel>
                        <FormControl>
                            <Textarea
                                type="text"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <DialogFooter class="flex-wrap !flex-row">
                    <DialogClose as-child>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>

                    <MotionConfig :transition="{
                        duration:.2,
                        type: 'spring',
                        }">
                        <Button
                            @click="console.log('clicked')"
                            type="submit"
                            :disabled="loading"
                            class="flex justify-center items-center flex-1"
                        >
                            <Motion :layout="true" as="div" class="flex justify-center items-center">
                                <AnimatePresence
                                    mode="wait"
                                >
                                    <motion.span :initial="{ scale: 0,opacity: 0,}"
                                                 :animate="{ scale: 1, opacity: 1 }"
                                                 :exit="{scale: 0,opacity: 0,}" v-if="loading" class="me-2">
                                        <Spinner class="animate-spin" />
                                    </motion.span>
                                    <motion.span
                                        :initial="{ scale: 0,opacity: 0,}"
                                        :animate="{ scale: 1, opacity: 1 }"
                                        :exit="{scale: 0,opacity: 0,}"
                                        v-if="!loading">Create</motion.span>
                                </AnimatePresence>
                            </Motion>
                        </Button>
                    </MotionConfig>
                </DialogFooter>
                </form>
            </DialogContent>
    </Dialog>
</template>
