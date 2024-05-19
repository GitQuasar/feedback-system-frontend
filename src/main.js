import './assets/main.css'

import { createApp } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Reviewer from './pages/Reviewer.vue'
import Auth from './pages/Auth.vue'
import QR_code from './pages/QR_code.vue'
import Manager from './pages/Manager.vue'
import Administrator from './pages/Administrator.vue'
import Update_Staff from './pages/Update_Staff.vue'
import See_Review from './pages/See_Review.vue'
import Add_Staff from './pages/Add_Staff.vue'

const app = createApp(App)

const uuid_user = {
  props: ['uuid'],
  template: '<See_Review :uuid="uuid"/>',
  components: { See_Review }
}

const routes = [
  { path: '/', name: 'Reviewer', component: Reviewer },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/qr', name: 'QR', component: QR_code },
  { path: '/manager', name: 'Manager', component: Manager },
  { path: '/administrator', name: 'Administrator', component: Administrator },
  {
    path: '/administrator/update_staff',
    name: 'Update_staff',
    component: Update_Staff
  },
  { path: '/:uuid', name: 'Review', component: uuid_user, props: true },
  {
    path: '/:uuid',
    components: { default: uuid_user },
    props: { default: true }
  },
  { path: '/administrator/add_staff', name: 'Add_staff', component: Add_Staff }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.mount('#app')
