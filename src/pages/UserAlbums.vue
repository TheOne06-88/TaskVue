<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Albümler</h2>

    <div v-if="loading" class="text-gray-500">Yükleniyor...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div
      v-if="!loading && !error"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <div
        v-for="album in albums"
        :key="album.id"
        class="bg-white shadow p-4 rounded-lg flex justify-between items-center"
      >
        <h3 class="font-bold">{{ album.title }}</h3>
        <button
          @click="toggleLike(album.id)"
          class="ml-4 px-3 py-1 rounded bg-green-500 text-white text-sm"
        >
          {{ likes.includes(album.id) ? "Beğenmekten Vazgeç" : "Beğen" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const albums = ref([])
const loading = ref(false)
const error = ref(null)
const likes = ref([])

const route = useRoute()
const STORAGE_KEY = `user_${route.params.id}_likes`

function saveLikes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(likes.value))
}

function loadLikes() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) likes.value = JSON.parse(stored)
}

function toggleLike(albumId) {
  if (likes.value.includes(albumId)) {
    likes.value = likes.value.filter(id => id !== albumId)
  } else {
    likes.value.push(albumId)
  }
  saveLikes()
}

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/albums?userId=${route.params.id}`
    )
    if (!res.ok) throw new Error("Albümler alınamadı")
    albums.value = await res.json()
    loadLikes()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
