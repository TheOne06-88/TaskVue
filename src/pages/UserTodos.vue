<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Görevler</h2>

    <div v-if="loading" class="text-gray-500">Yükleniyor...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <ul v-if="!loading && !error" class="space-y-2">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center gap-2 bg-white p-3 rounded-lg shadow"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
          @change="saveTodos"
        />
        <span :class="{ 'line-through text-gray-500': todo.completed }">
          {{ todo.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"

const todos = ref([])
const loading = ref(false)
const error = ref(null)

const route = useRoute()
const STORAGE_KEY = `user_${route.params.id}_todos`

// LocalStorage’a kaydet
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
}

// LocalStorage’dan oku
function loadTodos() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    todos.value = JSON.parse(stored)
    return true
  }
  return false
}

// İlk yüklemede API veya localStorage
onMounted(async () => {
  loading.value = true
  try {
    if (!loadTodos()) {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos?userId=${route.params.id}`
      )
      if (!res.ok) throw new Error("Görevler alınamadı")
      todos.value = await res.json()
      saveTodos() // ilk defa kaydet
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>
