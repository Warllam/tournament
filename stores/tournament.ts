import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

interface Match {
  id: string
  team1: string
  team2: string
  score1: number
  score2: number
  status: 'upcoming' | 'live' | 'completed'
  currentTime?: string
  currentRound?: number
  scheduledTime: string
}

interface Tournament {
  id: string
  name: string
  game: string
  status: string
  maxPlayers: number
  startDate: string
  matches: Match[]
}

interface CreateTournamentData {
  name: string
  game: string
  maxPlayers: number
  startDate: string
}

export const useTournamentStore = defineStore('tournament', {
  state: () => ({
    tournaments: [] as Tournament[],
    currentTournament: null as Tournament | null,
    socket: null as any,
    liveMatches: [] as Match[]
  }),

  actions: {
    async createTournament(data: CreateTournamentData): Promise<Tournament> {
      // Simulate API call
      const tournament: Tournament = {
        id: Date.now().toString(),
        name: data.name,
        game: data.game,
        status: 'upcoming',
        maxPlayers: data.maxPlayers,
        startDate: data.startDate,
        matches: []
      }

      this.tournaments.push(tournament)
      return tournament
    },

    initializeSocket() {
      this.socket = io(process.env.NUXT_PUBLIC_WS_URL || 'ws://localhost:3001')
      
      this.socket.on('matchUpdate', (match: Match) => {
        this.updateMatch(match)
      })

      this.socket.on('tournamentUpdate', (tournament: Tournament) => {
        this.updateTournament(tournament)
      })
    },

    updateMatch(match: Match) {
      const tournamentIndex = this.tournaments.findIndex(t => 
        t.matches.some(m => m.id === match.id)
      )

      if (tournamentIndex !== -1) {
        const matchIndex = this.tournaments[tournamentIndex].matches.findIndex(
          m => m.id === match.id
        )
        if (matchIndex !== -1) {
          this.tournaments[tournamentIndex].matches[matchIndex] = match
        }
      }

      if (match.status === 'live') {
        const liveIndex = this.liveMatches.findIndex(m => m.id === match.id)
        if (liveIndex === -1) {
          this.liveMatches.push(match)
        } else {
          this.liveMatches[liveIndex] = match
        }
      } else {
        this.liveMatches = this.liveMatches.filter(m => m.id !== match.id)
      }
    },

    updateTournament(tournament: Tournament) {
      const index = this.tournaments.findIndex(t => t.id === tournament.id)
      if (index !== -1) {
        this.tournaments[index] = tournament
      } else {
        this.tournaments.push(tournament)
      }

      if (this.currentTournament?.id === tournament.id) {
        this.currentTournament = tournament
      }
    },

    async getBracketData(tournamentId: string) {
      // Simulated bracket data structure
      return [
        {
          matches: [
            {
              id: 1,
              teams: [{ name: 'Team A' }, { name: 'Team B' }],
              winner: 0
            },
            {
              id: 2,
              teams: [{ name: 'Team C' }, { name: 'Team D' }],
              winner: null
            }
          ]
        },
        {
          matches: [
            {
              id: 3,
              teams: [{ name: 'Team A' }, { name: 'TBD' }],
              winner: null
            }
          ]
        }
      ]
    }
  }
})