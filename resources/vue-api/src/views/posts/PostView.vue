<script setup lang="ts">
import { useRouter } from 'vue-router';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TracingBeam} from "@/components/ui/tracing-beam";
import axiosInstance from "@/lib/axios.ts";
import {ref, watch} from "vue";
import type {Post} from "@/types";
import { useTimeAgo } from "@vueuse/core";
import {Calendar03Icon} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/vue";
import {usePostStore} from "@/store/post.ts";
import {storeToRefs} from "pinia";
const route = useRouter();
const currentSlug = route.currentRoute.value.params.slug;


const postStore = usePostStore();
const { post } = storeToRefs(postStore);
watch(
    () => currentSlug,
    (slug) => postStore.getPost(String(slug)), {immediate: true}
)
</script>

<template>
    <TracingBeam class="ps-8">
        <Card class="w-full mx-auto" v-if="post" >
            <CardHeader>
                <div class="flex gap-2 text-md">
                    <HugeiconsIcon :icon="Calendar03Icon" />
                    <span > {{ useTimeAgo(post.createdAt) }}</span>
                </div>
                <CardTitle>{{ post.title }}</CardTitle>
            </CardHeader>
            <CardContent class="flex gap-6 flex-col">
                <p>{{post.body}}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur dignissimos distinctio dolores ducimus error est et impedit iure molestiae neque nobis nulla odio odit optio, pariatur quod suscipit voluptatum. A aspernatur dicta ducimus exercitationem hic iusto labore magni maiores necessitatibus nesciunt nihil placeat porro quam quibusdam rem similique soluta, tempore totam voluptas voluptatem? Animi aspernatur culpa cum dolor eaque, error ex exercitationem expedita fuga hic minus molestias nam natus nostrum officiis praesentium ullam vitae voluptatum. Consequuntur dolore minus quidem repellat? Aperiam consequuntur distinctio dolorem excepturi facere laudantium minima officia sequi. Aliquam aut dolorem enim eum exercitationem incidunt provident quo.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur dignissimos distinctio dolores ducimus error est et impedit iure molestiae neque nobis nulla odio odit optio, pariatur quod suscipit voluptatum. A aspernatur dicta ducimus exercitationem hic iusto labore magni maiores necessitatibus nesciunt nihil placeat porro quam quibusdam rem similique soluta, tempore totam voluptas voluptatem? Animi aspernatur culpa cum dolor eaque, error ex exercitationem expedita fuga hic minus molestias nam natus nostrum officiis praesentium ullam vitae voluptatum. Consequuntur dolore minus quidem repellat? Aperiam consequuntur distinctio dolorem excepturi facere laudantium minima officia sequi. Aliquam aut dolorem enim eum exercitationem incidunt provident quo.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur dignissimos distinctio dolores ducimus error est et impedit iure molestiae neque nobis nulla odio odit optio, pariatur quod suscipit voluptatum. A aspernatur dicta ducimus exercitationem hic iusto labore magni maiores necessitatibus nesciunt nihil placeat porro quam quibusdam rem similique soluta, tempore totam voluptas voluptatem? Animi aspernatur culpa cum dolor eaque, error ex exercitationem expedita fuga hic minus molestias nam natus nostrum officiis praesentium ullam vitae voluptatum. Consequuntur dolore minus quidem repellat? Aperiam consequuntur distinctio dolorem excepturi facere laudantium minima officia sequi. Aliquam aut dolorem enim eum exercitationem incidunt provident quo.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur dignissimos distinctio dolores ducimus error est et impedit iure molestiae neque nobis nulla odio odit optio, pariatur quod suscipit voluptatum. A aspernatur dicta ducimus exercitationem hic iusto labore magni maiores necessitatibus nesciunt nihil placeat porro quam quibusdam rem similique soluta, tempore totam voluptas voluptatem? Animi aspernatur culpa cum dolor eaque, error ex exercitationem expedita fuga hic minus molestias nam natus nostrum officiis praesentium ullam vitae voluptatum. Consequuntur dolore minus quidem repellat? Aperiam consequuntur distinctio dolorem excepturi facere laudantium minima officia sequi. Aliquam aut dolorem enim eum exercitationem incidunt provident quo.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur dignissimos distinctio dolores ducimus error est et impedit iure molestiae neque nobis nulla odio odit optio, pariatur quod suscipit voluptatum. A aspernatur dicta ducimus exercitationem hic iusto labore magni maiores necessitatibus nesciunt nihil placeat porro quam quibusdam rem similique soluta, tempore totam voluptas voluptatem? Animi aspernatur culpa cum dolor eaque, error ex exercitationem expedita fuga hic minus molestias nam natus nostrum officiis praesentium ullam vitae voluptatum. Consequuntur dolore minus quidem repellat? Aperiam consequuntur distinctio dolorem excepturi facere laudantium minima officia sequi. Aliquam aut dolorem enim eum exercitationem incidunt provident quo.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur dignissimos distinctio dolores ducimus error est et impedit iure molestiae neque nobis nulla odio odit optio, pariatur quod suscipit voluptatum. A aspernatur dicta ducimus exercitationem hic iusto labore magni maiores necessitatibus nesciunt nihil placeat porro quam quibusdam rem similique soluta, tempore totam voluptas voluptatem? Animi aspernatur culpa cum dolor eaque, error ex exercitationem expedita fuga hic minus molestias nam natus nostrum officiis praesentium ullam vitae voluptatum. Consequuntur dolore minus quidem repellat? Aperiam consequuntur distinctio dolorem excepturi facere laudantium minima officia sequi. Aliquam aut dolorem enim eum exercitationem incidunt provident quo.</p>
            </CardContent>
        </Card>
    </TracingBeam>

</template>

<style scoped>

</style>
