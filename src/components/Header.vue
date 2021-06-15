<template>
  <div id="app">
    <b-card title="Card Title" no-body>
      <b-card-header header-tag="nav">
        <b-container class="bv-example-row" fluid>
          <b-row>
            <b-col>
              <b-nav pills align="left" >
                <b-nav-item to="/" exact :active="$router.currentRoute.fullPath==='/' ? true : false">Home</b-nav-item>
                <b-nav-item to="/about" exact :active="$router.currentRoute.fullPath==='/about' ? true : false">O aplikacji</b-nav-item>
             </b-nav>
            </b-col>
            <b-col>
              <b-nav pills align="right">
                <b-nav-item to="/login" exact :active="true" v-if="!loggedIn" >Zaloguj</b-nav-item>
                <b-nav-item to="/register" exact :active="true" v-if="!loggedIn">Rejestracja</b-nav-item>
                <b-nav-item @click="logout" :active="true" v-if="loggedIn">Wyloguj</b-nav-item>
              </b-nav>
            </b-col>
          </b-row>
        </b-container>
      </b-card-header>
    <b-card-body>
      <b-container>
      <!-- Child route gets rendered in <router-view> or <nuxt-child> -->
      <router-view></router-view>
      </b-container>
      <!-- Or if using Nuxt.js
      <nuxt-child></nuxt-child>
      -->
    </b-card-body>
  </b-card>
  </div>
</template>

<script>
import { authComputed } from '../store/helpers'
export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #2c3e50;
}
.nav-link {
  margin: 5px 0px 0 10px;
}
</style>
