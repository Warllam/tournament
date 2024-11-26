<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-semibold">
        {{ match.team1 }} vs {{ match.team2 }}
      </h3>
      <span :class="statusClass">{{ match.status }}</span>
    </div>

    <div class="flex justify-between items-center text-2xl font-bold">
      <div class="text-center">
        <p>{{ match.team1 }}</p>
        <p class="text-3xl">{{ match.score1 }}</p>
      </div>
      <div class="text-gray-500">vs</div>
      <div class="text-center">
        <p>{{ match.team2 }}</p>
        <p class="text-3xl">{{ match.score2 }}</p>
      </div>
    </div>

    <div v-if="match.status === 'live'" class="mt-4 text-sm text-gray-600">
      <p>Time: {{ match.currentTime }}</p>
      <p>Round: {{ match.currentRound }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  match: {
    type: Object,
    required: true,
  },
});

const statusClass = computed(() => ({
  'text-green-600': props.match.status === 'live',
  'text-gray-600': props.match.status === 'upcoming',
  'text-blue-600': props.match.status === 'completed',
}));
</script>
