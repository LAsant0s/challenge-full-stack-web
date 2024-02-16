import Vue from 'vue'
import VueRouter from 'vue-router'
import StudentsView from '../views/StudentsView.vue'
import StudentsForm from '../views/StudentsForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/students',
    name: 'students',
    component: StudentsView
  },
  {
    path: '/students/new',
    name: 'students',
    component: StudentsForm
  },
  {
    path: '/students/edit/:ra',
    name: 'students',
    component: StudentsForm
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
