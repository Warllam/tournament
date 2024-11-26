<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-semibold mb-4">Tournament Bracket</h2>
    <div class="overflow-x-auto">
      <div class="min-w-[800px] flex justify-between space-x-8">
        <div v-for="(round, roundIndex) in bracketData" :key="roundIndex" class="flex-1">
          <h3 class="text-center mb-4 font-medium text-gray-700">
            Round {{ roundIndex + 1 }}
          </h3>
          <div class="space-y-8">
            <div v-for="match in round.matches" :key="match.id" 
                 class="border rounded-lg p-4 relative"
                 :class="{'bg-gray-50': match.winner !== null}">
              <div class="space-y-2">
                <div v-for="(team, index) in match.teams" :key="index"
                     class="p-2 rounded"
                     :class="{
                       'bg-green-100': match.winner === index,
                       'bg-gray-100': match.winner !== null && match.winner !== index
                     }">
                  <span>{{ team.name || 'TBD' }}</span>
                </div>
              </div>
              <div v-if="isAdmin && match.winner === null" 
                   class="mt-2 flex justify-end">
                <button @click="handleMatchClick(match)"
                        class="text-sm text-indigo-600 hover:text-indigo-800">
                  Update Result
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTournamentStore } from '~/stores/tournament'
import { useAuthStore } from '~/stores/auth'

const props = defineProps({
  tournamentId: {
    type: String,
    required: true
  }
})

const tournament = useTournamentStore()
const auth = useAuthStore()
const bracketData = ref([])

const isAdmin = computed(() => auth.isAdmin)

onMounted(async () => {
  bracketData.value = await tournament.getBracketData(props.tournamentId)
})

const handleMatchClick = (match) => {
  if (isAdmin.value && match.winner === null) {
    tournament.openMatchUpdateDialog(match)
  }
}
</script></template>