<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {AnimatePresence, Motion, motion, MotionConfig} from 'motion-v'
import { useLoginForm } from "@/composables/auth/useLoginForm.ts";

const {loading, onSubmit} = useLoginForm();
</script>

<template>
    <Card class="max-w-130 mx-auto">
        <CardHeader>
            <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
            <form @submit.prevent="onSubmit" class="space-y-6">
                <FormField name="email" v-slot="{ componentField }">
                    <FormItem v-auto-animate>
                        <FormLabel for="email">Email</FormLabel>
                        <FormControl>
                            <Input
                                v-bind="componentField"
                                placeholder="m@example.com"
                            />
                        </FormControl>

                        <FormMessage />
                    </FormItem>
                </FormField>

                <FormField name="password" v-slot="{ componentField }">
                    <FormItem v-auto-animate>
                        <FormLabel for="password">Password</FormLabel>
                        <FormControl>
                            <Input
                                type="password"
                                v-bind="componentField"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <div class="mt-6">
                    <MotionConfig :transition="{
                        duration:.2,
                        type: 'spring',
                    }">
                        <Button
                            type="submit"
                            :disabled="loading"
                            class="w-full flex justify-center items-center"
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
                                        v-if="!loading">Login</motion.span>
                                </AnimatePresence>
                            </Motion>
                        </Button>
                    </MotionConfig>
                </div>
            </form>
        </CardContent>
    </Card>
</template>
