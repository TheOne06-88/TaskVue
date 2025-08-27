import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/pages/UserList.vue'
import UserDetail from '@/pages/UserDetail.vue'
import UserPosts from '@/pages/UserPosts.vue'
import UserAlbums from '@/pages/UserAlbums.vue'
import UserTodos from '@/pages/UserTodos.vue'

const routes = [
  { path: '/', name: 'UserList', component: UserList },
  {
    path: '/user/:id',
    name: 'UserDetail',
    component: UserDetail,
    children: [
      { path: 'posts', name: 'UserPosts', component: UserPosts },
      { path: 'albums', name: 'UserAlbums', component: UserAlbums },
      { path: 'todos', name: 'UserTodos', component: UserTodos },
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
