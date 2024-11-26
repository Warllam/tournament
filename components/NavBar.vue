<template>
  <nav class="bg-indigo-600 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="font-bold text-xl">LAN Tournament</NuxtLink>
        
        <div class="flex space-x-4">
          <NuxtLink to="/tournaments" class="hover:text-indigo-200">Tournaments</NuxtLink>
          <NuxtLink to="/matches" class="hover:text-indigo-200">Matches</NuxtLink>
          <template v-if="auth.isAuthenticated">
            <NuxtLink to="/dashboard" class="hover:text-indigo-200">Dashboard</NuxtLink>
            <button @click="auth.logout" class="hover:text-indigo-200">Logout</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="hover:text-indigo-200">Login</NuxtLink>
            <NuxtLink to="/register" class="hover:text-indigo-200">Register</NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>


<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
</script>