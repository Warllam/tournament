<template>
  <div class="space-y-6">
    <header class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
    </header>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Tournament Management -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Tournament Management</h2>
        <button @click="showCreateTournament = true"
                class="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Create Tournament
        </button>
      </div>

      <!-- Active Tournaments -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Active Tournaments</h2>
        <ul class="space-y-2">
          <li v-for="tournament in activeTournaments" :key="tournament.id"
              class="flex justify-between items-center">
            <span>{{ tournament.name }}</span>
            <NuxtLink :to="`/tournaments/${tournament.id}`"
                     class="text-indigo-600 hover:text-indigo-800">
              Manage
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul class="space-y-2">
          <li v-for="activity in recentActivity" :key="activity.id"
              class="text-sm text-gray-600">
            {{ activity.message }}
            <span class="text-gray-400">{{ activity.time }}</span>
          </li>
        </ul>
      </div>
    </div>

    <CreateTournament
      v-if="showCreateTournament"
      @close="showCreateTournament = false"
      @created="handleTournamentCreated"
    />
  </div>
</template>

<script lang="ts" setup>

const showCreateTournament = ref(false)
const tournamentStore = useTournamentStore()

const activeTournaments = computed(() => tournamentStore.tournaments)

const recentActivity = ref([
  { id: 1, message: 'New tournament created', time: '5m ago' },
  { id: 2, message: 'Match results updated', time: '15m ago' },
  { id: 3, message: 'Player registration approved', time: '1h ago' }
])

function handleTournamentCreated(tournament) {
  recentActivity.value.unshift({
    id: Date.now(),
    message: `Tournament "${tournament.name}" created`,
    time: 'just now'
  })
}
</script></template>