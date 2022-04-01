<template>
  <div id="content">
    <b-modal ref="error-modal" hide-footer title="Błąd">Błąd danych. Niedozwolona operacja</b-modal>
    <b-modal ref="success-modal" hide-footer title="Sukces">Hasło zmienione poprawnie</b-modal>
    <div id="main">
      <b-jumbotron>
          <h2> <i class="fas fa-unlock-alt"></i> Zresetuj swoje hasło</h2>
          <p>Jeżeli nie pamiętasz swojego hasła możesz je tutaj zresetować. Pamiętaj, że musisz posiadać utworzone konto w systemie oraz być zalogowanym na TS3.</p>
        <hr class="my-4">
        <b-form v-if="!enter_token" @submit.stop.prevent>
          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              v-model="form.login"
              placeholder="Wprowadź swój login"
              :state="validation"
              @change="clearInvalidNick"
              @keyup.enter="sendToken"
            ></b-form-input>
            <b-form-invalid-feedback v-if="invalid_nick">
              Nie ma takiego nicku w bazie!
            </b-form-invalid-feedback>
          <b-form-invalid-feedback :state="validation" v-if="!invalid_nick">
            Wprowadź nick
          </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Ok
            </b-form-valid-feedback>
          </b-form-group>
        </b-form>
        <b-form v-if="enter_token">
          <b-form-group id="input-group-2">
            <b-form-input
              id="input-2"
              v-model="token"
              placeholder="Wprowadź swój token"
              :state="token.length>0"
            ></b-form-input>
            <b-form-invalid-feedback :state="token.length>0">
              Wprowadź token
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="token.length>0">
              Ok
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group id="input-group-3">
          <b-form-input
            id="input-3"
            v-model="password"
            type="password"
            placeholder="Wprowadź swoje nowe hasło"
            :state="passwordValidation"
          ></b-form-input>
            <b-form-invalid-feedback :state="passwordValidation">
              Twoje hasło musi mieć minimum 8 znaków, zawierać małe i duże litery oraz znaki specjalne.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="passwordValidation">
              Ok
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group id="input-group-4">
          <b-form-input
            id="input-4"
            v-model="retype_password"
            placeholder="Powtórz nowe hasło"
            type="password"
            :state="ifSame"
            @keyup.enter="ifSame ? sendPassword() : ''"
          ></b-form-input>
            <b-form-invalid-feedback :state="ifSame">
              Podane hasła różnią się
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="ifSame">
              Ok
            </b-form-valid-feedback>
          </b-form-group>
        </b-form>
        <b-button v-if="!enter_token" class="login" type="submit" :disabled="validation ? false : true" @click="sendToken"> <i class="fas fa-key"></i> Wyślij token</b-button>
        <b-button v-if="enter_token" class="login" type="submit" :disabled="passwordValidation && ifSame && token.length>0? false : true" @click="sendPassword"> <i class="fas fa-unlock-alt"></i> Zresetuj hasło</b-button>
      </b-jumbotron>
      <div id="fotter">
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
import axios from 'axios'

export default {
  name: 'PasswordRecovery',
  computed: {
    ifSame () {
      return this.password === this.retype_password && this.password.length !== 0
    },
    passwordValidation () {
      return this.password.length >= 8 && /\d/.test(this.password) && /[a-z]/.test(this.password) && /[A-Z]/.test(this.password) && /[!@#$%^&*)(+=._-]/.test(this.password)
    },
    validation () {
      return this.form.login.length > 0 && !this.invalid_nick
    }
  },
  data () {
    return {
      enter_token: false,
      form: {
        login: '',
        password: 'null'
      },
      invalid_nick: false,
      password: '',
      retype_password: '',
      token: ''
    }
  },
  methods: {
    afterFatalError () {
      this.$router.push({ path: '/' })
    },
    afterSuccess () {
      this.$router.push({ path: '/login' })
    },
    clearInvalidNick () {
      this.invalid_nick = false
    },
    sendPassword () {
      const headers = {
        'Content-Type': 'application/json'
      }
      const data = {
        password: this.password,
        token: this.token,
        login: this.form.login,
        uid: 'null',
        dbid: 'null'
      }
      axios
        .post(this.$store.state.path_to_server + 'public/recovery-password/set-new-password', data, { headers })
        .then(response => {
          if (response.status === 200) {
            this.$refs['success-modal'].show()
            setTimeout(this.afterSuccess, 2500)
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.$refs['error-modal'].show()
            setTimeout(this.afterFatalError, 2500)
          }
        })
    },
    sendToken () {
      const headers = {
        'Content-Type': 'application/json'
      }
      axios.post(this.$store.state.path_to_server + 'public/recovery-password/send-token', this.form, { headers })
        .then(response => {
          if (response.status === 200) this.enter_token = true
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.invalid_nick = true
          }
        })
    }
  }
}
</script>

<style scoped>
#content {
  background-color: #3b4650;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#main {
  background-color: #3b4650;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
.jumbotron {
  width: 400px;
}
#fotter {
  text-align: center;
  color: #fff;
}
</style>
