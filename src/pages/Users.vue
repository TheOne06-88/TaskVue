<template>
  <div class="p-6">
    <h2 class="text-3xl font-bold mb-6">👥 Kullanıcılar</h2>

    <div v-if="loading" class="text-blue-500">Yükleniyor...</div>
    <div v-else-if="error" class="text-red-500">Hata: {{ error.message }}</div>

    <div v-else class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div 
        v-for="user in users" 
        :key="user.id" 
        class="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
        @click="goToUser(user.id)"
      >
        <h3 class="font-semibold text-lg text-gray-800">{{ user.name }}</h3>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
        <p class="text-sm text-gray-500">{{ user.phone }}</p>
        <p class="text-sm text-gray-400 italic mt-2">@{{ user.username }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const users = ref([])
const loading = ref(false)
const error = ref(null)
const router = useRouter()

const goToUser = (id) => {
  router.push(`/users/${id}`)
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = res.data
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
})
</script>
