<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div class="flex items-center space-x-4 mb-6">
      <div class="flex-shrink-0">
        <img
          :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&size=48`"
          :alt="player.name"
          class="h-12 w-12 rounded-full"
        />
      </div>
      <div>
        <h2 class="text-xl font-semibold">{{ player.name }}</h2>
        <p class="text-gray-600">{{ player.email }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div>
        <h3 class="font-medium text-gray-700">Preferred Games</h3>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="game in player.games"
            :key="game"
            class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
          >
            {{ game }}
          </span>
        </div>
      </div>

      <div>
        <h3 class="font-medium text-gray-700">Tournament History</h3>
        <ul class="mt-2 space-y-2">
          <li v-for="tournament in tournamentHistory" :key="tournament.id"
              class="flex justify-between items-center">
            <span>{{ tournament.name }}</span>
            <span :class="tournament.placement <= 3 ? 'text-yellow-600' : 'text-gray-600'">
              {{ formatPlacement(tournament.placement) }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const props = defineProps({
  player: {
    type: Object,
    required: true
  }
})

const tournamentHistory = ref([
  { id: 1, name: 'CS:GO Summer Cup 2024', placement: 1 },
  { id: 2, name: 'Dota 2 Spring League', placement: 3 },
  { id: 3, name: 'Rocket League Challenge', placement: 5 }
])

function formatPlacement(place: number): string {
  const suffixes = ['st', 'nd', 'rd']
  const suffix = place <= 3 ? suffixes[place - 1] : 'th'
  return `${place}${suffix} place`
}
</script></template>