<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Kullanıcılar</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition cursor-pointer"
        @click="goToDetail(user.id)"
      >
        <h2 class="text-xl font-bold text-gray-800">{{ user.name }}</h2>
        <p class="text-gray-600">{{ user.email }}</p>
        <p class="text-gray-500 text-sm">{{ user.company.name }}</p>
      </div>
    </div>

    <div v-if="loading" class="mt-6 text-center text-gray-500">
      Yükleniyor...
    </div>
    <div v-if="error" class="mt-6 text-center text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const users = ref([])
const loading = ref(false)
const error = ref(null)

const router = useRouter()

// Kullanıcı detayına yönlendirme
function goToDetail(userId) {
  router.push(`/user/${userId}/posts`)
}

// API’den kullanıcıları çek
onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error("Veri alınamadı")
    users.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
