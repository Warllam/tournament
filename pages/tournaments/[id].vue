<template>
  <div v-if="tournament" class="space-y-6">
    <header class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-3xl font-bold text-gray-900">{{ tournament.name }}</h1>
      <div class="mt-4 flex items-center space-x-4">
        <span class="text-gray-600">{{ tournament.game }}</span>
        <span class="text-gray-600">|</span>
        <span class="text-gray-600">{{ tournament.status }}</span>
      </div>
    </header>

    <div class="grid md:grid-cols-2 gap-6">
      <BracketView :tournament-id="route.params.id" />

      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Live Matches</h2>
          <div class="space-y-4">
            <LiveScore
              v-for="match in liveMatches"
              :key="match.id"
              :match="match"
            />
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-semibold mb-4">Upcoming Matches</h2>
          <div class="space-y-4">
            <div v-for="match in upcomingMatches" :key="match.id" 
                class="border rounded p-4">
              <div class="flex justify-between items-center">
                <span>{{ match.team1 }}</span>
                <span class="text-gray-600">vs</span>
                <span>{{ match.team2 }}</span>
              </div>
              <div class="text-sm text-gray-500 mt-2">
                {{ match.scheduledTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useTournamentStore } from '~/stores/tournament'

const route = useRoute()
const tournamentStore = useTournamentStore()

onMounted(() => {
  tournamentStore.initializeSocket()
})

const tournament = computed(() => tournamentStore.currentTournament)
const liveMatches = computed(() => tournamentStore.liveMatches)
const upcomingMatches = computed(() => 
  tournament.value?.matches.filter(m => m.status === 'upcoming') || []
)
</script>