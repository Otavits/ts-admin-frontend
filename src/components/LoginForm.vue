<template>
  <div id="login">
    <div id="form">
  <b-jumbotron>
    <template #header><h1 class="head">Witamy!</h1></template>

    <template #lead>
        <p class="center">  <mouse-pointer-icon size="1.5x"></mouse-pointer-icon>Wybierz swoje konto </p>
    </template>

    <hr class="my-4">

    <p class="list">
      <UserComponent  v-for="(data ,index) in onlinelist" v-bind:key="index" :data="data" />
      </p>
            <p class="center" v-if="onlinelist.length==0"> Nie znaleziono Twojego konta?
              <br>
              Zaloguj się na TeamSpeak3 Otavi.pl i
              Kliknij odśwież</p>
    <b-button class="refresh" @click="reresh"><refresh-cw-icon size="1.4x" class="custom-class"></refresh-cw-icon> Odśwież</b-button>
  </b-jumbotron>
          <div id="fotter">
                  <info-icon size="1.5x"></info-icon>
        Chcesz <router-link :to="{name: 'registeruser'}"> założyć </router-link> konto do logowania  off-line
        <br>
        lub <router-link :to="{name: 'loginuser'}">zalogować</router-link> się off-line
        <br>
        <p class="small"> Twój adres IP to: {{ $store.state.ip }} </p>
    </div>
</div>

  </div>
</template>

<script>
import { InfoIcon, RefreshCwIcon, MousePointerIcon } from 'vue-feather-icons'
import UserComponent from '@/components/UserForm.vue'
import { mapState } from 'vuex'

export default {
  components: {
    InfoIcon,
    RefreshCwIcon,
    UserComponent,
    MousePointerIcon
  },
  data () {
    return {

    }
  },
  methods: {
    reresh (event) {
      this.$store.dispatch('get_list_login')
      this.$store.dispatch('get_ip')
    }
  },
  mounted () {
    this.$store.dispatch('get_list_login')
    this.$store.dispatch('get_ip')
  },
  computed: {
    ...mapState([
      'onlinelist',
      'selected_login_db'
    ])
  }
}
</script>

<style scoped lang="scss">
#login {
    background-color:#3b4650;
}
#form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: left;
}
.head {
    font-size: 50px;
    text-align: center;
}
.list {
    text-align: center;
}
#fotter {
    text-align: center;
    color: #fff;
}
.refresh {
    background-color: #ffc107;
    color: #3b4650;
    border-color: #ffc107;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-top: 50px;
}
.center {
  text-align: center;
}
</style>
