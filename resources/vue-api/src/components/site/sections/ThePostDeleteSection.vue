<script setup lang="ts">
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input';
import {AnimatePresence, Motion, MotionConfig, motion} from "motion-v";
import {Spinner} from "@/components/ui/spinner";
import {useCreatePostForm} from "@/composables/post/useCreatePostForm.ts";
import { ref } from "vue";
import {Delete02Icon} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle} from "@/components/ui/empty";
import {usePostStore} from "@/store/post.ts";
const props = defineProps({
    slug: String,
    page: Number,
});
const postStore = usePostStore();

const open = ref(false);

const onSubmit = async () => {
    open.value = true;
    await postStore.deletePost(props.page,props.slug);
    open.value = false;

};

</script>

<template>
    <AlertDialog v-model:open="open">
        <AlertDialogTrigger as-child>
            <Button variant="link" class="p-0 text-red-700 ">
                <HugeiconsIcon :icon="Delete02Icon" />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <Empty class="gap-0.5">
                    <EmptyHeader>
                        <EmptyMedia variant="icon" class="text-red-700">
                            <HugeiconsIcon :icon="Delete02Icon" />
                        </EmptyMedia>
                    </EmptyHeader>
                    <EmptyTitle>No data</EmptyTitle>
                    <EmptyDescription>No data found</EmptyDescription>
                </Empty>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <MotionConfig :transition="{
                        duration:.2,
                        type: 'spring',
                        }">
                    <Button
                        @click="onSubmit"
                        type="submit"
                        :disabled="postStore.loading"
                        class="flex justify-center items-center flex-1"
                    >
                        <Motion :layout="true" as="div" class="flex justify-center items-center">
                            <AnimatePresence
                                mode="wait"
                            >
                                <motion.span :initial="{ scale: 0,opacity: 0,}"
                                             :animate="{ scale: 1, opacity: 1 }"
                                             :exit="{scale: 0,opacity: 0,}" v-if="postStore.loading" class="me-2">
                                    <Spinner class="animate-spin" />
                                </motion.span>
                                <motion.span
                                    :initial="{ scale: 0,opacity: 0,}"
                                    :animate="{ scale: 1, opacity: 1 }"
                                    :exit="{scale: 0,opacity: 0,}"
                                    v-if="!postStore.loading">Delete</motion.span>
                            </AnimatePresence>
                        </Motion>
                    </Button>
                </MotionConfig>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
