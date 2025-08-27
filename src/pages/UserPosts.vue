<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Paylaşımlar</h2>

    <div v-if="loading" class="text-gray-500">Yükleniyor...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <ul v-if="!loading && !error" class="space-y-4">
      <li
        v-for="post in posts"
        :key="post.id"
        class="bg-white shadow p-4 rounded-lg flex justify-between items-start"
      >
        <div>
          <h3 class="font-bold">{{ post.title }}</h3>
          <p class="text-gray-600">{{ post.body }}</p>
        </div>
        <button
          @click="toggleFavorite(post.id)"
          class="ml-4 px-3 py-1 rounded bg-blue-500 text-white text-sm"
        >
          {{ favorites.includes(post.id) ? "Favoriden Çıkar" : "Favori" }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const posts = ref([])
const loading = ref(false)
const error = ref(null)
const favorites = ref([])

const route = useRoute()
const STORAGE_KEY = `user_${route.params.id}_favorites`

function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
}

function loadFavorites() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) favorites.value = JSON.parse(stored)
}

function toggleFavorite(postId) {
  if (favorites.value.includes(postId)) {
    favorites.value = favorites.value.filter(id => id !== postId)
  } else {
    favorites.value.push(postId)
  }
  saveFavorites()
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${route.params.id}`
    )
    if (!res.ok) throw new Error("Postlar alınamadı")
    posts.value = await res.json()
    loadFavorites()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
