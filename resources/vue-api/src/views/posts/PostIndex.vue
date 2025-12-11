<script setup lang="ts">
import ThePostCreateSection from "@/components/site/sections/ThePostCreateSection.vue";
import {onMounted, ref, watch} from "vue";
import {AnimatePresence, motion , Motion} from "motion-v";
import { TailwindPagination } from 'laravel-vue-pagination';
import {useTimeAgo} from "@vueuse/core";
import ThePostEditSection from "@/components/site/sections/ThePostEditSection.vue";
import {ViewIcon} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import {Button} from "@/components/ui/button";
import type {Post} from "@/types";
import {usePostStore} from "@/store/post.ts";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import ThePostDeleteSection from "@/components/site/sections/ThePostDeleteSection.vue";

const route = useRoute();
const router = useRouter();
const page = ref<number>(Number(route.query.page) || 1);
const postStore = usePostStore()
const { postsCollection } = storeToRefs(postStore);


const refreshPosts = async () => {
    await postStore.getPosts(page.value);
    console.log("Posts updated!");
};
onMounted(() => postStore.getPosts(page.value));
const addPost = (post: Post) => {
    // if (!postsCollection.value) .value = [];
    console.log("New post added:", post);
    postsCollection.value.unshift(post);
};

const updatePost = async (updatedPost: Post) => {
    const index = postsCollection.value.data.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
        postsCollection.value.data[index] = updatedPost;
    }
};

watch(page, async () => {
    await postStore.getPosts(page.value);
    await router.push({query: { page: page.value}});
})

</script>

<template>
    <div class="flex p-4 flex-col gap-3 justify-end">
        <ThePostCreateSection @created="addPost" />
        <section>


            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table class="w-full text-sm text-left rtl:text-right text-body">
                    <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">
                                ID
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                title
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                slug
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Published
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Created
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
<!--                    <AnimatePresence >-->

                    <Motion v-if="postsCollection" as="tbody"
                                :transition="{
                                  type: 'spring',
                                  delayChildren: 10,
                                  staggerChildren: 100,
                                }">
                            <motion.tr
                                v-for="{id,title,published,slug,createdAt} in postsCollection.data"
                                :key="id"
                                class="bg-neutral-primary border-b border-default"
                                :initial="{ opacity: 0,  }"
                                :animate="{ opacity: 1,  }"
                                :exit="{ opacity: 0,  }"

                            >
                                <th class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                                    {{ id }}
                                </th>
                                <td class="px-6 py-4">{{ title }}</td>
                                <td class="px-6 py-4">{{ slug }}</td>
                                <td class="px-6 py-4">{{ published }}</td>
                                <td class="px-6 py-4">{{ useTimeAgo(createdAt) }}</td>
                                <td class="px-6 py-4">
                                    <div class="flex space-x-1">
                                        <ThePostEditSection :slug="slug" @update="updatePost"/>
                                            <RouterLink :to="{ name: 'PostView', params: { slug: slug } }">
                                                <Button class="!p-1 " variant="link">
                                                    <HugeiconsIcon :icon="ViewIcon" />
                                                </Button>
                                            </RouterLink>
                                        <ThePostDeleteSection :slug="slug" :page="page" />
                                    </div>
                                </td>
                            </motion.tr>
                        </Motion>
<!--                    </AnimatePresence>-->
                </table>
                <template v-if="postsCollection && postsCollection.meta.total != 0">
                    <TailwindPagination
                     :data="postsCollection"
                     @pagination-change-page="page = $event"
                    />
                </template>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>
