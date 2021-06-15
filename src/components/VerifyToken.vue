<template>
  <div id="login">
    <div id="form">
  <b-jumbotron>
    <template #header><h1 class="head"><alert-triangle-icon size="1.5x"></alert-triangle-icon>Weryfikacja</h1></template>

    <template #lead>
        <p class="center">Zweyfikuj token który <br> otrzymałeś na naszm TeamSpeaku3 </p>
    </template>

    <hr class="my-4">
      <b-form @submit="login">
            <p class="list">
                    <b-form-group
                      id="input-group-1"
                      label="Twój token:"
                      label-for="input-1"
                      description="Nie otrzymałeś token'u? Skontaktuj się z administracją"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="token"
                        placeholder="Wporwadź token"
                        required
                      ></b-form-input>
                    </b-form-group>
                        </p>
              <div id="button_box">
                    <b-button-group class="button">
                      <b-button variant="warning" @click="back"><chevron-left-icon size="1.5x"></chevron-left-icon> Powrót</b-button>
                      <b-button variant="success" type="submit" >Zaloguj <log-in-icon size="1.5x" class="custom-class"></log-in-icon></b-button>
                    </b-button-group>
              </div>
              </b-form>

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
import { InfoIcon, AlertTriangleIcon, ChevronLeftIcon, LogInIcon } from 'vue-feather-icons'
import { mapState } from 'vuex'

export default {
  components: {
    InfoIcon,
    AlertTriangleIcon,
    ChevronLeftIcon,
    LogInIcon
  },
  data () {
    return {
      token: null
    }
  },
  methods: {
    back (event) {
      this.$store.dispatch('select_dbid_to_login', {
        DBID: null
      })
    },
    login (event) {
      event.preventDefault()
      this.$store.dispatch('create_auth_nonaccount_token', {
        DBID: this.selected_login_db,
        token: this.token
      }).then(() => {
        this.$router.push({ name: 'dashboard' })
      })
    }
  },
  computed: {
    ...mapState([
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
}
.list {
    text-align: center;
}
#fotter {
    text-align: center;
    color: #fff;
}
.button {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffc107;
    color: #3b4650;
    border-color: #ffc107;
    margin-top: 50px;
}
.center {
  text-align: center;
}
</style>
