<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Kullanıcı Detayı</h1>

    <!-- Tab Menüsü -->
    <div class="flex gap-6 border-b mb-4">
      <RouterLink
        :to="`/user/${$route.params.id}/posts`"
        class="pb-2"
        :class="{ 'border-b-2 border-blue-500 text-blue-600': $route.name === 'UserPosts' }"
      >
        Paylaşımlar
      </RouterLink>
      <RouterLink
        :to="`/user/${$route.params.id}/albums`"
        class="pb-2"
        :class="{ 'border-b-2 border-blue-500 text-blue-600': $route.name === 'UserAlbums' }"
      >
        Albümler
      </RouterLink>
      <RouterLink
        :to="`/user/${$route.params.id}/todos`"
        class="pb-2"
        :class="{ 'border-b-2 border-blue-500 text-blue-600': $route.name === 'UserTodos' }"
      >
        Görevler
      </RouterLink>
    </div>

    <!-- Tab içeriği -->
    <RouterView />
  </div>
</template>
