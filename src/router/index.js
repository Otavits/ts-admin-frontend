import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import NotFoundComponent from '../components/NotFoundComponent'
import RegisterUser from '../views/RegisterUser'
import LoginUser from '../views/LoginUser'
import Dashboard from '../views/Dashboard'
import UserRegisterRank from '../views/UserRegisterRank'
import ManageRegisterRank from '../viewsadmin/ManageRegisterRank'
import RankForm from '../viewsadmin/RankForm'
import ManageStaffRank from '../viewsadmin/ManageRankStaff'
import RankStaffForm from '../viewsadmin/RankStaffForm.vue'
import StaffList from '../viewsadmin/StaffList.vue'
import RankGames from '../viewsadmin/RankGames'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFoundComponent
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { norequiresAuth: true }
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/register',
    name: 'registeruser',
    component: RegisterUser
  },
  {
    path: '/login',
    name: 'loginuser',
    component: LoginUser
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/register/rank',
    name: 'userregisterrank',
    component: UserRegisterRank,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/register/rank',
    name: 'manageregisterrank',
    component: ManageRegisterRank,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/form/rank/:type/:action/:id/:name_rank/:group_id/:path/:misc',
    name: 'rankform',
    component: RankForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/staff/rank',
    name: 'managestaffform',
    component: ManageStaffRank,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/form/staff_rank/:action/:id',
    name: 'rankstaffform',
    component: RankStaffForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/stafflist',
    name: 'stafflist',
    component: StaffList,
    meta: { requiresAuth: true }
  },
  {
    path: '/manage/rankgameslist',
    name: 'rankgameslist',
    component: RankGames,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
  if (to.matched.some(record => record.meta.norequiresAuth)) {
    if (loggedIn) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
