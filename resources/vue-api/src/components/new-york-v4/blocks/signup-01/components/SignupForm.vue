<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    Card, CardContent,
    CardDescription, CardHeader,
    CardTitle} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { AnimatePresence, LayoutGroup, Motion, MotionConfig, motion } from "motion-v";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Spinner } from '@/components/ui/spinner';
import { useAuthStore } from '@/store/auth.ts';
import { storeToRefs } from 'pinia';
import { registerSchema } from '@/validation';
import { useForm } from 'vee-validate';
import {useRegisterForm} from "@/composables/auth/useRegisterForm.ts";

const {onSubmit, loading } = useRegisterForm();
</script>
<template>
  <Card class="max-w-130 mx-auto">
      <CardHeader>
      <CardTitle>Create an account</CardTitle>
      <CardDescription>
        Enter your information below to create your account
      </CardDescription>
    </CardHeader>
    <CardContent>
        <form @submit.prevent="onSubmit" class="space-y-6 v-auto-animate">
            <FormField name="name" v-slot="{ componentField }">
                <FormItem v-auto-animate>
                    <FormLabel for="name">name</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
                            v-bind="componentField"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <FormField name="email" v-slot="{ componentField }">
                <FormItem v-auto-animate>
                    <FormLabel for="email">Email</FormLabel>
                    <FormControl>
                        <Input
                            type="text"
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
            <FormField name="password_confirmation" v-slot="{ componentField }">
                <FormItem v-auto-animate>
                    <FormLabel for="password_confirmation">password confirm</FormLabel>
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
                                    v-if="!loading">register</motion.span>
                            </AnimatePresence>
                        </Motion>

                    </Button>
                </MotionConfig>
            </div>
        </form>
    </CardContent>
  </Card>
</template>
