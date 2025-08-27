<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->

    <div class="min-h-screen bg-gray-100 text-gray-800">
      <header class="bg-indigo-600 text-white p-4 shadow-md">
        <h1 class="text-xl font-bold">👥 Kullanıcı Takip Platformu</h1>
      </header>

      <main class="p-6">
        <router-view />
      </main>
    </div>


    <h1 class="text-4xl text-red-500">Test Yazısı</h1>


</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

