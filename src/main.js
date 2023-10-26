
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './views/HomeView.vue'
import Create from './views/CreateView.vue'
import Edit from './views/EditView.vue'
import CarList from './views/CarList.vue'
// 1. Define route components.
// These can be imported from other files


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/create', component: Create },
  { path: '/edit/:id', component: Edit },
  { path: '/carlist', component: CarList}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
// Make sure to _use_ the router instance to make the
// whole app router-aware.




const app = createApp(App)
app.use(router)
app.mount('#app')
