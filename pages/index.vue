<template>
  <div class="space-y-8">
    <header class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome to LAN Tournament System
      </h1>
      <p class="text-xl text-gray-600">
        Manage your gaming tournaments with ease
      </p>
    </header>

    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="tournament in activeTournaments"
        :key="tournament.id"
        class="bg-white rounded-lg shadow-md p-6"
      >
        <h3 class="text-xl font-semibold mb-2">{{ tournament.name }}</h3>
        <p class="text-gray-600 mb-4">{{ tournament.game }}</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">
            {{ tournament.players }} / {{ tournament.maxPlayers }} Players
          </span>
          <NuxtLink
            :to="`/tournaments/${tournament.id}`"
            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            View Details
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const activeTournaments = ref([
  {
    id: 1,
    name: 'CS:GO Championship',
    game: 'Counter-Strike: Global Offensive',
    players: 24,
    maxPlayers: 32,
  },
  {
    id: 2,
    name: 'Dota 2 Battle',
    game: 'Dota 2',
    players: 18,
    maxPlayers: 40,
  },
  {
    id: 3,
    name: 'Rocket League Cup',
    game: 'Rocket League',
    players: 12,
    maxPlayers: 24,
  },
]);
</script>
