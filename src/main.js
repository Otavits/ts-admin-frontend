import Vue from 'vue'

import router from './router'
import store from './store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueApexCharts from 'vue-apexcharts'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import App from './App.vue'
import axios from 'axios'

Vue.use(BootstrapVue)
Vue.use(VueSidebarMenu)
Vue.use(VueApexCharts)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = true
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  created () {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      axios.defaults.headers.common.Authorization = `Bearer ${
        userData.token
      }`
      const headers = {
        'Content-Type': 'application/json'
      }
      console.log('before axio')
      axios
        .get(this.$store.state.path_to_server + 'get_siedbar/account/', { headers })
        .then(response => {
          if (response.status === 200) {
            this.$store.commit('SET_STATUS_TOKEN_CHECKED')
            this.$store.commit('SET_USER_DATA', userData)
          }
        })
        .catch(error => {
          console.log(error.response.status)
          if (error.response.status === 401) {
            this.$store.dispatch('logout')
          }
        })
    } else this.$store.commit('SET_STATUS_TOKEN_CHECKED')
    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response.data.detail === 'Could not validate credentials') {
          this.$store.dispatch('logout')
          this.$router.push({ name: 'home' })
        }
        if (error.response.data.detail === 'UNAUTHORIZED OPERATION') {
          this.$store.dispatch('logout')
          this.$router.push({ name: 'home' })
        }
        return Promise.reject(error)
      }
    )
  },
  render: h => h(App)
}).$mount('#app')
