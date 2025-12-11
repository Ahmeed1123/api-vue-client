<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    ComputerIcon,
    Moon02Icon,
    Sun02Icon,
} from '@hugeicons/core-free-icons'
import {motion} from 'motion-v';
import { useAppearance } from '@/composables/useAppearance';
import { onMounted, ref } from 'vue';

const tabs = [
    { value: 'light', Icon: Sun02Icon, label: 'فاتح' },
    { value: 'dark', Icon: Moon02Icon, label: 'داكن' },
    { value: 'system', Icon: ComputerIcon, label: 'النظام' },
] as const
const { appearance, updateAppearance } = useAppearance()

const isReady = ref(false);

onMounted(() => {
    requestAnimationFrame(() => {
        isReady.value = true;
    });
});

</script>

<template>
    <div
        class="relative inline-flex w-auto gap-1 rounded-full bg-gray-400/20 p-1 dark:bg-gray-900/50"
    >
            <motion.button
                v-for="{ value, Icon } in tabs"
                :key="value"
                @click="updateAppearance(value)"
                class="relative z-10 flex items-center justify-center rounded-full px-3 py-1.5 transition-colors duration-200 cursor-pointer"
                :class="[
          isReady && appearance === value
            ? 'text-primary'
            : 'text-neutral-500 hover:text-primary dark:text-primary-400',
        ]"
            >
                <HugeiconsIcon :icon="Icon" class="h-4 w-4" />
                <motion.div
                    v-if="isReady && appearance === value"
                    layout-id="underline"
                    id="underline"
                    class="absolute w-full h-full rounded-full bg-primary/20 dark:bg-primary/15"
                />
            </motion.button>
    </div>
</template>
