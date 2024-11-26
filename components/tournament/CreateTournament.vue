<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Create Tournament</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Tournament Name</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="game" class="block text-sm font-medium text-gray-700">Game</label>
          <select
            id="game"
            v-model="form.game"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select a game</option>
            <option v-for="game in games" :key="game.id" :value="game.id">
              {{ game.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="maxPlayers" class="block text-sm font-medium text-gray-700">
            Maximum Players/Teams
          </label>
          <input
            id="maxPlayers"
            v-model.number="form.maxPlayers"
            type="number"
            min="2"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            id="startDate"
            v-model="form.startDate"
            type="datetime-local"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div class="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Tournament' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close', 'created'])

const form = ref({
  name: '',
  game: '',
  maxPlayers: 8,
  startDate: ''
})

const isSubmitting = ref(false)

const games = ref([
  { id: 'csgo', name: 'Counter-Strike: Global Offensive' },
  { id: 'dota2', name: 'Dota 2' },
  { id: 'rocketleague', name: 'Rocket League' },
  { id: 'valorant', name: 'Valorant' }
])

async function handleSubmit() {
  try {
    isSubmitting.value = true
    const tournament = await useTournamentStore().createTournament(form.value)
    emit('created', tournament)
    emit('close')
  } catch (error) {
    console.error('Failed to create tournament:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script></template>