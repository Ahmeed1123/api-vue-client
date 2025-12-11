<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useAuthStore} from "@/store/auth.ts";
import {onMounted} from "vue";

const auth = useAuthStore()

onMounted(() => {
     auth.getUser() ;
})
</script>

<template>
<h1>dashboard</h1>
    <Button @click="auth.getUser" variant="ghost">
        Get User
    </Button>
    <div>
        <p class="text-lg">welecome back, {{auth.user?.name}}</p>
        <p class="text-lg">{{auth.user?.email}}</p>
    </div>
    <Button @click="auth.logout" variant="ghost">
        logout
    </Button>
</template>

<style scoped>

</style>
