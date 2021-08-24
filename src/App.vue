<template>
  <div id="app">
            <Siedbar v-if="loggedIn" />
        <Navbar v-if="loggedIn" class="navbar"/>
        <div id="main_content_login" class="main_con" v-if="loggedIn">
            <router-view></router-view>
        </div>
        <div id="main_content_nonlog" v-if="!loggedIn">
            <router-view></router-view>
        </div>
  </div>
</template>

<script>
import Siedbar from '@/components/Siedbar'
import Navbar from '@/components/NavBar'
import { authComputed } from '@/store/helpers'
export default {
  name: 'App',
  components: {
    Siedbar,
    Navbar
  },
  computed: {
    ...authComputed
  },
  mounted () {
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      document.getElementById('nav_siedbar').style.width = '40px'
      document.getElementById('Top_Navbar').style.left = '40px'
      document.getElementById('main_content_login').style.marginLeft = '48px'
      this.$store.commit('SET_STATUS_SIEDBAR', true)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2c3e50;
}

body {
    background-color:#3b4650;
}
.main_con {

    text-align: left;
    color: black;
    overflow: show;
    margin-left: 258px;
    transition: 0.3s;
}
</style>
