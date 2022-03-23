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
import GameRank from '../views/GameRank'
import ManageMessage from '../viewsadmin/ManageMessage'
import UserList from '../viewsadmin/UserList'
import UserCard from '../viewsadmin/UserCard'
import ManageBan from '../viewsadmin/ManageBan'
import BanHistoryTable from '../viewsadmin/BanHistoryTable'
import PasswordRecovery from '../views/PasswordRecovery'

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
    path: '/recovery',
    name: 'PasswordRecovery',
    component: PasswordRecovery
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
    path: '/manage/form/rank/:type/:action/:id/:name_rank/:group_id/:path/:misc/:sort_id',
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
  },
  {
    path: '/gamerank',
    name: 'gamerank',
    component: GameRank,
    meta: { requiresAuth: true }
  },
  {
    path: '/managemessage/:id',
    name: 'managemessage',
    component: ManageMessage,
    meta: { requiresAuth: true }
  },
  {
    path: '/UserList/',
    name: 'UserList',
    component: UserList,
    meta: { requiresAuth: true }
  },
  {
    path: '/UserCard/:dbid',
    name: 'UserCard',
    component: UserCard,
    meta: { requiresAuth: true }
  },
  {
    path: '/ManageBan/',
    name: 'ManageBan',
    component: ManageBan,
    meta: { requiresAuth: true }
  },
  {
    path: '/BanHistoryTable/',
    name: 'BanHistoryTable',
    component: BanHistoryTable,
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
  if (to.path === '/managemessage') {
    next('/managemessage/0')
  }
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
      if (to.name !== 'home') {
        next()
      } else {
        next('/dashboard')
      }
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
