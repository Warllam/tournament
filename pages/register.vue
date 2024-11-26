<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6">Player Registration</h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="games" class="block text-sm font-medium text-gray-700">Preferred Games</label>
          <select
            id="games"
            v-model="form.games"
            multiple
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option v-for="game in availableGames" :key="game.id" :value="game.id">
              {{ game.name }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Registering...' : 'Register' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: '',
  games: []
})

const isSubmitting = ref(false)

const availableGames = ref([
  { id: 'csgo', name: 'Counter-Strike: Global Offensive' },
  { id: 'dota2', name: 'Dota 2' },
  { id: 'rocketleague', name: 'Rocket League' },
  { id: 'valorant', name: 'Valorant' }
])

async function handleSubmit() {
  try {
    isSubmitting.value = true
    await auth.register(form.value)
    router.push('/dashboard')
  } catch (error) {
    console.error('Registration failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script></template>