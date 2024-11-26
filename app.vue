<template>
  <div class="min-h-screen bg-gray-100">
    <NavBar />
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
</script>
