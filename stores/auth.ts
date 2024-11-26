import { defineStore } from 'pinia'
import { z } from 'zod'

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'player']),
  games: z.array(z.string()).optional()
})

type User = z.infer<typeof userSchema>

interface AuthState {
  user: User | null
  token: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin'
  },

  actions: {
    async login(email: string, password: string) {
      try {
        // TODO: Implement actual API call
        this.user = {
          id: '1',
          email,
          name: 'Test User',
          role: 'player',
          games: []
        }
        this.token = 'dummy-token'
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async register(userData: { 
      email: string
      password: string
      name: string
      games: string[]
    }) {
      try {
        // TODO: Implement actual API call
        this.user = {
          id: Date.now().toString(),
          email: userData.email,
          name: userData.name,
          role: 'player',
          games: userData.games
        }
        this.token = 'dummy-token'
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
    }
  }
})