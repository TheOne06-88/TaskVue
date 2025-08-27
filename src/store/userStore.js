import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.users = res.data
      } catch (err) {
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
})
